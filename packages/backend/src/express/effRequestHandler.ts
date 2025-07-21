import { pipe, Effect, Option, Either, Exit, Cause } from "effect";

import * as express from "express";
import { ExpressRequestService } from "./RequestService";
import {
  DataIntegrityError,
  DecodeQueryError,
  NoRecordFound,
  PgError,
  pool,
} from "../db/db";
import { HashError } from "../crypto/hash";
import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../auth/authedRequestHandler";
import { DecodeError, EncodeError, match } from "@yaltt/model";
import { ParseBodyError } from "./parseBody";
import {
  ParseJwtError,
  ParseParamsError,
  ParseQueryError,
} from "./parseParams";
import { mkTransactionalPgService } from "../db/TransactionalPgService";
import { QueryService } from "../db/QueryService";
import { KeyError, KeyService } from "../crypto/KeyService";
import { provideRsaKeyService } from "../crypto/RsaKeyService";
import { ConfigService } from "../config/ConfigService";
import {
  FetchJsonParseError,
  FetchError,
  FetchService,
  FetchStatusError,
} from "../fetch/FetchService";
import { provideHttpFetchService } from "../fetch/HttpFetchService";
import { formatError, formatIssue } from "@effect/schema/TreeFormatter";
import * as S from "@effect/schema/Schema";
import {
  mkEnvConfigService,
  provideEnvConfigService,
} from "../config/EnvConfigService";

type Response = {
  status: number;
  body?: unknown;
  raw: boolean;
  headers?: Record<string, string>;
  schema?: S.Schema<any, unknown>;
};

export const response =
  (status: number) =>
  (
    body?: unknown,
    headers?: Record<string, string>,
    raw: boolean = false,
    schema?: S.Schema<any, any>
  ) => ({
    status,
    body,
    raw,
    headers,
    schema,
  });

export const schemaResponse =
  <A>(status: number, schema: S.Schema<A, any>) =>
  (body: A, headers?: Record<string, string>, raw: boolean = false) =>
    response(status)(body, headers, raw, schema);

export const successResponse = response(200);
export const redirectResponse = (location: string) =>
  response(302)(undefined, {
    Location: location,
  });

export type EffErrors =
  | PgError
  | DecodeQueryError
  | DecodeError
  | EncodeError
  | NoRecordFound
  | HashError
  | UnauthenticatedError
  | UnauthorizedError
  | ParseBodyError
  | ParseParamsError
  | ParseQueryError
  | FetchError
  | FetchJsonParseError
  | FetchStatusError
  | KeyError
  | ParseJwtError
  | DataIntegrityError;

export type EffServices =
  | ExpressRequestService
  | QueryService
  | KeyService
  | ConfigService
  | FetchService;

export type EffRequestHandler = (
  eff: Effect.Effect<Response, EffErrors, EffServices>
) => express.RequestHandler<
  Record<string, string>,
  unknown,
  unknown,
  Record<string, string | string[] | undefined>,
  {}
>;

export const effRequestHandler: EffRequestHandler =
  (eff) => (request, response) => {
    const pgService = mkTransactionalPgService(pool);
    const requestEffect = pipe(
      eff,
      Effect.provideService(ExpressRequestService, {
        request,
        response,
      }),
      pgService.provide,
      provideRsaKeyService,
      provideEnvConfigService,
      provideHttpFetchService,
      (a) => a
    );

    Effect.runPromiseExit(requestEffect).then((exit) => {
      if (Exit.isFailure(exit)) {
        console.error(`Request to ${request.url} Failed with: `, exit.cause);
        pgService.rollback();
        exit.cause._tag;
        pipe(
          exit.cause,
          (a) => a,
          Cause.match({
            onEmpty: void 0,
            onFail: match({
              decode_error: (e) => {
                console.error("Decode Error", e);
                handleErrorResponse(request, response)(500, {
                  failure: "An error ocurred.",
                });
              },
              encode_error: (e) => {
                console.error("Encode Error", formatError(e.error));
                handleErrorResponse(request, response)(500, {
                  failure: "An error ocurred.",
                });
              },
              decode_query_error: (dqe) => {
                console.error("Decode Query Error Running: \n", dqe.query);
                console.error(formatError(dqe.error.error));
                handleErrorResponse(request, response)(500, {
                  failure: "An error ocurred.",
                });
              },
              hash_error: (h) => {
                console.error("Hash Error", h.cause);
                handleErrorResponse(request, response)(500, {
                  failure: "An error ocurred.",
                });
              },
              no_record_found: (nrf) => {
                console.error("No Record Found Running: ", nrf.query);
                handleErrorResponse(request, response)(500, {
                  failure: "An error ocurred.",
                });
              },
              pg_error: (h) => {
                console.error("PG Error", h.cause);
                console.log("Executing\n", h.query);
                handleErrorResponse(request, response)(500, {
                  failure: "An error ocurred.",
                });
              },
              unauthenticated_error: (e) => {
                console.info("Rejecting unauthenticated request");
                handleErrorResponse(request, response)(401, {
                  failure: "unauthenticated",
                });
              },
              unauthorized_error: (e) => {
                console.info(`Rejecting unauthorized request: ${e.message}`);
                handleErrorResponse(request, response)(403, {
                  failure: "unauthorized",
                  message: e.message,
                });
              },
              parse_body_error: (e) => {
                console.error("Parse body error");
                console.error("Raw body:", JSON.stringify(e.body, null, 2));
                console.error(formatError(e.error));
                handleErrorResponse(request, response)(
                  400,
                  {
                    failure: "failed to parse body",
                    message: formatError(e.error),
                  },
                  formatError(e.error)
                );
              },
              parse_params_error: (e) => {
                console.error("Parse params error");
                console.log("Raw params:", JSON.stringify(e.params, null, 2));
                console.error(JSON.stringify(e.error, null, 2));
                handleErrorResponse(request, response)(
                  400,
                  {
                    failure: "failed to parse params",
                    raw: e.params,
                    err: e.error,
                  },
                  formatError(e.error)
                );
              },
              parse_jwt_error: (e) => {
                console.error("Parse JWT error");
                console.error("Raw jwt:", e.rawJwt);
                handleErrorResponse(request, response)(
                  400,
                  {
                    failure: "failed to parse jwt",
                    raw: e.rawJwt,
                  },
                  `Failed to parse jwt: ${e.rawJwt}`
                );
              },
              parse_query_error: (e) => {
                const errorMessage = [
                  `Error parsing URL query parameter "${e.paramName}"`,
                  `Raw value: ${e.value}`,
                  e.message,
                  e.error ? formatError(e.error) : "",
                ].join("\n");
                console.log(errorMessage);
                handleErrorResponse(request, response)(
                  400,
                  {
                    failure: "failed to parse query",
                    raw: e.query,
                    err: e.error,
                  },
                  errorMessage
                );
              },
              key_error: (e) => {
                handleErrorResponse(request, response)(500, {
                  error: "an error ocurred",
                });
              },
              fetch_error: (e) => {
                console.error("Fetch Error", e);
                handleErrorResponse(request, response)(500, {
                  error: "an error ocurred",
                  e,
                });
              },
              fetch_json_parse_error: (e) => {
                console.error("Fetch Error", e);
                handleErrorResponse(request, response)(500, {
                  error: "an error ocurred",
                  e,
                });
              },
              fetch_status_error: (e) => {
                console.error("Fetch Status Error", e);
                handleErrorResponse(request, response)(500, {
                  error: "an error ocurred",
                  e,
                });
              },
              data_integrity_error: (e) => {
                console.error("Data Integrity Error", e);
                handleErrorResponse(request, response)(500, {
                  error: "an error ocurred",
                  e,
                });
              },
            }),
            onDie: () => {},
            onInterrupt: () => {},
            onSequential: () => {},
            onParallel: () => {},
          })
        );
      } else {
        pgService.commit();
        const resp = exit.value;
        if ("headers" in resp && typeof resp.headers !== "undefined") {
          response.set(resp.headers);
        }
        if ("body" in resp) {
          if (resp.raw) {
            response.status(resp.status);
            response.send(resp.body);
          } else if (typeof resp.schema !== "undefined") {
            pipe(
              S.encodeEither(resp.schema)(resp.body),
              Either.match({
                onLeft: (e) => {
                  response.status(500);
                  console.log("Error parsing response: ", formatIssue(e.error));
                  response.json({ failure: "An error ocurred.", error: e });
                },
                onRight: (b) => {
                  response.status(resp.status);
                  response.json(b);
                },
              })
            );
          } else {
            response.status(resp.status);
            response.json(resp.body);
          }
        } else {
          response.status(resp.status);
        }
      }
    });
  };

const handleErrorResponse =
  (
    request: express.Request<unknown, unknown, unknown, unknown, {}>,
    response: express.Response<unknown, {}>
  ) =>
  (status: number, error: unknown, msg?: string) => {
    response.status(status);
    if (request.get("Accept") === "application/json") {
      response.json(error);
    } else {
      response.send(`
        <html>
          <head>
            <title>YALTT</title>
          </head>
          <body>
            <div class="container">
              <h1>YALTT</h1>
              <h2>An error ocurred</h2> 
              <pre>${request.url}</pre>
              <pre>${msg ? msg : JSON.stringify(error, null, 2)}</pre> 
            </div>
          </body>
        </html>
      `);
    }
  };

import { pipe, Effect, Option, Either, Exit, Cause } from "effect";

import * as express from "express";
import { ExpressRequestService } from "./RequestService";
import { DecodeError, NoRecordFound, PgError, pool } from "../db/db";
import { HashError } from "../crypto/hash";
import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../auth/authedRequestHandler";
import { match } from "@yaltt/model";
import { ParseBodyError } from "./parseBody";
import { ParseParamsError, ParseQueryError } from "./parseParams";
import { mkTransactionalPgService } from "../db/TransactionalPgService";
import { PgService } from "../db/PgService";
import { KeyError, KeyService } from "../crypto/KeyService";
import { provideRsaKeyService } from "../crypto/RsaKeyService";
import { ConfigService } from "../config/ConfigService";
import {
  FetchJsonParseError,
  FetchError,
  FetchService,
  FetchStatusError,
} from "../fetch/FetchService";
import { mkHttpFetchService } from "../fetch/HttpFetchService";
import { formatErrors } from "@effect/schema/TreeFormatter";
import * as S from "@effect/schema/Schema";
import { mkEnvConfigService } from "../config/EnvConfigService";

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
  <A>(status: number, schema: S.Schema<any, A>) =>
  (body: A, headers?: Record<string, string>, raw: boolean = false) =>
    response(status)(body, headers, raw, schema);

export const successResponse = response(200);
export const redirectResponse = (location: string) =>
  response(302)(undefined, {
    Location: location,
  });

export type EffRequestHandler = (
  eff: Effect.Effect<
    | ExpressRequestService
    | PgService
    | KeyService
    | ConfigService
    | FetchService,
    | PgError
    | DecodeError
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
    | KeyError,
    Response
  >
) => express.RequestHandler<unknown, unknown, unknown, unknown, {}>;

export const effRequestHandler: EffRequestHandler =
  (eff) => (request, response) => {
    const pgService = mkTransactionalPgService(pool);
    Effect.runCallback(
      pipe(
        eff,
        Effect.provideService(ExpressRequestService, {
          request,
          response,
        }),
        Effect.provideService(PgService, pgService.service),
        provideRsaKeyService,
        Effect.provideService(ConfigService, mkEnvConfigService()),
        Effect.provideService(FetchService, mkHttpFetchService())
      ),
      (exit) => {
        if (Exit.isFailure(exit)) {
          console.error(`Request to ${request.url} Failed with: `, exit.cause);
          pgService.rollback();
          pipe(
            exit.cause,
            Cause.match({
              onEmpty: void 0,
              onFail: match({
                decode_error: (v) => {
                  console.error("Decode Error Running: ", v.query);
                  console.error("Actual value:", v.actual);
                  console.error(formatErrors(v.error.errors));
                  handleErrorResponse(request, response)(
                    500,
                    {
                      failure: "An error ocurred.",
                    },
                    formatErrors(v.error.errors)
                  );
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
                  console.error(formatErrors(e.error.errors));
                  handleErrorResponse(request, response)(
                    400,
                    {
                      failure: "failed to parse body",
                      message: formatErrors(e.error.errors),
                    },
                    formatErrors(e.error.errors)
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
                    formatErrors(e.error.errors)
                  );
                },
                parse_query_error: (e) => {
                  console.error("Parse query error");
                  console.log("Raw query:", JSON.stringify(e.query, null, 2));
                  console.error(JSON.stringify(e.error, null, 2));
                  handleErrorResponse(request, response)(
                    400,
                    {
                      failure: "failed to parse query",
                      raw: e.query,
                      err: e.error,
                    },
                    formatErrors(e.error.errors)
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
              }),
              onDie: () => {},
              onInterrupt: () => {},
              onAnnotated: () => {},
              onSequential: () => {},
              onParallel: () => {},
            })
          );
        } else {
          pgService.commit();
          const resp = exit.value;
          if ("headers" in resp && typeof resp.headers !== "undefined") {
            console.log("setting headers! ", resp.headers);
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
                    console.log(
                      "Error parsing response: ",
                      formatErrors(e.errors)
                    );
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
      }
    );
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

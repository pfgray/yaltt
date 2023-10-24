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
} from "../fetch/FetchService";
import { mkHttpFetchService } from "../fetch/HttpFetchService";
import { formatErrors } from "@effect/schema/TreeFormatter";

type Response = {
  status: number;
  body?: unknown;
  headers?: Record<string, string>;
};

export const response =
  (status: number) => (body?: unknown, headers?: Record<string, string>) => ({
    status,
    body,
    headers,
  });

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
        Effect.provideService(ConfigService, {
          config: {
            primaryHostname: process.env.YALTT_HOST || "localhost",
            ssl: process.env.SSL === "true" || false,
          },
        }),
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
                  response.status(500);
                  response.json({ failure: "An error ocurred." });
                },
                hash_error: (h) => {
                  console.error("Hash Error", h.cause);
                  response.status(500);
                  response.json({ failure: "An error ocurred." });
                },
                no_record_found: (nrf) => {
                  console.error("No Record Found Running: ", nrf.query);
                  response.status(500);
                  response.json({ failure: "An error ocurred." });
                },
                pg_error: (h) => {
                  console.error("PG Error", h.cause);
                  console.log("Executing\n", h.query);
                  response.status(500);
                  response.json({ failure: "An error ocurred." });
                },
                unauthenticated_error: (e) => {
                  console.info("Rejecting unauthenticated request");
                  response.status(401);
                  response.json({ failure: "unauthenticated" });
                },
                unauthorized_error: (e) => {
                  console.info(`Rejecting unauthorized request: ${e.message}`);
                  response.status(403);
                  response.json({
                    failure: "unauthorized",
                    message: e.message,
                  });
                },
                parse_body_error: (e) => {
                  console.error("Parse body error");
                  console.log("Raw body:", JSON.stringify(e.body, null, 2));
                  console.error(formatErrors(e.error.errors));
                  response.status(400);
                  response.json({
                    failure: "failed to parse body",
                    message: formatErrors(e.error.errors),
                  });
                },
                parse_params_error: (e) => {
                  console.error("Parse params error");
                  console.log("Raw params:", JSON.stringify(e.params, null, 2));
                  console.error(JSON.stringify(e.error, null, 2));
                  response.status(400);
                  response.json({
                    failure: "failed to parse params",
                    raw: e.params,
                    err: e.error,
                  });
                },
                parse_query_error: (e) => {
                  console.error("Parse query error");
                  console.log("Raw query:", JSON.stringify(e.query, null, 2));
                  console.error(JSON.stringify(e.error, null, 2));
                  response.status(400);
                  response.json({
                    failure: "failed to parse query",
                    raw: e.query,
                    err: e.error,
                  });
                },
                key_error: (e) => {
                  response.status(500);
                  response.json({ error: "an error ocurred" });
                },
                fetch_error: (e) => {
                  console.error("Fetch Error", e);
                  response.status(500);
                  response.json({ error: "an error ocurred" });
                },
                fetch_json_parse_error: (e) => {
                  console.error("Fetch Error", e);
                  response.status(500);
                  response.json({ error: "an error ocurred" });
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
          console.log(`Response is: ${resp.status}`);
          response.status(resp.status);
          if ("headers" in resp && typeof resp.headers !== "undefined") {
            response.set(resp.headers);
          }
          if ("body" in resp) {
            response.json(resp.body);
          }
        }
      }
    );
  };

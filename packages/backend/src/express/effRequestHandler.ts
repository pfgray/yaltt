import * as Eff from "@effect/io/Effect";
import * as Exit from "@effect/io/Exit";
import * as Cause from "@effect/io/Cause";
import { pipe } from "@fp-ts/core/Function";
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
import { ParseParamsError } from "./parseParams";
import { mkTransactionalPgService } from "../db/TransactionalPgService";
import { PgService } from "../db/PgService";
import { KeyError, KeyService } from "../crypto/KeyService";
import { provideRsaKeyService } from "../crypto/RsaKeyService";
import { ConfigService } from "../config/ConfigService";

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

export const succcessResponse = response(200);
export const redirectResponse = (location: string) =>
  response(300)({
    headers: {
      Location: location,
    },
  });

export type EffRequestHandler = (
  eff: Eff.Effect<
    ExpressRequestService | PgService | KeyService | ConfigService,
    | PgError
    | DecodeError
    | NoRecordFound
    | HashError
    | UnauthenticatedError
    | UnauthorizedError
    | ParseBodyError
    | ParseParamsError
    | KeyError,
    Response
  >
) => express.RequestHandler<unknown, unknown, unknown, unknown, {}>;

export const effRequestHandler: EffRequestHandler =
  (eff) => (request, response) => {
    const pgService = mkTransactionalPgService(pool);
    Eff.runCallback(
      pipe(
        eff,
        Eff.provideService(ExpressRequestService, {
          request,
          response,
        }),
        Eff.provideService(PgService, pgService.service),
        provideRsaKeyService,
        Eff.provideService(ConfigService, {
          config: {
            primaryHostname: "localhost",
            ssl: false,
          },
        })
      ),
      (exit) => {
        if (Exit.isFailure(exit)) {
          console.error(`Request to ${request.url} Failed with: `, exit.cause);
          pgService.rollback();
          pipe(
            exit.cause,
            Cause.match(
              void 0,
              match({
                decode_error: (v) => {
                  console.error("Decode Error Running: ", v.query);
                  console.error("Actual value:", v.actual);
                  console.error(JSON.stringify(v.errors, null, 2));
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
                  console.error(JSON.stringify(e.error, null, 2));
                  response.status(400);
                  response.json({ failure: "failed to parse body" });
                },
                parse_params_error: (e) => {
                  console.error("Parse params error");
                  console.log("Raw params:", JSON.stringify(e.params, null, 2));
                  console.error(JSON.stringify(e.error, null, 2));
                  response.status(400);
                  response.json({ failure: "failed to parse params" });
                },
                key_error: (e) => {
                  response.status(500);
                  response.json({ error: "an error ocurred" });
                },
              }),
              () => {},
              () => {},
              () => {},
              () => {},
              () => {}
            )
          );
        } else {
          pgService.commit();
          const resp = exit.value;
          if ("headers" in resp && typeof resp.headers !== "undefined") {
            response.set(resp.headers);
          }
          if ("body" in resp) {
            response.json(resp.body);
          }
          response.status(resp.status);
        }
      }
    );
  };

import * as Eff from "@effect/io/Effect";
import * as Exit from "@effect/io/Exit";
import * as Cause from "@effect/io/Cause";
import { pipe } from "@fp-ts/core/Function";
import * as express from "express";
import { ExpressRequestService } from "./RequestService";
import { DecodeError, NoRecordFound, PgError } from "../db/db";
import { HashError } from "../db/crypto";
import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../auth/authedRequestHandler";
import { match } from "@yaltt/model";
import { ParseBodyError } from "./parseBody";
import { ParseParamsError } from "./parseParams";

export type EffRequestHandler = <A>(
  eff: Eff.Effect<
    ExpressRequestService,
    | PgError
    | DecodeError
    | NoRecordFound
    | HashError
    | UnauthenticatedError
    | UnauthorizedError
    | ParseBodyError
    | ParseParamsError,
    A
  >
) => express.RequestHandler<unknown, unknown, unknown, unknown, {}>;

export const effRequestHandler: EffRequestHandler =
  (eff) => (request, response) => {
    Eff.runCallback(
      pipe(
        eff,
        Eff.provideService(ExpressRequestService, {
          request,
          response,
        })
      ),
      (exit) => {
        if (Exit.isFailure(exit)) {
          console.error(`Request to ${request.url} Failed with: `, exit.cause);
          pipe(
            exit.cause,
            Cause.match(
              void 0,
              match({
                decode_error: (v) => {
                  console.error("Decode Error Running: ", v.query);
                  console.error("Actual value:", v.actual);
                  console.error(JSON.stringify(v.errors, null, 2));
                  response.json({ failure: "An error ocurred." });
                },
                hash_error: (h) => {
                  console.error("Hash Error", h.cause);
                  response.json({ failure: "An error ocurred." });
                },
                no_record_found: (nrf) => {
                  console.error("No Record Found Running: ", nrf.query);
                  response.json({ failure: "An error ocurred." });
                },
                pg_error: (h) => {
                  console.error("PG Error", h.cause);
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
              }),
              () => {},
              () => {},
              () => {},
              () => {},
              () => {}
            )
          );
        } else {
          response.json(exit.value);
        }
      }
    );
  };

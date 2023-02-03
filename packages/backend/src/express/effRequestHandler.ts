import * as Eff from "@effect/io/Effect";
import * as Exit from "@effect/io/Exit";
import * as Cause from "@effect/io/Cause";
import { pipe } from "@fp-ts/core/Function";
import * as express from "express";
import { ExpressRequestService } from "./RequestService";
import { DecodeError, NoRecordFound, PgError } from "../db/db";
import { HashError } from "../db/crypto";
import { UnauthenticatedError } from "../auth/authedRequestHandler";
import { match } from "@yaltt/model";
import { ParseBodyError } from "./parseBody";

export type EffRequestHandler = <A>(
  eff: Eff.Effect<
    ExpressRequestService,
    | PgError
    | DecodeError
    | NoRecordFound
    | HashError
    | UnauthenticatedError
    | ParseBodyError,
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
                },
                hash_error: (h) => {
                  console.error("Hash Error", h.cause);
                },
                no_record_found: (nrf) => {
                  console.error("No Record Found Running: ", nrf.query);
                },
                pg_error: (h) => {
                  console.error("PG Error", h.cause);
                },
                unauthenticated_error: (e) => {
                  console.info("Rejecting unauthenticated request");
                },
                parse_body_error: (e) => {
                  console.error("Parse body error");
                  console.log("Raw body:", JSON.stringify(e.body, null, 2));
                  console.error(JSON.stringify(e.error, null, 2));
                },
              }),
              () => {},
              () => {},
              () => {},
              () => {},
              () => {}
            )
          );
          response.json({ error: "An error ocurred" });
        } else {
          response.json(exit.value);
        }
      }
    );
  };

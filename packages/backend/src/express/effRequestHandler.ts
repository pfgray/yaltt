import * as Eff from "@effect/io/Effect";
import * as Exit from "@effect/io/Exit";
import * as Cause from "@effect/io/Cause";
import { pipe } from "@fp-ts/data/Function";
import * as express from "express";
import { ExpressRequestService } from "./RequestService";

export type EffRequestHandler = <E, A>(
  eff: Eff.Effect<ExpressRequestService, E, A>
) => express.RequestHandler<unknown, unknown, unknown, unknown, {}>;

export const effRequestHandler: EffRequestHandler =
  (eff) => (request, response) => {
    Eff.unsafeRun(
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
          response.json({ error: "An error ocurred" });
        } else {
          response.json(exit.value);
        }
      }
    );
  };

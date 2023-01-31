import * as Eff from "@effect/io/Effect";
import * as E from "@fp-ts/data/Either";
import { flow, pipe } from "@fp-ts/data/Function";
import { NonEmptyReadonlyArray } from "@fp-ts/data/ReadonlyArray";
import { ParseError } from "@fp-ts/schema/ParseError";
import * as P from "@fp-ts/schema/Parser";
import * as S from "@fp-ts/schema/Schema";
import * as O from "@fp-ts/data/Option";
import { ExpressRequestService } from "../express/RequestService";

export interface ParseBodyError {
  tag: "parse_body_error";
  body: unknown;
  error: NonEmptyReadonlyArray<ParseError>;
}

export const authedRequest = pipe(
  Eff.service(ExpressRequestService),
  Eff.flatMap(({ request, response }) =>
    pipe(
      request.user,
      O.fromNullable,
      (a) => {
        console.log("Do we have a user? ", a);
        return a;
      },
      Eff.fromOption,
      Eff.tapError((err) =>
        Eff.sync(() => {
          console.log(
            `Blocked access to ${request.url}, unauthenticated, ${err}.`
          );
          response.status(401);
          // response.json({ failure: "unauthenticated" });
        })
      )
    )
  )
);

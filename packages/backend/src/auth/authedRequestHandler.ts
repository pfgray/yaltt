import * as Eff from "@effect/io/Effect";
import * as E from "@fp-ts/core/Either";
import { flow, pipe } from "@fp-ts/core/Function";
import { NonEmptyReadonlyArray } from "@fp-ts/core/ReadonlyArray";
import { ParseError } from "@fp-ts/schema/ParseResult";
import * as P from "@fp-ts/schema/Parser";
import * as S from "@fp-ts/schema";
import * as O from "@fp-ts/core/Option";
import { ExpressRequestService } from "../express/RequestService";

export interface UnauthenticatedError {
  tag: "unauthenticated_error";
}

export const authedRequest = pipe(
  Eff.service(ExpressRequestService),
  Eff.flatMap(({ request, response }) =>
    pipe(
      request.user,
      O.fromNullable,
      Eff.fromOption,
      Eff.mapError(
        (): UnauthenticatedError => ({ tag: "unauthenticated_error" })
      ),
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

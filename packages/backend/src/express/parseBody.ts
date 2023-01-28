import * as Eff from "@effect/io/Effect";
import * as E from "@fp-ts/data/Either";
import { pipe } from "@fp-ts/data/Function";
import { NonEmptyReadonlyArray } from "@fp-ts/data/ReadonlyArray";
import { ParseError } from "@fp-ts/schema/ParseError";
import * as P from "@fp-ts/schema/Parser";
import * as S from "@fp-ts/schema/Schema";
import { ExpressRequestService } from "./RequestService";

export interface ParseBodyError {
  tag: "parse_body_error";
  body: unknown;
  error: NonEmptyReadonlyArray<ParseError>;
}

export const parseBody = <A>(bodySchema: S.Schema<A>) =>
  pipe(
    Eff.service(ExpressRequestService),
    Eff.flatMap(({ request }) =>
      pipe(
        request.body,
        P.decode(bodySchema),
        E.mapLeft(
          (error): ParseBodyError => ({
            tag: "parse_body_error",
            body: request.body,
            error,
          })
        ),
        Eff.fromEither
      )
    )
  );

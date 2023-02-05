import * as Eff from "@effect/io/Effect";
import * as E from "@fp-ts/core/Either";
import { flow, pipe } from "@fp-ts/core/Function";
import { NonEmptyReadonlyArray } from "@fp-ts/core/ReadonlyArray";
import { ParseError } from "@fp-ts/schema/ParseResult";
import * as P from "@fp-ts/schema/Parser";
import * as S from "@fp-ts/schema";
import { effRequestHandler } from "./effRequestHandler";
import { ExpressRequestService } from "./RequestService";

export interface ParseParamsError {
  tag: "parse_params_error";
  params: unknown;
  error: NonEmptyReadonlyArray<ParseError>;
}

export const parseParams = <A>(paramsSchema: S.Schema<A>) =>
  pipe(
    Eff.service(ExpressRequestService),
    Eff.flatMap(({ request }) =>
      pipe(
        request.params,
        P.decode(paramsSchema),
        E.mapLeft(
          (error): ParseParamsError => ({
            tag: "parse_params_error",
            params: request.params,
            error,
          })
        ),
        Eff.fromEither
      )
    )
  );

export const withRequestParams =
  <A>(paramsSchema: S.Schema<A>) =>
  (
    handler: (
      params: A
    ) => Eff.Effect<ExpressRequestService, ParseParamsError, A>
  ) =>
    effRequestHandler(pipe(parseParams(paramsSchema), Eff.flatMap(handler)));

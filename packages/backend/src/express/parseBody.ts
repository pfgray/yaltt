import { pipe, Effect, Option, Either } from "effect";
import * as S from "@effect/schema/Schema";
import { effRequestHandler, successResponse } from "./effRequestHandler";
import { ExpressRequestService } from "./RequestService";
import { ParseError } from "@effect/schema/ParseResult";

export interface ParseBodyError {
  tag: "parse_body_error";
  body: unknown;
  error: ParseError;
}

export const parseBodyError = (
  body: unknown,
  error: ParseError
): ParseBodyError => ({
  tag: "parse_body_error",
  body,
  error,
});

export const parseBody = <A>(bodySchema: S.Schema<any, A>) =>
  ExpressRequestService.pipe(
    Effect.flatMap(({ request }) =>
      pipe(
        request.body,
        S.parse(bodySchema),
        Effect.mapError((error) => parseBodyError(request.body, error))
      )
    )
  );

export const withRequestBody =
  <A>(bodySchema: S.Schema<A>) =>
  (
    handler: (
      body: A
    ) => Effect.Effect<ExpressRequestService, ParseBodyError, A>
  ) =>
    effRequestHandler(
      pipe(
        parseBody(bodySchema),
        Effect.flatMap(handler),
        Effect.map(successResponse)
      )
    );

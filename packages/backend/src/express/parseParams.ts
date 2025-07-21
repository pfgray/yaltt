import { pipe, Effect, Option, Either } from "effect";
import * as S from "@effect/schema/Schema";
import { effRequestHandler, successResponse } from "./effRequestHandler";
import { ExpressRequestService } from "./RequestService";
import { ParseError } from "@effect/schema/ParseResult";

export interface ParseParamsError {
  _tag: "parse_params_error";
  params: unknown;
  error: ParseError;
}

export interface ParseJwtError {
  _tag: "parse_jwt_error";
  rawJwt: string;
}

export interface ParseQueryError {
  _tag: "parse_query_error";
  value: unknown;
  query: unknown;
  error?: ParseError;
  paramName: string;
  message?: string;
}

export const parseQueryError = (
  value: unknown,
  query: unknown,
  paramName: string,
  message?: string,
  error?: ParseError
): ParseQueryError => ({
  _tag: "parse_query_error",
  value,
  query,
  error,
  message,
  paramName,
});

export const parseParamsError = (
  params: unknown,
  error: ParseError
): ParseParamsError => ({
  _tag: "parse_params_error",
  params,
  error,
});

export const parseJwtError = (rawJwt: string): ParseJwtError => ({
  _tag: "parse_jwt_error",
  rawJwt,
});

export const parseParams = <A>(paramsSchema: S.Schema<A, any>) =>
  ExpressRequestService.pipe(
    Effect.flatMap(({ request }) =>
      pipe(
        S.decode(paramsSchema)(request.params, { onExcessProperty: "ignore" }),
        Effect.mapError((error) => parseParamsError(request.params, error))
      )
    )
  );

export const parseBodyOrParams = <A>(schema: S.Schema<A, any>) =>
  ExpressRequestService.pipe(
    Effect.flatMap(({ request }) =>
      pipe(
        S.decode(schema)(request.body, { onExcessProperty: "ignore" }),
        Effect.orElse(() =>
          S.decode(schema)(request.params, { onExcessProperty: "ignore" })
        ),
        Effect.mapError((error) => parseParamsError(request.params, error))
      )
    )
  );

export const parseBody = <A>(paramsSchema: S.Schema<A, any>) =>
  ExpressRequestService.pipe(
    Effect.flatMap(({ request }) =>
      pipe(
        request.body,
        S.decode(paramsSchema),
        Effect.mapError((error) => parseParamsError(request.params, error))
      )
    )
  );

export const withRequestParams =
  <A>(paramsSchema: S.Schema<A, any>) =>
  (
    handler: (
      params: A
    ) => Effect.Effect<A, ParseParamsError, ExpressRequestService>
  ) =>
    effRequestHandler(
      pipe(
        parseParams(paramsSchema),
        Effect.flatMap(handler),
        Effect.map(successResponse)
      )
    );

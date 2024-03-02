import {
  BodyFromEndpoint,
  Endpoint,
  ResponseFromEndpoint,
  Route,
  RouteParametersForEndpoint,
  buildPath,
  EndpointResponse,
} from "endpoint-ts";
import { Effect, pipe } from "effect";
import * as S from "@effect/schema/Schema";
import { ParseError } from "@effect/schema/ParseResult";

export type FetchError = FetchException | FetchParseJsonError | FetchParseError;

export type FetchException = {
  _tag: "fetch_exception";
  reason: unknown;
};

const fetchError = (reason: unknown): FetchException => ({
  _tag: "fetch_exception",
  reason,
});

export type FetchParseJsonError = {
  _tag: "fetch_parse_json_error";
  original: string;
  error: unknown;
};

const fetchParseJsonError = (
  original: string,
  error: unknown
): FetchParseJsonError => ({
  _tag: "fetch_parse_json_error",
  original,
  error,
});

export type FetchParseError = {
  _tag: "fetch_parse_error";
  original: unknown;
  reason: ParseError;
};

const fetchParseError = (
  original: unknown,
  reason: ParseError
): FetchParseError => ({
  _tag: "fetch_parse_error",
  original,
  reason,
});

export type FetchFromEndpoint = <
  R extends Route<any, any>,
  RSchema extends S.Schema<any, any, never>,
  Resp extends EndpointResponse<RSchema>,
  E extends Endpoint<
    R,
    "get" | "delete" | "options" | "head",
    RSchema,
    Resp,
    never,
    { _tag: "empty" }
  >
>(
  endpoint: E
) => (
  routeParams: RouteParametersForEndpoint<E>
) => Effect.Effect<
  ResponseFromEndpoint<E>,
  FetchException | FetchParseError | FetchParseJsonError,
  never
>;

export const fetchFromEndpoint: FetchFromEndpoint =
  (endpoint) => (routeParams) =>
    pipe(
      buildPath(endpoint.route, routeParams),
      Effect.flatMap((path) =>
        Effect.tryPromise((signal) => fetch(path, { signal }))
      ),
      Effect.mapError(fetchError),
      Effect.flatMap(parseResponseForEndpoint(endpoint)),
      (a) => a
    );

export type FetchBodyFromEndpoint = <
  E extends Endpoint<
    any,
    "post" | "put" | "delete" | "patch" | "head" | "options",
    any,
    any,
    any,
    any
  >
>(
  endpoint: E
) => (
  routeParams: RouteParametersForEndpoint<E>
) => (
  body: BodyFromEndpoint<E>
) => Effect.Effect<
  ResponseFromEndpoint<E>,
  FetchException | FetchParseError | FetchParseJsonError,
  never
>;

export const fetchBodyFromEndpoint: FetchBodyFromEndpoint =
  (endpoint) => (routeParams) => (body) =>
    pipe(
      buildPath(endpoint.route, routeParams),
      Effect.flatMap((path) =>
        Effect.tryPromise((signal) =>
          fetch(path, {
            method: "POST",
            body: JSON.stringify(body),
            signal,
          })
        )
      ),
      Effect.mapError(fetchError),
      Effect.flatMap(parseResponseForEndpoint(endpoint))
    );

const parseResponseForEndpoint =
  <
    RSchema extends S.Schema<any, any, never>,
    Resp extends EndpointResponse<RSchema>,
    E extends Endpoint<
      any,
      "get" | "post" | "put" | "delete" | "patch" | "head" | "options",
      RSchema,
      Resp,
      any,
      any
    >
  >(
    endpoint: E
  ) =>
  (response: Response) =>
    pipe(
      Effect.tryPromise(() => response.text()),
      Effect.mapError(fetchError),
      Effect.flatMap((responseBody) => {
        const resp = endpoint.response;
        switch (resp._tag) {
          case "json":
            return pipe(
              Effect.try(() => JSON.parse(responseBody)),
              Effect.mapError((err) => fetchParseJsonError(responseBody, err)),
              Effect.flatMap((json) =>
                pipe(
                  S.decode(resp.schema)(json),
                  Effect.mapError((reason) => fetchParseError(json, reason))
                )
              ),
              Effect.map((a): ResponseFromEndpoint<E> => a)
            );
          case "text":
            return pipe(
              Effect.succeed(responseBody),
              Effect.map((a) => a as unknown as ResponseFromEndpoint<E>)
            );
        }
      })
    );

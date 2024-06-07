import {
  BodyFromEndpoint,
  Endpoint,
  ResponseFromEndpoint,
  Route,
  RouteParametersFromEndpoint,
  buildPath,
  EndpointResponse,
  RootPath,
  path,
  param,
  Response,
  QueryFromEndpoint,
  QueryParametersFromEndpoint,
  QuerySchema,
  EndpointBody,
  getRouteString,
} from "endpoint-ts";
import { Effect, Either, Option, ReadonlyArray, pipe } from "effect";
import * as S from "@effect/schema/Schema";
import { ParseError } from "@effect/schema/ParseResult";
import { EncodeError, encodeEither, encodeError } from "@yaltt/model";

export type FetchError = FetchException | FetchParseJsonError | FetchParseError;

export type FetchException = {
  _tag: "fetch_exception";
  url?: string;
  reason: unknown;
};

const fetchError =
  (url?: string) =>
  (reason: unknown): FetchException => ({
    _tag: "fetch_exception",
    url,
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

type EndpointFetchParametersFromEndpoint<
  E extends Endpoint<any, any, any, any, any, any, any>
> = E extends Endpoint<infer Route, infer Query, any, any, any, any, any>
  ? HasKey<Query> extends false
    ? HasKey<RouteParametersFromEndpoint<E>> extends true
      ? [routeParams: RouteParametersFromEndpoint<E>]
      : []
    : [
        routeParams: RouteParametersFromEndpoint<E>,
        query: QueryParametersFromEndpoint<E>
      ]
  : never;

type HasKey<T extends {}> = keyof T extends never ? false : true;

export type FetchFromEndpoint = <
  R extends Route<any, any>,
  Q extends Record<string, QuerySchema<any>>,
  RSchema extends S.Schema<any, any, never>,
  Resp extends EndpointResponse<RSchema>,
  E extends Endpoint<
    R,
    Q,
    "get" | "delete" | "options" | "head",
    RSchema,
    Resp,
    never,
    { _tag: "empty" }
  >
>(
  endpoint: E
) => (
  ...params: EndpointFetchParametersFromEndpoint<E>
) => Effect.Effect<
  ResponseFromEndpoint<E>,
  FetchException | FetchParseError | FetchParseJsonError | EncodeError,
  never
>;

const buildUrlForEndpointAndParams =
  <
    R extends Route<any, any>,
    Q extends Record<string, QuerySchema<any>>,
    RSchema extends S.Schema<any, any, never>,
    Resp extends EndpointResponse<RSchema>,
    BSchema extends S.Schema<any, any, never>,
    Body extends EndpointBody<BSchema>,
    E extends Endpoint<R, Q, any, RSchema, Resp, BSchema, Body>
  >(
    endpoint: E
  ) =>
  (
    routeParams?: RouteParametersFromEndpoint<E>,
    queryParams?: QueryParametersFromEndpoint<E>
  ) =>
    pipe(
      buildPath(
        endpoint.route,
        typeof routeParams === "undefined" ? {} : routeParams
      ),
      Effect.mapError(encodeError(null)),
      Effect.bindTo("path"),
      Effect.bind("queryParams", () =>
        encodeQueryParams(
          typeof queryParams === "undefined" ? {} : queryParams,
          endpoint.query
        )
      ),
      Effect.let("queryParamStr", ({ queryParams }) => {
        const params = queryParams.toString();
        return params === "" ? "" : `?${params}`;
      }),
      Effect.map(({ path, queryParamStr }) => "/" + path + queryParamStr)
    );

export const fetchFromEndpoint: FetchFromEndpoint =
  (endpoint) => (routeParams, queryParams) =>
    pipe(
      buildUrlForEndpointAndParams(endpoint)(routeParams, queryParams),
      Effect.mapError(fetchError(getRouteString(endpoint.route))),
      Effect.bindTo("url"),
      (a) => a,
      Effect.bind("resp", ({ url }) => {
        return pipe(
          Effect.tryPromise((signal) =>
            fetch(url, { signal, headers: { Accept: "application/json" } })
          ),
          Effect.mapError(fetchError(url))
        );
      }),
      (a) => a,
      Effect.flatMap(({ resp, url }) =>
        pipe(
          resp,
          parseResponseForEndpoint(endpoint, url),
          Effect.mapError(fetchError(url))
        )
      ),
      (a) => a
    );

const encodeQueryParams = (
  queryParams: Record<string, any>,
  querySchemas: Record<string, QuerySchema<any>>
) => {
  return pipe(
    Object.entries(queryParams).map(([name, value]) => {
      const schema = querySchemas[name];
      if (schema._tag === "Array" && value instanceof Array) {
        // assume value is an array also
        return pipe(
          value.map(encodeEither(schema.schema)),
          Either.all,
          Either.map((vs) => vs.map((v) => [name, v] as const))
        );
      } else if (schema._tag === "Optional") {
        // assume value is an Option
        return pipe(
          value as Option.Option<any>,
          Option.match({
            onNone: () => Either.right([]),
            onSome: (v) =>
              pipe(
                encodeEither(schema.schema)(v),
                Either.map((v) => [[name, v] as const])
              ),
          })
        );
      } else {
        return pipe(
          encodeEither(schema.schema)(value),
          Either.map((v) => [[name, v] as const])
        );
      }
    }),
    Either.all,
    Either.map((params) => {
      const searchParams = new URLSearchParams();
      params
        .flatMap((a) => a)
        .forEach(([name, value]) => {
          searchParams.append(name, value);
        });
      return searchParams;
    })
  );
};

export type FetchBodyFromEndpoint = <
  R extends Route<any, any>,
  Q extends Record<string, QuerySchema<any>>,
  RSchema extends S.Schema<any, any, never>,
  Resp extends EndpointResponse<RSchema>,
  BSchema extends S.Schema<any, any, never>,
  Body extends EndpointBody<BSchema>,
  E extends Endpoint<
    R,
    Q,
    "post" | "put" | "delete" | "patch" | "head" | "options",
    RSchema,
    Resp,
    BSchema,
    Body
  >
>(
  endpoint: E
) => (
  ...params: EndpointFetchParametersFromEndpoint<E>
) => (
  body: BodyFromEndpoint<E>
) => Effect.Effect<
  ResponseFromEndpoint<E>,
  FetchException | FetchParseError | FetchParseJsonError | EncodeError,
  never
>;

export const fetchBodyFromEndpoint: FetchBodyFromEndpoint =
  (endpoint) => (routeParams, queryParams) => (body) =>
    pipe(
      buildUrlForEndpointAndParams(endpoint)(routeParams, queryParams),
      Effect.bindTo("path"),
      Effect.bind("body", () => {
        if (endpoint.body._tag === "empty") {
          return Either.right(undefined);
        } else {
          return pipe(
            body,
            S.encode(endpoint.body.schema),
            Effect.mapError((reason) => encodeError(body)(reason))
          );
        }
      }),
      Effect.flatMap(({ path, body }) =>
        pipe(
          Effect.tryPromise((signal) =>
            fetch(path, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              method: "POST",
              body: JSON.stringify(body),
              signal,
            })
          ),
          Effect.mapError(fetchError(path)),
          Effect.flatMap((resp) =>
            resp.ok
              ? Either.right(resp)
              : pipe(
                  Effect.tryPromise(() => resp.json()),
                  Effect.mapError(() => fetchParseJsonError(path, null)),
                  Effect.flatMap((json) => Either.left(fetchError(path)(json)))
                )
          )
        )
      ),

      // Effect.catch("_tag", {
      //   failure: "UnknownException",
      //   onFailure: (e) => Effect.raiseError(fetchError(e)),
      // }),

      // Effect.mapError(fetchError()),
      Effect.flatMap(parseResponseForEndpoint(endpoint))
    );

const parseResponseForEndpoint =
  <
    RSchema extends S.Schema<any, any, never>,
    Resp extends EndpointResponse<RSchema>,
    E extends Endpoint<
      any,
      any,
      "get" | "post" | "put" | "delete" | "patch" | "head" | "options",
      RSchema,
      Resp,
      any,
      any
    >
  >(
    endpoint: E,
    url?: string
  ) =>
  (response: Response) =>
    pipe(
      Effect.tryPromise(() => response.text()),
      Effect.mapError(fetchError(url)),
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

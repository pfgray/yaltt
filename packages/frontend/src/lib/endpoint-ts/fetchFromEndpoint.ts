import {
  BodyFromEndpoint,
  Endpoint,
  ResponseFromEndpoint,
  Route,
  RouteParametersForEndpoint,
  buildPath,
  EndpointResponse,
  EndpointBody,
  path,
  RootPath,
  Response,
  ResponseTypeFromResponse,
  param,
} from "endpoint-ts";
import { Effect, ReadonlyArray, pipe } from "effect";
import { RequestService } from "../api/request";
import { App, AppId, createApp, getApp, getApps, match } from "@yaltt/model";
import * as S from "@effect/schema/Schema";
import { ParseError } from "@effect/schema/ParseResult";

export type FetchError = {
  _tag: "fetch_error";
  reason: unknown;
};

const fetchError = (reason: unknown): FetchError => ({
  _tag: "fetch_error",
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
  reason?: ParseError;
};

const fetchParseError = (
  original: unknown,
  reason?: ParseError
): FetchParseError => ({
  _tag: "fetch_parse_error",
  original,
  reason,
});

export type FetchFromEndpoint = <
  R extends Route<any, any>,
  RSchema extends S.Schema<any, any, never>,
  Resp extends EndpointResponse<RSchema>,
  // BSchema extends S.Schema<any, any, never>,
  // Body extends { _tag: "empty" },
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
  FetchError | FetchParseError | FetchParseJsonError,
  RequestService
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
  FetchError | FetchParseError | FetchParseJsonError,
  RequestService
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
              Effect.tryPromise(() => JSON.parse(responseBody)),
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

const fetchApps = fetchFromEndpoint(getApps);
const fetchApp = fetchFromEndpoint(getApp);
const fetchCreateApp = fetchBodyFromEndpoint(createApp);

pipe(
  fetchCreateApp({})({}),
  Effect.map((a) => a)
);

pipe(
  fetchApps({}),
  Effect.flatMap((apps) => ReadonlyArray.head(apps)),
  Effect.flatMap((app) => fetchApp({ appId: app.id }))
);

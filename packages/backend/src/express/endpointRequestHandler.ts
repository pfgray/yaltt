import { Effect, Either, Option, ReadonlyArray, pipe } from "effect";

import * as S from "@effect/schema/Schema";
import {
  DecodeError,
  EncodeError,
  decodeError,
  encode,
  encodeError,
} from "@yaltt/model";
import {
  BodyFromEndpoint,
  Endpoint,
  EndpointBody,
  EndpointMethod,
  EndpointResponse,
  QueryParametersFromEndpoint,
  QuerySchema,
  ResponseFromEndpoint,
  Route,
  RouteCodec,
  RouteParametersFromEndpoint,
  getRouteString,
} from "endpoint-ts";
import * as express from "express";
import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../auth/authedRequestHandler";
import { ConfigService } from "../config/ConfigService";
import { KeyError, KeyService } from "../crypto/KeyService";
import { HashError } from "../crypto/hash";
import { QueryService } from "../db/QueryService";
import { DecodeQueryError, NoRecordFound, PgError } from "../db/db";
import {
  FetchError,
  FetchJsonParseError,
  FetchService,
  FetchStatusError,
} from "../fetch/FetchService";
import { ExpressRequestService } from "./RequestService";
import { EffErrors, EffServices, effRequestHandler } from "./effRequestHandler";
import { ParseBodyError } from "./parseBody";
import {
  ParseJwtError,
  ParseParamsError,
  ParseQueryError,
  parseQueryError,
} from "./parseParams";

type Response = {
  status: number;
  body?: unknown;
  raw: boolean;
  headers?: Record<string, string>;
  schema?: S.Schema<any, unknown>;
};

export const response =
  (status: number) =>
  (
    body?: unknown,
    headers?: Record<string, string>,
    raw: boolean = false,
    schema?: S.Schema<any, any>
  ) => ({
    status,
    body,
    raw,
    headers,
    schema,
  });

export const schemaResponse =
  <A>(status: number, schema: S.Schema<A, any>) =>
  (body: A, headers?: Record<string, string>, raw: boolean = false) =>
    response(status)(body, headers, raw, schema);

export const successResponse = response(200);
export const redirectResponse = (location: string) =>
  response(302)(undefined, {
    Location: location,
  });

export type EndpointHandler = {
  <
    R extends Route<any, Record<string, RouteCodec<any>>>,
    Q extends Record<string, QuerySchema<any>>,
    RSchema extends S.Schema<any, any, never>,
    Resp extends EndpointResponse<RSchema>,
    BSchema extends S.Schema<any, any, never>,
    Body extends EndpointBody<BSchema>,
    E extends Endpoint<R, Q, any, RSchema, Resp, BSchema, Body>
  >(
    endpoint: E
  ): (
    endpointHandler: (
      params: RouteParametersFromEndpoint<E>,
      query: QueryParametersFromEndpoint<E>,
      body: BodyFromEndpoint<E>
    ) => EndpointEffect<ResponseFromEndpoint<E>>
  ) => express.RequestHandler<
    Record<string, string>,
    unknown,
    unknown,
    Record<string, string | string[] | undefined>,
    {}
  >;
};

export type EndpointEffect<A> = Effect.Effect<A, EffErrors, EffServices>;

export const bindEndpoint =
  (router: express.Router) =>
  <
    R extends Route<any, Record<string, RouteCodec<any>>>,
    Q extends Record<string, QuerySchema<any>>,
    RSchema extends S.Schema<any, any, never>,
    Resp extends EndpointResponse<RSchema>,
    BSchema extends S.Schema<any, any, never>,
    Body extends EndpointBody<BSchema>,
    E extends Endpoint<R, Q, EndpointMethod, RSchema, Resp, BSchema, Body>
  >(
    endpoint: E
  ) =>
  (
    eff: (
      params: RouteParametersFromEndpoint<E>,
      query: QueryParametersFromEndpoint<E>,
      body: BodyFromEndpoint<E>
    ) => EndpointEffect<ResponseFromEndpoint<E>>
  ) => {
    router[endpoint.method](
      getRouteString(endpoint.route),
      endpointHandler(endpoint)(eff)
    );
  };

export const endpointHandler: EndpointHandler = (endpoint) => (eff) =>
  pipe(
    parseParams(endpoint.route.routeParamCodecs),
    Effect.bindTo("routeParams"),
    Effect.bind("queryParams", () => parseQuery(endpoint.query)),
    Effect.bind("body", () => {
      if (endpoint.body._tag === "json") {
        return parseBody(endpoint.body.schema);
      } else {
        return Effect.succeed(undefined);
      }
    }),
    Effect.flatMap(({ routeParams, queryParams, body }) =>
      eff(routeParams, queryParams as unknown as any, body)
    ),
    (a) => a,
    Effect.flatMap((respBody): Either.Either<Response, EncodeError> => {
      const responseMeta = endpoint.response;
      if (responseMeta._tag === "json") {
        return pipe(
          S.encodeEither(responseMeta.schema)(respBody),
          Either.map(response(200)),
          (a) => a,
          Either.mapLeft((a) => ({
            ...encodeError(respBody)(a),
          })),
          (a) => a
        );
      } else {
        return Either.right(response(200)(respBody));
      }
    }),
    effRequestHandler
  );

export const parseParams = (paramCodecs: Record<string, RouteCodec<any>>) =>
  ExpressRequestService.pipe(
    Effect.flatMap(({ request, response }) => {
      return pipe(
        Object.entries(paramCodecs).map(([name, codec]) =>
          pipe(
            S.decodeEither(codec)(request.params[name]),
            Either.mapLeft((a) => ({
              ...decodeError(request.params[name])(a),
              message: `Failed to parse parameter ${name} from value: ${request.params[name]}`,
            })),
            Either.map((v) => [name, v] as const)
          )
        ),
        Either.all,
        Either.map(Object.fromEntries)
      );
    })
  );

type QuerySchemaResult<T> = T extends QuerySchema<infer A>
  ? T extends { _tag: "Array" }
    ? A[]
    : T extends { _tag: "Single" }
    ? A
    : T extends { _tag: "Optional" }
    ? Option.Option<A>
    : never
  : never;

export const parseQuery = <T extends Record<string, QuerySchema<any>>>(
  queryCodecs: T
): Effect.Effect<
  { [K in keyof T]: QuerySchemaResult<T[K]> },
  ParseQueryError | DecodeError,
  ExpressRequestService
> =>
  ExpressRequestService.pipe(
    Effect.flatMap(({ request, response }) => {
      return pipe(
        Object.entries(queryCodecs).map(([name, codec]) => {
          if (codec._tag === "Array") {
            return parseArrayQueryParam(
              name,
              request.query[name],
              codec.schema,
              request.query
            );
          } else if (codec._tag === "Single") {
            return parseSingleQueryParam(
              name,
              request.query[name],
              codec.schema,
              request.query
            );
          } else {
            return pipe(
              Option.fromNullable(request.query[name]),
              Option.match({
                onNone: () => Either.right([name, Option.none()]),
                onSome: (v) => {
                  return parseOptionalQueryParams(
                    name,
                    v,
                    codec.schema,
                    request.query
                  );
                },
              })
            );
          }
        }),
        Either.all,
        Either.map(Object.fromEntries)
      );
    })
  ) as Effect.Effect<
    { [K in keyof T]: QuerySchemaResult<T[K]> },
    ParseQueryError | DecodeError,
    ExpressRequestService
  >;

export const parseBody = (codec: S.Schema<any, any, never>) =>
  ExpressRequestService.pipe(
    Effect.flatMap(({ request, response }) =>
      pipe(
        S.decodeEither(codec)(request.body),
        Either.mapLeft(decodeError(request.body))
      )
    )
  );

export const parseArrayQueryParam = (
  name: string,
  value: string | string[] | undefined,
  schema: S.Schema<any, string, never>,
  query: unknown
): Either.Either<readonly [string, any[]], DecodeError | ParseQueryError> => {
  if (typeof value === undefined) {
    return Either.right([name, []]);
  } else if (Array.isArray(value)) {
    return pipe(
      value.map((v) => parseParam(v, schema)),
      Either.all,
      Either.map((v) => [name, v])
    );
  } else if (typeof value === "string") {
    return pipe(
      parseParam(value, schema),
      Either.map((v) => [name, v])
    );
  } else {
    return Either.left(
      parseQueryError(value, query, name, `Expected array but was: ${value}`)
    );
  }
};

const parseSingleQueryParam = (
  name: string,
  value: string | string[] | undefined,
  schema: S.Schema<any, string, never>,
  query: unknown
): Either.Either<readonly [string, any], DecodeError | ParseQueryError> => {
  if (typeof value === undefined) {
    return Either.left(
      parseQueryError(
        value,
        query,
        name,
        `Value is required, but was not provided`
      )
    );
  } else if (Array.isArray(value)) {
    return pipe(
      value,
      ReadonlyArray.head,
      Option.match({
        onNone: () =>
          Either.left(
            parseQueryError(
              value,
              query,
              name,
              `Value is required, but was not provided`
            )
          ),
        onSome: (v) => parseParam(v, schema),
      })
    );
  } else if (typeof value === "string") {
    return pipe(
      parseParam(value, schema),
      Either.map((v) => [name, v])
    );
  } else {
    return Either.left(
      parseQueryError(value, query, name, `Expected string but was: ${value}`)
    );
  }
};

const parseOptionalQueryParams = (
  name: string,
  value: string | string[] | undefined,
  schema: S.Schema<any, string, never>,
  query: unknown
): Either.Either<readonly [string, any], DecodeError | ParseQueryError> => {
  if (typeof value === "string") {
    return pipe(
      parseParam(value, schema),
      Either.map((v) => [name, Option.some(v)] as const)
    );
  } else if (Array.isArray(value)) {
    return pipe(
      value,
      ReadonlyArray.head,
      Option.match({
        onNone: () => Either.right([name, Option.none()]),
        onSome: (v) => parseParam(v, schema),
      }),
      Either.map((v) => [name, Option.some(v)] as const)
    );
  } else if (typeof value === "undefined") {
    return Either.right([name, Option.none()]);
  } else {
    return Either.left(
      parseQueryError(
        value,
        query,
        name,
        `Expected string or array or undefined but was: ${value}`
      )
    );
  }
};

export const parseParam = (
  value: string,
  schema: S.Schema<any, string, never>
) =>
  pipe(
    S.decodeEither(schema)(value),
    Either.mapLeft((a) => ({
      ...decodeError(value)(a),
      message: `Failed to parse parameter from value: ${value}`,
    }))
  );

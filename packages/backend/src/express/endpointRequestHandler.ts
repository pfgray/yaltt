import { Effect, Either, Option, ReadonlyArray, pipe } from "effect";

import * as S from "@effect/schema/Schema";
import { DecodeError, decodeError } from "@yaltt/model";
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
import { effRequestHandler } from "./effRequestHandler";
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

type EffErrors =
  | PgError
  | DecodeQueryError
  | DecodeError
  | NoRecordFound
  | HashError
  | UnauthenticatedError
  | UnauthorizedError
  | ParseBodyError
  | ParseParamsError
  | ParseQueryError
  | FetchError
  | FetchJsonParseError
  | FetchStatusError
  | KeyError
  | ParseJwtError;

type EffServices =
  | ExpressRequestService
  | QueryService
  | KeyService
  | ConfigService
  | FetchService;

export type EffRequestHandler = (
  eff: Effect.Effect<Response, EffErrors, EffServices>
) => express.RequestHandler<
  unknown,
  unknown,
  unknown,
  Record<string, string | string[] | undefined>,
  {}
>;

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
      eff(routeParams, queryParams, body)
    ),
    Effect.flatMap((respBody): Either.Either<Response, DecodeError> => {
      const responseMeta = endpoint.response;
      if (responseMeta._tag === "json") {
        return pipe(
          S.encodeEither(responseMeta.schema)(respBody),
          Either.map(response(200)),
          Either.mapLeft((a) => ({
            ...decodeError(respBody)(a),
          }))
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

export const parseQuery = (queryCodecs: Record<string, QuerySchema<any>>) =>
  ExpressRequestService.pipe(
    Effect.flatMap(({ request, response }) => {
      return pipe(
        Object.entries(queryCodecs).map(([name, codec]) => {
          if (codec._tag === "Array") {
            return parseArrayQueryParam(
              name,
              request.query[name],
              codec.schema
            );
          } else if (codec._tag === "Single") {
            return parseSingleQueryParam(
              name,
              request.query[name],
              codec.schema
            );
          } else {
            return pipe(
              Option.fromNullable(request.query[name]),
              Option.match({
                onNone: () => Either.right([name, Option.none()]),
                onSome: (v) => {
                  return parseOptionalQueryParams(name, v, codec.schema);
                },
              })
            );
          }
        }),
        Either.all,
        Either.map(Object.fromEntries)
      );
    })
  );

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
  schema: S.Schema<any, string, never>
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
    return Either.left(parseQueryError(value));
  }
};

const parseSingleQueryParam = (
  name: string,
  value: string | string[] | undefined,
  schema: S.Schema<any, string, never>
): Either.Either<readonly [string, any], DecodeError | ParseQueryError> => {
  if (typeof value === undefined) {
    return Either.left(parseQueryError(value));
  } else if (Array.isArray(value)) {
    return pipe(
      value,
      ReadonlyArray.head,
      Option.match({
        onNone: () => Either.left(parseQueryError(value)),
        onSome: (v) => parseParam(v, schema),
      })
    );
  } else if (typeof value === "string") {
    return pipe(
      parseParam(value, schema),
      Either.map((v) => [name, v])
    );
  } else {
    return Either.left(parseQueryError(value));
  }
};

const parseOptionalQueryParams = (
  name: string,
  value: string | string[] | undefined,
  schema: S.Schema<any, string, never>
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
    return Either.left(parseQueryError(value));
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

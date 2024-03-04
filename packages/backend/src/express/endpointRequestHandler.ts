import { Effect, Either, pipe } from "effect";

import * as S from "@effect/schema/Schema";
import { DecodeError } from "@yaltt/model";
import {
  Endpoint,
  EndpointResponse,
  ResponseFromEndpoint,
  Route,
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
) => express.RequestHandler<unknown, unknown, unknown, unknown, {}>;

export type EndpointHandler = {
  <
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
  ): (
    endpointHandler: EndpointEffect<ResponseFromEndpoint<E>>
  ) => express.RequestHandler<unknown, unknown, unknown, unknown, {}>;
};

type EndpointEffect<A> = Effect.Effect<A, EffErrors, EffServices>;

export const endpointHandler: EndpointHandler = (endpoint) => (eff) =>
  pipe(
    eff,
    Effect.flatMap((respBody): Either.Either<Response, DecodeError> => {
      const responseMeta = endpoint.response;
      if (responseMeta._tag === "json") {
        return pipe(
          S.encodeEither(responseMeta.schema)(respBody),
          Either.map(response(200)),
          Either.mapLeft((e) => ({
            _tag: "decode_error" as const,
            error: e,
            actual: respBody,
          }))
        );
      } else {
        return Either.right(response(200)(respBody));
      }
    }),
    effRequestHandler
  );

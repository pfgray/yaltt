import * as S from "@effect/schema/Schema";
import { RootPath, Route, RouteParametersForRoute, path } from "../route/route";
import {
  EndpointResponse,
  ResponseTypeFromResponse,
  Response,
} from "./endpointResponse";
import { Body, BodyTypeFromBody, EndpointBody } from "./endpointBody";

export type EndpointMethod =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "head"
  | "options";

export type Endpoint<
  R extends Route<any, any>,
  Query extends Record<string, S.Schema<any, string, never>>,
  M extends EndpointMethod,
  RSchema extends S.Schema<any, any, never>,
  Resp extends EndpointResponse<RSchema> = EndpointResponse<RSchema>,
  BSchema extends S.Schema<any, any, never> = S.Schema<unknown, unknown, never>,
  Body extends EndpointBody<BSchema> = EndpointBody<BSchema>
> = {
  route: R;
  query: Query;
  method: M;
  body: Body;
  response: Resp;
};

export type BodyFromEndpoint<
  E extends Endpoint<any, any, any, any, any, any, any>
> = E extends Endpoint<any, any, any, any, any, any, infer Body>
  ? BodyTypeFromBody<Body>
  : never;

export type ResponseFromEndpoint<
  E extends Endpoint<any, any, any, any, any, any, any>
> = E extends Endpoint<any, any, any, any, infer Resp, any, any>
  ? ResponseTypeFromResponse<Resp>
  : never;

export type RouteFromEndpoint<
  E extends Endpoint<any, any, any, any, any, any, any>
> = E extends Endpoint<infer R, any, any, any, any, any, any> ? R : never;

export type RouteParametersFromEndpoint<
  E extends Endpoint<any, any, any, any, any, any, any>
> = RouteParametersForRoute<RouteFromEndpoint<E>>;

export type QueryFromEndpoint<
  E extends Endpoint<any, any, any, any, any, any, any>
> = E extends Endpoint<any, infer Q, any, any, any, any, any> ? Q : never;

export type QueryParametersFromEndpoint<
  E extends Endpoint<any, any, any, any, any, any, any>
> = {
  [key in keyof QueryFromEndpoint<E>]: S.Schema.To<QueryFromEndpoint<E>[key]>;
}; // S.Schema.To<>;

export function makeEndpoint<
  R extends Route<any, any>,
  Q extends Record<string, S.Schema<any, any, never>>,
  M extends "get" | "post" | "put" | "delete" | "patch" | "head" | "options",
  RSchema extends S.Schema<any, any, never>,
  Resp extends EndpointResponse<RSchema> = EndpointResponse<RSchema>,
  BSchema extends S.Schema<any, any, never> = S.Schema<unknown, unknown, never>,
  Body extends EndpointBody<BSchema> = EndpointBody<BSchema>
>(params: {
  route: R;
  query: Q;
  method: M;
  body: Body;
  response: Resp;
}): Endpoint<R, Q, M, RSchema, Resp, BSchema, Body> {
  return params;
}

type SchemaFromResponse<R> = R extends EndpointResponse<infer RSchema>
  ? RSchema
  : never;

export const Endpoint = {
  /**
   * Defines an endpoint for the GET method
   * @param route
   * @param response
   * @returns
   */
  get: <
    R extends Route<any, any>,
    Resp extends EndpointResponse<any>,
    Q extends Record<string, S.Schema<any, string, never>>
  >(
    route: R,
    query: Q,
    response: Resp
  ): Endpoint<
    R,
    Q,
    "get",
    SchemaFromResponse<Resp>,
    Resp,
    never,
    { _tag: "empty" }
  > => ({
    route,
    method: "get",
    response,
    body: Body.empty,
    query,
  }),
  /**
   * Defines an endpoint for the POST method
   * @param route
   * @param body
   * @param response
   * @returns
   */
  post: <
    R extends Route<any, any>,
    Q extends Record<string, S.Schema<any, any, never>>,
    RSchema extends S.Schema<any, any, never>,
    Resp extends EndpointResponse<RSchema>,
    BSchema extends S.Schema<any, any, never>,
    Body extends EndpointBody<BSchema>
  >(
    route: R,
    query: Q,
    response: Resp,
    body: Body
  ): Endpoint<R, Q, "post", RSchema, Resp, BSchema, Body> => ({
    route,
    method: "post",
    body,
    response,
    query,
  }),
  delete: <
    R extends Route<any, any>,
    Q extends Record<string, S.Schema<any, any, never>>,
    RSchema extends S.Schema<any, any, never>,
    Resp extends EndpointResponse<RSchema>,
    BSchema extends S.Schema<any, any, never>,
    Body extends EndpointBody<BSchema>
  >(
    route: R,
    query: Q,
    response: Resp,
    body: Body
  ): Endpoint<R, Q, "delete", RSchema, Resp, BSchema, Body> => ({
    route,
    method: "delete",
    body,
    response,
    query,
  }),
};

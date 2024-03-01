import * as S from "@effect/schema/Schema";
import { RootPath, Route, RouteParametersForRoute } from "../route/route";
import {
  EndpointResponse,
  ResponseTypeFromResponse,
  Response,
} from "./endpointResponse";
import { Body, BodyTypeFromBody, EndpointBody } from "./endpointBody";

export type Endpoint<
  R extends Route<any, any>,
  M extends "get" | "post" | "put" | "delete" | "patch" | "head" | "options",
  RSchema extends S.Schema<any, any, never>,
  Resp extends EndpointResponse<RSchema> = EndpointResponse<RSchema>,
  BSchema extends S.Schema<any, any, never> = S.Schema<unknown, unknown, never>,
  Body extends EndpointBody<BSchema> = EndpointBody<BSchema>
> = {
  route: R;
  method: M;
  body: Body;
  response: Resp;
};

export type BodyFromEndpoint<E extends Endpoint<any, any, any, any, any, any>> =
  E extends Endpoint<any, any, any, any, infer BSchema, infer Body>
    ? BodyTypeFromBody<BSchema, Body>
    : never;

export type ResponseFromEndpoint<
  E extends Endpoint<any, any, any, any, any, any>
> = E extends Endpoint<any, any, infer RSchema, infer Resp, any, any>
  ? ResponseTypeFromResponse<RSchema, Resp>
  : never;

export type RouteFromEndpoint<
  E extends Endpoint<any, any, any, any, any, any>
> = E extends Endpoint<infer R, any, any, any, any, any> ? R : never;

export type RouteParametersForEndpoint<
  E extends Endpoint<any, any, any, any, any, any>
> = RouteParametersForRoute<RouteFromEndpoint<E>>;

export function makeEndpoint<
  R extends Route<any, any>,
  M extends "get" | "post" | "put" | "delete" | "patch" | "head" | "options",
  RSchema extends S.Schema<any, any, never>,
  Resp extends EndpointResponse<RSchema> = EndpointResponse<RSchema>,
  BSchema extends S.Schema<any, any, never> = S.Schema<unknown, unknown, never>,
  Body extends EndpointBody<BSchema> = EndpointBody<BSchema>
>(params: {
  route: R;
  method: M;
  body: Body;
  response: Resp;
}): Endpoint<R, M, RSchema, Resp, BSchema, Body> {
  return params;
}

const hmm = makeEndpoint({
  route: RootPath,
  method: "get",
  body: Body.empty,
  response: Response.text,
});

type Foo = ResponseFromEndpoint<typeof hmm>;

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
  get: <R extends Route<any, any>, Resp extends EndpointResponse<any>>(
    route: R,
    response: Resp
  ): Endpoint<
    R,
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
    RSchema extends S.Schema<any, any, never>,
    Resp extends EndpointResponse<RSchema>,
    BSchema extends S.Schema<any, any, never>,
    Body extends EndpointBody<BSchema>
  >(
    route: R,
    response: Resp,
    body: Body
  ): Endpoint<R, "post", RSchema, Resp, BSchema, Body> => ({
    route,
    method: "post",
    body,
    response,
  }),
};

const resp = Response.json(S.number);

const test = Endpoint.get(RootPath, resp);
type adfasfd = ResponseFromEndpoint<typeof test>;

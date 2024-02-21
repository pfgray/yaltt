import * as S from "@effect/schema/Schema";
import { Route, RouteParametersForRoute } from "../route/route";

export type Endpoint<
  R extends Route<any, any>,
  M extends "get" | "post" | "put" | "delete" | "patch" | "head" | "options",
  Body extends S.Schema<any, any, never>,
  Resp extends S.Schema<any, any, never>
> = {
  route: R;
  method: M;
  body?: Body;
  response: Resp;
};

export type BodyFromEndpoint<E extends Endpoint<any, any, any, any>> =
  E extends Endpoint<any, any, S.Schema<infer B, any, never>, any> ? B : never;

export type ResponseFromEndpoint<E extends Endpoint<any, any, any, any>> =
  E extends Endpoint<any, any, any, S.Schema<infer B, any, never>> ? B : never;

export type RouteFromEndpoint<E extends Endpoint<any, any, any, any>> =
  E extends Endpoint<infer R, any, any, any> ? R : never;

export type RouteParametersForEndpoint<E extends Endpoint<any, any, any, any>> =
  E extends Endpoint<infer R, any, any, any>
    ? RouteParametersForRoute<R>
    : never;

export function makeEndpoint<
  R extends Route<any, any>,
  M extends "get" | "post" | "put" | "delete" | "patch" | "head" | "options",
  Body extends S.Schema<any, any, never>,
  Resp extends S.Schema<any, any, never>
>(params: {
  route: R;
  method: M;
  body: Body;
  response: Resp;
}): Endpoint<R, M, Body, Resp> {
  return params;
}

export function getEndpoint<
  R extends Route<any, any>,
  Resp extends S.Schema<any, any, never>
>(
  route: R,
  response: Resp
): Endpoint<R, "get", S.Schema<unknown, any, never>, Resp> {
  return {
    route,
    method: "get",
    response,
  };
}

export function postEndpoint<
  R extends Route<any, any>,
  Body extends S.Schema<any, any, never>,
  Resp extends S.Schema<any, any, never>
>(route: R, body: Body, response: Resp): Endpoint<R, "post", Body, Resp> {
  return {
    route,
    method: "post",
    body,
    response,
  };
}

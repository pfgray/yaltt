import * as S from "@effect/schema/Schema";
import { Route, RouteCodec, RouteParamsFromRoute } from "../route/route";

export type Endpoint<
  R extends Array<string>,
  RPs extends Partial<Record<RouteParamsFromRoute<R>, RouteCodec<any>>>,
  M extends "get" | "post" | "put" | "delete" | "patch" | "head" | "options",
  Body extends S.Schema<any, any, never>,
  Resp extends S.Schema<any, any, never>
> = {
  route: Route<R, RPs>;
  method: M;
  body?: Body;
  response: Resp;
};

export type BodyFromEndpoint<E extends Endpoint<any, any, any, any, any>> =
  E extends Endpoint<any, any, any, S.Schema<infer B, any, never>, any>
    ? B
    : never;

export type ResponseFromEndpoint<E extends Endpoint<any, any, any, any, any>> =
  E extends Endpoint<any, any, any, any, S.Schema<infer B, any, never>>
    ? B
    : never;

export type RouteFromEndpoint<E extends Endpoint<any, any, any, any, any>> =
  E extends Endpoint<infer R, any, any, any, any> ? R : never;

export type RouteParamsFromEndpoint<
  E extends Endpoint<any, any, any, any, any>
> = e extends Endpoint<infer R, infer RPs, any, any, any> ? RPs : never;

export function makeEndpoint<
  R extends Array<string>,
  RPs extends Partial<Record<RouteParamsFromRoute<R>, RouteCodec<any>>>,
  M extends "get" | "post" | "put" | "delete" | "patch" | "head" | "options",
  Body extends S.Schema<any, any, never>,
  Resp extends S.Schema<any, any, never>
>(params: {
  route: Route<R, RPs>;
  method: M;
  body: Body;
  response: Resp;
}): Endpoint<R, RPs, M, Body, Resp> {
  return params;
}

export function getEndpoint<
  R extends Array<string>,
  RPs extends Partial<Record<RouteParamsFromRoute<R>, RouteCodec<any>>>,
  Resp extends S.Schema<any, any, never>
>(
  route: Route<R, RPs>,
  response: Resp
): Endpoint<R, RPs, "get", S.Schema<unknown, any, never>, Resp> {
  return {
    route,
    method: "get",
    response,
  };
}

export function postEndpoint<
  R extends Array<string>,
  RPs extends Partial<Record<RouteParamsFromRoute<R>, RouteCodec<any>>>,
  Body extends S.Schema<any, any, never>,
  Resp extends S.Schema<any, any, never>
>(
  route: Route<R, RPs>,
  body: Body,
  response: Resp
): Endpoint<R, RPs, "post", Body, Resp> {
  return {
    route,
    method: "post",
    body,
    response,
  };
}

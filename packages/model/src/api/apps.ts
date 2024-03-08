import * as S from "@effect/schema/Schema";
import { pipe } from "effect";
import { Body, Endpoint, Response, param, path } from "endpoint-ts";
import { App, AppId, UncreatedApp } from "../app/App";
import { basePath } from "./base";

export const appsRoute = pipe(basePath, path("apps"));

export const appRoute = pipe(
  appsRoute,
  param("appId", S.compose(S.NumberFromString, AppId))
);

export const getApps = Endpoint.get(appsRoute, {}, Response.json(S.array(App)));
export const getApp = Endpoint.get(appRoute, {}, Response.json(App));
export const deleteApp = Endpoint.delete(
  appRoute,
  {},
  Response.json(App),
  Body.empty
);
export const createApp = Endpoint.post(
  appsRoute,
  {},
  Response.json(App),
  Body.json(UncreatedApp)
);

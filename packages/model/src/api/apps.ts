import { pipe } from "effect";
import { basePath } from "./base";
import { getEndpoint, param, path, postEndpoint } from "endpoint-ts";
import { App, AppId, UncreatedApp } from "../app/App";
import * as S from "@effect/schema/Schema";

export const appsRoute = pipe(basePath, path("apps"));

export const appRoute = pipe(
  appsRoute,
  param("appId", S.compose(S.NumberFromString, AppId))
);

export const AppEndpoints = {
  getApp: getEndpoint(appRoute, App),
  createApp: postEndpoint(appsRoute, UncreatedApp, App),
};

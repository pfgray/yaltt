import { pipe } from "effect";
import { basePath } from "./base";
import {
  getEndpoint,
  makeEndpoint,
  param,
  path,
  postEndpoint,
} from "endpoint-ts";
import { App, AppId, UncreatedApp } from "../app/App";

export const appsRoute = pipe(basePath, path("apps"));

export const appRoute = pipe(appsRoute, param("appId", AppId));

export const AppEndpoints = {
  getApp: getEndpoint(appRoute, App),
  createApp: postEndpoint(appsRoute, UncreatedApp, App),
};

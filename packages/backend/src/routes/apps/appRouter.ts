import { Effect, pipe } from "effect";
import * as express from "express";

import * as S from "@effect/schema/Schema";
import {
  effRequestHandler,
  successResponse,
} from "../../express/effRequestHandler";

import {
  AppId,
  createApp,
  deleteApp,
  getApp,
  getApps,
  Registration,
  stringToInteger,
} from "@yaltt/model";
import {
  authedRequest,
  unauthorizedError,
} from "../../auth/authedRequestHandler";
import { bindEndpoint } from "../../express/endpointRequestHandler";
import { parseParams } from "../../express/parseParams";
import {
  createAppForUser,
  deleteAppForId,
  getAppForId,
  getAppsForUser,
} from "../../model/entities/apps";
import { getRegistrationsForAppId } from "../../model/entities/registrations";
import { getIconForApp } from "./appIcon";

export const appRouter = express.Router();

export const appIdIsForUser = (appId: AppId) =>
  pipe(
    Effect.bindTo("user")(authedRequest),
    Effect.bind("app", () => getAppForId(appId)),
    Effect.filterOrFail(
      ({ user, app }) => app.user_id === user.id,
      () => unauthorizedError(`This app doesn't belong to you.`)
    ),
    Effect.map(({ app }) => app)
  );

const bindAppEndpoint = bindEndpoint(appRouter);

bindAppEndpoint(getApps)(() =>
  pipe(authedRequest, Effect.flatMap(getAppsForUser))
);

bindAppEndpoint(getApp)((params) =>
  pipe(
    appIdIsForUser(params.appId),
    Effect.bindTo("app"),
    Effect.bind("registrations", ({ app }) => getRegistrationsForAppId(app.id)),
    Effect.map(({ app, registrations }) => ({
      ...app,
      registrations,
    }))
  )
);

bindAppEndpoint(deleteApp)(({ appId }) =>
  pipe(
    appIdIsForUser(appId),
    Effect.flatMap((app) => deleteAppForId(app.id))
  )
);

bindAppEndpoint(createApp)((_p, _q, body) =>
  pipe(
    authedRequest,
    Effect.flatMap((user) => createAppForUser(body.name, user))
  )
);

export const appIdParam = pipe(
  parseParams(
    S.struct({
      appId: stringToInteger,
    })
  ),
  Effect.map(({ appId }) => appId)
);

appRouter.get(
  "/api/apps/:appId/icon.svg",
  effRequestHandler(
    pipe(
      appIdParam,
      Effect.flatMap(getAppForId),
      Effect.map(getIconForApp),
      Effect.map((icon) =>
        successResponse(icon, { "Content-Type": "image/svg+xml" }, true)
      )
    )
  )
);

import * as express from "express";
import * as passportBase from "passport";
import { pipe, Effect, Option, Either } from "effect";

import * as multer from "multer";
import { parseBody, withRequestBody } from "../../express/parseBody";
import * as S from "@effect/schema/Schema";
import { requireAuth } from "../../auth/auth";
import {
  effRequestHandler,
  successResponse,
} from "../../express/effRequestHandler";

import {
  authedRequest,
  unauthorizedError,
} from "../../auth/authedRequestHandler";
import {
  createAppForUser,
  deleteAppForId,
  getAppForId,
  getAppsForUser,
} from "../../model/entities/apps";
import { parseParams } from "../../express/parseParams";
import { stringToInteger } from "@yaltt/model";
import { getRegistrationsForAppId } from "../../model/entities/registrations";

const upload = multer.default();
export const appRouter = express.Router();

export const appIdIsForUser = pipe(
  Effect.succeed({}),
  Effect.bind("user", () => authedRequest),
  Effect.bind("appId", () => appIdParam),
  Effect.bind("app", ({ appId }) => getAppForId(appId)),
  Effect.filterOrFail(
    ({ user, app }) => app.user_id === user.id,
    () => unauthorizedError(`This app doesn't belong to you.`)
  ),
  Effect.map(({ app }) => app)
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
  "/apps",
  effRequestHandler(
    pipe(
      authedRequest,
      Effect.flatMap(getAppsForUser),
      Effect.map(successResponse)
    )
  )
);

appRouter.get(
  "/apps/:appId",
  effRequestHandler(
    pipe(
      appIdIsForUser,
      Effect.bindTo("app"),
      Effect.bind("registrations", ({ app }) =>
        getRegistrationsForAppId(app.id)
      ),
      Effect.map(({ app, registrations }) => ({
        ...app,
        registrations,
      })),
      Effect.map(successResponse)
    )
  )
);

appRouter.delete(
  "/apps/:appId",
  effRequestHandler(
    pipe(
      appIdIsForUser,
      Effect.flatMap((app) => deleteAppForId(app.id)),
      Effect.map(successResponse)
    )
  )
);

appRouter.post(
  "/apps",
  effRequestHandler(
    pipe(
      Effect.succeed({}),
      Effect.bind("user", () => authedRequest),
      Effect.bind("body", () =>
        parseBody(
          S.struct({
            name: S.string,
          })
        )
      ),
      Effect.flatMap(({ user, body }) => createAppForUser(body.name, user)),
      Effect.mapError((err) => {
        console.log("Got err:", err);
        return err;
      }),
      Effect.map(successResponse)
    )
  )
);

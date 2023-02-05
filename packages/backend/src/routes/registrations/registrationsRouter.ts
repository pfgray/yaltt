import * as express from "express";
import * as passportBase from "passport";
import * as Eff from "@effect/io/Effect";

import * as multer from "multer";
import { parseBody, withRequestBody } from "../../express/parseBody";
import * as S from "@fp-ts/schema";
import { requireAuth } from "../../auth/auth";
import { effRequestHandler } from "../../express/effRequestHandler";
import { pipe } from "@fp-ts/core/Function";
import {
  authedRequest,
  unauthorizedError,
} from "../../auth/authedRequestHandler";
import {
  createRegistrationForAppId,
  getRegistrationsForAppId,
} from "../../model/entities/registrations";
import { parseParams } from "../../express/parseParams";
import { ExpressRequestService } from "../../express/RequestService";
import { getAppForId } from "../../model/entities/apps";
import { PlatformConfiguration, ToolConfiguration } from "lti-model";
import { stringToInteger } from "@yaltt/model";

const upload = multer.default();
export const registrationRouter = express.Router();

const appIdParam = pipe(
  parseParams(
    S.struct({
      appId: stringToInteger,
    })
  ),
  Eff.map(({ appId }) => appId)
);

const appIdIsForUser = pipe(
  Eff.Do(),
  Eff.bind("r", () => Eff.service(ExpressRequestService)),
  Eff.bind("user", () => authedRequest),
  Eff.bind("appId", () => appIdParam),
  Eff.bind("app", ({ appId }) => getAppForId(appId)),
  Eff.filterOrFail(
    ({ user, app }) => app.user_id === user.id,
    () => unauthorizedError(`Current user does not own app.`)
  ),
  Eff.map(({ app }) => app)
);

registrationRouter.get(
  "/apps/:appId/registrations",
  pipe(
    appIdIsForUser,
    Eff.flatMap(({ id }) => getRegistrationsForAppId(id)),
    effRequestHandler
  )
);

registrationRouter.post(
  "/apps/:appId/registrations",
  pipe(
    Eff.Do(),
    Eff.bind("app", () => appIdIsForUser),
    Eff.bind("body", () =>
      parseBody(
        S.struct({
          toolConfiguration: ToolConfiguration,
          platformConfiguration: PlatformConfiguration,
        })
      )
    ),
    Eff.flatMap(({ app, body }) =>
      createRegistrationForAppId(
        app.id,
        body.toolConfiguration,
        body.platformConfiguration
      )
    ),
    effRequestHandler
  )
);

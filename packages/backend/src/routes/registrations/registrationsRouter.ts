import * as express from "express";
import * as passportBase from "passport";
import * as Eff from "@effect/io/Effect";
import * as crypto from "crypto";
import * as multer from "multer";
import { parseBody, withRequestBody } from "../../express/parseBody";
import * as S from "@fp-ts/schema";
import { requireAuth } from "../../auth/auth";
import {
  effRequestHandler,
  successResponse,
} from "../../express/effRequestHandler";
import { pipe } from "@fp-ts/core/Function";
import {
  authedRequest,
  unauthorizedError,
} from "../../auth/authedRequestHandler";
import {
  createRegistrationForAppId,
  getRegistrationForId,
  getRegistrationsForAppId,
} from "../../model/entities/registrations";
import { parseParams } from "../../express/parseParams";
import { ExpressRequestService } from "../../express/RequestService";
import { getAppForId } from "../../model/entities/apps";
import {
  LtiMessage,
  LtiMessageTypes,
  PlatformConfiguration,
  ToolConfiguration,
} from "lti-model";
import { stringToInteger } from "@yaltt/model";
import { appIdParam } from "../apps/appRouter";
import { getKeysWithoutPrivateKeyForRegistrationId } from "../../model/entities/keys";
import {
  mkYalttToolConfiguration,
  mkYalttUrl,
} from "./mkYalttToolConfiguration";
import { getConfig } from "../../config/ConfigService";
import { CanvasPlacement } from "canvas-lti-model";
import { mkYalttCanvasToolConfiguration } from "./mkYalttCanvasToolConfiguration";
import { exportPublickKeyJWK } from "../../crypto/KeyService";
import { fromChunk } from "@effect/io/Config/Secret";

const upload = multer.default();
export const registrationRouter = express.Router();

export const registrationIdParam = pipe(
  parseParams(
    S.struct({
      registrationId: stringToInteger,
    })
  ),
  Eff.map(({ registrationId }) => registrationId)
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
    Eff.map(successResponse),
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
          platformConfiguration: PlatformConfiguration,
        })
      )
    ),
    Eff.flatMap(({ app, body }) =>
      createRegistrationForAppId(app.id, body.platformConfiguration)
    ),
    Eff.map(successResponse),
    effRequestHandler
  )
);

const default_claims = [
  "sub",
  "iss",
  "name",
  "given_name",
  "family_name",
  "nickname",
  "picture",
  "email",
  "locale",
] as const;

registrationRouter.get(
  `/registrations/:registrationId/configuration`,
  pipe(
    Eff.Do(),
    Eff.bind("regId", () => registrationIdParam),
    Eff.bind("config", () => getConfig),
    Eff.bind("reg", ({ regId }) => getRegistrationForId(regId)),
    Eff.bind("app", ({ reg }) => getAppForId(reg.app_id)),
    Eff.bindValue(
      "messages",
      ({ reg, app, config }): ReadonlyArray<LtiMessage> => [
        {
          type: LtiMessageTypes.LtiResourceLinkRequest,
          custom_parameters: {},
          label: `${app.name} (ResourceLinkRequest)`,
          target_link_uri: mkYalttUrl(config)("/resource_link"),
        },
      ]
    ),
    Eff.map(({ reg, app, config, messages }) =>
      mkYalttToolConfiguration(config)(app, reg, default_claims, {}, messages)
    ),
    Eff.map(successResponse),
    effRequestHandler
  )
);

registrationRouter.get(
  `/registrations/:registrationId/canvas_configuration`,
  pipe(
    Eff.Do(),
    Eff.bind("regId", () => registrationIdParam),
    Eff.bind("config", () => getConfig),
    Eff.bind("reg", ({ regId }) => getRegistrationForId(regId)),
    Eff.bind("app", ({ reg }) => getAppForId(reg.app_id)),
    Eff.bindValue(
      "placements",
      ({ reg, app, config }): ReadonlyArray<CanvasPlacement> => [
        {
          placement: "course_navigation",
          message_type: "LtiResourceLinkRequest",
          target_link_uri: mkYalttUrl(config)(
            `/api/registrations/${reg.id}/resource_link`
          ),
        },
      ]
    ),
    Eff.map(({ reg, app, config, placements }) => {
      return successResponse(
        mkYalttCanvasToolConfiguration(config)(app, reg, [], {}, placements)
      );
    }),
    effRequestHandler
  )
);

registrationRouter.get(
  "/registrations/:registrationId/jwks",
  effRequestHandler(
    pipe(
      registrationIdParam,
      Eff.flatMap(getKeysWithoutPrivateKeyForRegistrationId),
      Eff.flatMap((keys) =>
        Eff.forEach(keys, (key) =>
          Eff.map(exportPublickKeyJWK(key.public_key), (jwk) => ({
            ...jwk,
            kid: key.id.toString(),
          }))
        )
      ),
      Eff.map((keys) => ({
        keys: keys.array,
      })),
      Eff.map(successResponse)
    )
  )
);

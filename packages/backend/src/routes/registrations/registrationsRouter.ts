import * as express from "express";
import * as passportBase from "passport";
import { pipe, Effect, Option, Either } from "effect";
import * as crypto from "crypto";
import * as multer from "multer";
import { parseBody, withRequestBody } from "../../express/parseBody";
import * as S from "@effect/schema/Schema";
import { requireAuth } from "../../auth/auth";
import {
  effRequestHandler,
  redirectResponse,
  successResponse,
} from "../../express/effRequestHandler";

import {
  authedRequest,
  unauthorizedError,
} from "../../auth/authedRequestHandler";
import {
  createRegistrationForAppId,
  deleteRegistrationForId,
  getRegistrationForId,
  getRegistrationsForAppId,
} from "../../model/entities/registrations";
import {
  parseBodyOrParams,
  parseParams,
  parseQuery,
} from "../../express/parseParams";
import { ExpressRequestService } from "../../express/RequestService";
import { getAppForId } from "../../model/entities/apps";
import {
  LtiMessage,
  LtiMessageTypes,
  PlatformConfiguration,
  ToolConfiguration,
} from "lti-model";
import { stringToInteger } from "@yaltt/model";
import { appIdIsForUser, appIdParam } from "../apps/appRouter";
import { getKeysWithoutPrivateKeyForRegistrationId } from "../../model/entities/keys";
import {
  mkYalttToolConfiguration,
  mkYalttUrl,
} from "./mkYalttToolConfiguration";
import { getConfig } from "../../config/ConfigService";
import { CanvasPlacement } from "canvas-lti-model";
import { mkYalttCanvasToolConfiguration } from "./mkYalttCanvasToolConfiguration";
import { exportPublickKeyJWK } from "../../crypto/KeyService";
import { Fetch } from "../../fetch/FetchService";
import { tap } from "../../util/tap";

const upload = multer.default();
export const registrationRouter = express.Router();

export const registrationIdParam = pipe(
  parseParams(
    S.struct({
      registrationId: stringToInteger,
    })
  ),
  Effect.map(({ registrationId }) => registrationId)
);

registrationRouter.get(
  "/apps/:appId/registrations",
  pipe(
    appIdIsForUser,
    Effect.flatMap(({ id }) => getRegistrationsForAppId(id)),
    Effect.map(successResponse),
    effRequestHandler
  )
);

registrationRouter.post(
  "/apps/:appId/registrations",
  pipe(
    Effect.succeed({}),
    Effect.bind("app", () => appIdIsForUser),
    Effect.bind("body", () =>
      parseBody(
        S.struct({
          platformConfiguration: PlatformConfiguration,
        })
      )
    ),
    Effect.flatMap(({ app, body }) =>
      createRegistrationForAppId(
        app.id,
        "manual",
        body.platformConfiguration,
        [],
        []
      )
    ),
    Effect.map(successResponse),
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

const loginRedirect = pipe(
  pipe(Effect.succeed(successResponse(null)), effRequestHandler)
);

registrationRouter.get(
  `api/registrations/:registrationId/login`,
  loginRedirect
);

registrationRouter.post(
  `api/registrations/:registrationId/login`,
  loginRedirect
);

registrationRouter.get(
  `/registrations/:registrationId/configuration`,
  pipe(
    Effect.succeed({}),
    Effect.bind("regId", () => registrationIdParam),
    Effect.bind("config", () => getConfig),
    Effect.bind("reg", ({ regId }) => getRegistrationForId(regId)),
    Effect.bind("app", ({ reg }) => getAppForId(reg.app_id)),
    Effect.let(
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
    Effect.map(({ reg, app, config, messages }) =>
      mkYalttToolConfiguration(config)({
        app,
        registration: reg,
        claims: default_claims,
        customParameters: {},
        messages,
        scopes: [],
      })
    ),
    Effect.map(successResponse),
    effRequestHandler
  )
);

registrationRouter.get(
  `/registrations/:registrationId/canvas_configuration`,
  pipe(
    Effect.succeed({}),
    Effect.bind("regId", () => registrationIdParam),
    Effect.bind("config", () => getConfig),
    Effect.bind("reg", ({ regId }) => getRegistrationForId(regId)),
    Effect.bind("app", ({ reg }) => getAppForId(reg.app_id)),
    Effect.let(
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
    Effect.map(({ reg, app, config, placements }) => {
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
      Effect.flatMap(getKeysWithoutPrivateKeyForRegistrationId),
      Effect.flatMap((keys) =>
        Effect.forEach(keys, (key) =>
          Effect.map(exportPublickKeyJWK(key.public_key), (jwk) => ({
            ...jwk,
            kid: key.id.toString(),
          }))
        )
      ),
      Effect.map((keys) => ({
        keys,
      })),
      Effect.map(successResponse)
    )
  )
);

// Dynamic Reg endpoint

registrationRouter.get(
  "/apps/:appId/registrations/new",
  effRequestHandler(
    pipe(
      Effect.Do,
      Effect.bind("appId", () => appIdParam),
      Effect.bind("query", () =>
        parseQuery(
          S.struct({
            openid_configuration: S.string,
            registration_token: S.optional(S.string),
          })
        )
      ),
      Effect.map(({ appId, query }) =>
        redirectResponse(
          `/apps/${appId}/dynamic-registration?openid_configuration=${query.openid_configuration}` +
            (query.registration_token
              ? `&registration_token=${query.registration_token}`
              : "")
        )
      )
    )
  )
);

registrationRouter.post(
  "/apps/:appId/install",
  effRequestHandler(
    pipe(
      authedRequest,
      Effect.bindTo("user"),
      Effect.bind("config", () => getConfig),
      Effect.bind("body", () =>
        parseBody(
          S.struct({
            registrationEndpoint: S.string,
            registrationToken: S.optional(S.string),
            platformConfiguration: PlatformConfiguration,
            messages: S.array(LtiMessage),
            // claims: S.array(S.string),
            scopes: S.array(S.string),
          })
        )
      ),
      Effect.bind("appId", () => appIdParam),
      Effect.bind("app", ({ appId }) => getAppForId(appId)),
      Effect.filterOrFail(
        ({ app, user }) => app.user_id === user.id,
        () => unauthorizedError("This app doesn't belong to you")
      ),
      Effect.map(
        tap((body) => "creating registration: " + JSON.stringify(body, null, 2))
      ),
      Effect.bind("registration", ({ app, body }) =>
        createRegistrationForAppId(
          app.id,
          "dynamic",
          body.platformConfiguration,
          default_claims, // body.claims,
          body.scopes
        )
      ),
      Effect.flatMap(({ body, app, config, registration }) => {
        const url = new URL(body.registrationEndpoint);
        if (body.registrationToken) {
          url.searchParams.append("registration_token", body.registrationToken);
        }
        // TODO: have the frontend send LtiMessages, use the schema
        const toolConfiguration = mkYalttToolConfiguration(config)({
          app,
          registration,
          customParameters: {},
          messages: body.messages.map((m) => ({
            ...m,
            target_link_uri: `http://${
              config.primaryHostname
            }/api/registrations/${registration.id}/launch${
              m.placements ? `?placement=${m.placements.join(",")}` : ""
            }`,
          })),
          scopes: registration.scopes,
          claims: registration.claims,
        });
        return Fetch.post(url.toString(), toolConfiguration);
      }),
      Effect.map(successResponse)
    )
  )
);

registrationRouter.get(
  "/retrieve_openid_configuration",
  effRequestHandler(
    pipe(
      Effect.Do,
      Effect.bind("query", () =>
        parseQuery(
          S.struct({
            url: S.string,
            registration_token: S.optional(S.string),
          })
        )
      ),
      Effect.flatMap(({ query }) => {
        const url = new URL(query.url);
        if (query.registration_token) {
          url.searchParams.append(
            "registration_token",
            query.registration_token
          );
        }

        return Fetch.get(url.toString());
      }),
      Effect.map(successResponse)
    )
  )
);

registrationRouter.delete(
  "/apps/:appId/registrations/:registrationId",
  pipe(
    Effect.succeed({}),
    Effect.bind("app", () => appIdIsForUser),
    Effect.bind("regId", () => registrationIdParam),
    Effect.bind("reg", ({ regId }) => getRegistrationForId(regId)),
    Effect.filterOrFail(
      ({ app, reg }) => reg.app_id === app.id,
      () => unauthorizedError(`Registration is not for app.`)
    ),
    Effect.flatMap(({ reg }) => deleteRegistrationForId(reg.id)),
    Effect.map(() => successResponse({})),
    effRequestHandler
  )
);

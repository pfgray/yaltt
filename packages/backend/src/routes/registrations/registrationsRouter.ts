import * as S from "@effect/schema/Schema";
import { Effect, pipe } from "effect";
import * as express from "express";
import * as multer from "multer";
import {
  effRequestHandler,
  redirectResponse,
  successResponse,
} from "../../express/effRequestHandler";
import { parseBody } from "../../express/parseBody";

import { stringToInteger } from "@yaltt/model";
import { CanvasPlacement } from "canvas-lti-model";
import {
  ContentItem,
  DeploymentIdClaimKey,
  LtiMessage,
  LtiMessageTypes,
  LtiVersionClaimKey,
  PlatformConfiguration,
  ToolConfiguration,
} from "lti-model";
import {
  authedRequest,
  unauthorizedError,
} from "../../auth/authedRequestHandler";
import { getConfig } from "../../config/ConfigService";
import { exportPublickKeyJWK } from "../../crypto/KeyService";
import {
  parseBodyOrParams,
  parseParams,
  parseQuery,
} from "../../express/parseParams";
import { Fetch } from "../../fetch/FetchService";
import { getAppForId } from "../../model/entities/apps";
import { getKeysWithoutPrivateKeyForRegistrationId } from "../../model/entities/keys";
import {
  createRegistrationForAppId,
  deleteRegistrationForId,
  getRegistrationForId,
  getRegistrationsForAppId,
  setRegistrationClientId,
} from "../../model/entities/registrations";
import { schemaParse } from "../../schemaParse";
import { fetchToken } from "../../tokens/tokens";
import { tap } from "../../util/tap";
import { appIdIsForUser, appIdParam } from "../apps/appRouter";
import { signJwtPayloadForRegistration } from "./jwtSign";
import { mkYalttCanvasToolConfiguration } from "./mkYalttCanvasToolConfiguration";
import {
  mkYalttToolConfiguration,
  mkYalttUrl,
} from "./mkYalttToolConfiguration";
import { MessageTypeClaimKey, ContentItemsClaimKey } from "lti-model";

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

const CreatedToolConfiguration = ToolConfiguration.pipe(
  S.extend(S.struct({ client_id: S.string }))
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
      Effect.bind("installRequest", ({ body, app, config, registration }) => {
        const url = new URL(body.registrationEndpoint);
        // todo: this shouldn't be here, remove it once Canvas supports it in the header
        if (body.registrationToken) {
          url.searchParams.append("registration_token", body.registrationToken);
        }
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
        console.log("##Sending tool configuration:");
        console.log(JSON.stringify(toolConfiguration, null, 2));
        return Fetch.post(
          url.toString(),
          toolConfiguration,
          body.registrationToken
            ? {
                headers: {
                  Authorization: `Bearer ${body.registrationToken}`,
                },
              }
            : {}
        );
      }),
      Effect.bind("install", ({ installRequest }) =>
        schemaParse(CreatedToolConfiguration)(installRequest)
      ),
      Effect.flatMap(({ registration, install }) =>
        setRegistrationClientId(
          registration.id,
          install.client_id,
          install["https://purl.imsglobal.org/spec/lti-tool-configuration"][
            "https://canvas.instructure.com/lti/registration_config_url"
          ]
        )
      ),
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

        return Fetch.get(
          url.toString(),
          query.registration_token
            ? {
                headers: {
                  Authorization: `Bearer ${query.registration_token}`,
                },
              }
            : {}
        );
      }),
      Effect.map(successResponse)
    )
  )
);

/**
 * Retrieves apps and registrations in a path parameter,
 * Ensuring that the app is for the current authed user,
 * and the registration is for the app.
 */
export const registrationAndAppParams = pipe(
  Effect.succeed({}),
  Effect.bind("app", () => appIdIsForUser),
  Effect.bind("regId", () => registrationIdParam),
  Effect.bind("registration", ({ regId }) => getRegistrationForId(regId)),
  Effect.filterOrFail(
    ({ app, registration }) => registration.app_id === app.id,
    () => unauthorizedError(`Registration is not for app.`)
  )
);

registrationRouter.delete(
  "/apps/:appId/registrations/:registrationId",
  pipe(
    registrationAndAppParams,
    Effect.flatMap(({ registration }) =>
      deleteRegistrationForId(registration.id)
    ),
    Effect.map(() => successResponse({})),
    effRequestHandler
  )
);

registrationRouter.get(
  "/apps/:appId/registrations/:registrationId/token",
  pipe(
    registrationAndAppParams,
    Effect.flatMap(({ registration }) => fetchToken(registration)),
    Effect.mapError((e) => e),
    Effect.map(successResponse),
    effRequestHandler
  )
);

registrationRouter.post(
  "/apps/:appId/registrations/:registrationId/signDeepLinkingContentItems",
  pipe(
    registrationAndAppParams,
    Effect.bind("body", () =>
      parseBody(
        S.struct({
          contentItems: S.array(ContentItem),
          deploymentId: S.string,
        })
      )
    ),
    Effect.bind("signedJwt", ({ registration, body }) => {
      console.log("Signing payload:", body);
      return signJwtPayloadForRegistration(registration)({
        [DeploymentIdClaimKey]: body.deploymentId,
        [MessageTypeClaimKey]: "LtiDeepLinkingResponse",
        [LtiVersionClaimKey]: "1.3.0",
        [ContentItemsClaimKey]: body.contentItems,
      });
    }),
    Effect.tap((payload) =>
      Effect.sync(() => console.log("Signed payload: ", payload))
    ),
    Effect.map(successResponse),
    effRequestHandler
  )
);

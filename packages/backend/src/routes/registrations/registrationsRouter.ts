import * as S from "@effect/schema/Schema";
import { Effect, Option, pipe } from "effect";
import * as express from "express";

import {
  AppId,
  RegistrationId,
  createNewAppInstallation,
  createRegistration,
  createToolInstallation,
  getApiTokenForRegistration,
  getCanvasConfiguration,
  getConfiguration,
  getOpenidConfig,
  getPublicJwkSet,
  getRegistration,
  getRegistrationFromPlatform,
  getRegistrations,
  getSavedConfigurationForRegistration,
  sendRegistrationUpdate,
  signDeepLinkingContentItems,
  signUpdateRequest,
} from "@yaltt/model";
import { CanvasPlacement } from "canvas-lti-model";
import {
  ContentItemsClaimKey,
  CreatedToolConfiguration,
  DeploymentIdClaimKey,
  LtiMessage,
  LtiMessageTypes,
  LtiScope,
  LtiVersionClaimKey,
  MessageTypeClaimKey,
  ToolConfiguration,
} from "lti-model";
import {
  authedRequest,
  unauthorizedError,
} from "../../auth/authedRequestHandler";
import { getConfig } from "../../config/ConfigService";
import { exportPublicKeyJWK } from "../../crypto/KeyService";
import { ExpressRequestService } from "../../express/RequestService";
import { bindEndpoint } from "../../express/endpointRequestHandler";
import { Fetch } from "../../fetch/FetchService";
import { getKeysWithoutPrivateKeyForRegistrationId } from "../../model/entities/keys";
import {
  createRegistrationForAppId,
  deleteRegistrationForId,
  getRegistrationForId,
  getRegistrationsForAppId,
  getSavedConfigurationForRegistrationId,
  setRegistrationClientIdAndClientUri,
  setRegistrationSavedConfiguration,
} from "../../model/entities/registrations";
import { schemaParse } from "../../schemaParse";
import { fetchToken } from "../../tokens/tokens";
import { appIdIsForUser } from "../apps/appRouter";
import { signJwtPayloadForRegistration } from "../../tokens/jwtSign";
import { mkYalttCanvasToolConfiguration } from "./mkYalttCanvasToolConfiguration";
import {
  mkYalttToolConfiguration,
  mkYalttUrl,
} from "./mkYalttToolConfiguration";

import { deleteRegistration } from "@yaltt/model";
import {
  createAppAndRegistrationForUser,
  getAppForId,
} from "../../model/entities/apps";
import { dataIntegrityError } from "../../db/db";

export const registrationRouter = express.Router();
const bindRegistrationEndpoint = bindEndpoint(registrationRouter);

/**
 * Retrieves apps and registrations in a path parameter,
 * Ensuring that the app is for the current authed user,
 * and the registration is for the app.
 */
export const registrationAndApp = (
  appId: AppId,
  registrationId: RegistrationId
) =>
  pipe(
    Effect.succeed({}),
    Effect.bind("app", () => appIdIsForUser(appId)),
    Effect.bind("registration", ({}) => getRegistrationForId(registrationId)),
    Effect.filterOrFail(
      ({ app, registration }) => registration.app_id === app.id,
      () => unauthorizedError(`Registration is not for app.`)
    )
  );

// export const registrationIdParam = pipe(
//   parseParams(
//     S.struct({
//       registrationId: stringToInteger,
//     })
//   ),
//   Effect.map(({ registrationId }) => registrationId)
// );

bindRegistrationEndpoint(getRegistrations)(({ appId }) =>
  pipe(
    appIdIsForUser(appId),
    Effect.flatMap(() => getRegistrationsForAppId(appId))
  )
);

bindRegistrationEndpoint(getRegistration)(({ registrationId }) =>
  pipe(
    getRegistrationForId(registrationId),
    Effect.filterOrFail(
      (registration) => !!registration,
      () => unauthorizedError(`Registration not found.`)
    )
  )
);

bindRegistrationEndpoint(createRegistration)(({ appId }, _, body) =>
  pipe(
    appIdIsForUser(appId),
    Effect.flatMap((app) =>
      createRegistrationForAppId(
        app.id,
        "manual",
        body.platformConfiguration,
        [],
        []
      )
    )
  )
);

// Yaltt's requested claims
const default_claims = [
  "sub",
  "iss",
  "name",
  "given_name",
  "family_name",
  "nickname",
  "picture",
  "email",
  "https://purl.imsglobal.org/spec/lti/claim/lis",
  "locale",
] as const;

bindRegistrationEndpoint(getConfiguration)(({ registrationId }) =>
  pipe(
    ExpressRequestService,
    Effect.bindTo("request"),
    Effect.bind("config", () => getConfig),
    Effect.bind("reg", () => getRegistrationForId(registrationId)),
    Effect.bind("app", ({ reg }) => appIdIsForUser(reg.app_id)),
    Effect.let(
      "messages",
      ({ reg, app, config, request }): ReadonlyArray<LtiMessage> => [
        {
          type: LtiMessageTypes.LtiResourceLinkRequest,
          custom_parameters: {},
          label: `${app.name} (ResourceLinkRequest)`,
          target_link_uri: mkYalttUrl(
            config,
            request.request
          )("/resource_link"),
        },
      ]
    ),
    Effect.map(({ reg, app, config, messages, request }) =>
      mkYalttToolConfiguration(
        config,
        request.request
      )({
        app,
        registration: reg,
        claims: default_claims,
        customParameters: {},
        messages,
        scopes: [],
        toolId: "",
      })
    )
  )
);

bindRegistrationEndpoint(getCanvasConfiguration)(({ registrationId }) =>
  pipe(
    ExpressRequestService,
    Effect.bindTo("request"),
    Effect.bind("config", () => getConfig),
    Effect.bind("reg", () => getRegistrationForId(registrationId)),
    Effect.bind("app", ({ reg }) => getAppForId(reg.app_id)),
    Effect.let(
      "placements",
      ({ reg, app, config, request }): ReadonlyArray<CanvasPlacement> => {
        const mkUrl = mkYalttUrl(config, request.request);
        const mkAppUrl = (rest: string) => mkUrl(`/api/apps/${app.id}${rest}`);
        return [
          {
            placement: "course_navigation",
            message_type: "LtiResourceLinkRequest",
            target_link_uri: mkYalttUrl(
              config,
              request.request
            )(`/api/registrations/${reg.id}/launch`),
          },
          {
            placement: "editor_button",
            message_type: "LtiDeepLinkingRequest",
            icon_uri: mkAppUrl("/icon.svg"),
            target_link_uri: mkYalttUrl(
              config,
              request.request
            )(`/api/registrations/${reg.id}/launch`),
          },
        ];
      }
    ),
    Effect.map(({ reg, app, config, placements, request }) =>
      mkYalttCanvasToolConfiguration(config, request.request)(
        app,
        reg,
        [],
        {},
        placements
      )
    )
  )
);

bindRegistrationEndpoint(getPublicJwkSet)(({ registrationId }) =>
  pipe(
    getKeysWithoutPrivateKeyForRegistrationId(registrationId),
    Effect.flatMap((keys) =>
      Effect.forEach(keys, (key) =>
        Effect.map(exportPublicKeyJWK(key.public_key), (jwk) => ({
          ...jwk,
          kid: key.id.toString(),
        }))
      )
    ),
    Effect.map((keys) => ({
      keys,
    }))
  )
);

bindRegistrationEndpoint(createToolInstallation)(({ appId }, _, body) =>
  pipe(
    appIdIsForUser(appId),
    Effect.bindTo("app"),
    Effect.bind("request", () => ExpressRequestService),
    Effect.bind("config", () => getConfig),
    Effect.bind("registration", ({ app }) =>
      createRegistrationForAppId(
        app.id,
        "dynamic",
        body.platformConfiguration,
        default_claims, // body.claims,
        body.scopes
      )
    ),
    Effect.bind("installRequest", ({ app, config, registration, request }) => {
      const url = new URL(body.registrationEndpoint);
      // todo: this shouldn't be here, remove it once Canvas supports it in the header
      if (body.registrationToken) {
        url.searchParams.append("registration_token", body.registrationToken);
      }
      const toolConfiguration = mkYalttToolConfiguration(
        config,
        request.request
      )({
        app,
        registration,
        customParameters: body.customParameters,
        messages: body.messages.map((m) => ({
          ...m,
          target_link_uri: mkYalttUrl(
            config,
            request.request
          )(
            `/api/registrations/${registration.id}/launch${
              m.placements ? `?placement=${m.placements.join(",")}` : ""
            }`
          ),
        })),
        scopes: registration.scopes,
        claims: registration.claims,
        toolId: body.toolId,
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
    Effect.mapError((a) => a),
    Effect.tap(({ registration, install }) =>
      setRegistrationSavedConfiguration(registration.id, install)
    ),
    Effect.flatMap(({ registration, install }) =>
      setRegistrationClientIdAndClientUri({
        registrationId: registration.id,
        client_id: install.client_id,
        registration_config_url:
          install["https://purl.imsglobal.org/spec/lti-tool-configuration"][
            "https://canvas.instructure.com/lti/registration_config_url"
          ],
        registration_client_uri: install.registration_client_uri,
      })
    )
  )
);

bindRegistrationEndpoint(createNewAppInstallation)((_, __, body) =>
  pipe(
    Effect.bindTo("user")(authedRequest),
    Effect.bind("request", () => ExpressRequestService),
    Effect.bind("config", () => getConfig),
    Effect.bind("registration", ({ user }) =>
      createAppAndRegistrationForUser(
        "client_name" in body && typeof body.client_name === "string"
          ? body.client_name
          : "Test App",
        user,
        body.platformConfiguration,
        default_claims, // body.claims,
        []
      )
    ),
    Effect.mapError((a) => a),
    Effect.bind("installRequest", ({ config, registration, request }) => {
      const url = new URL(body.registrationEndpoint);
      // todo: this shouldn't be here, remove it once Canvas supports it in the header
      if (body.registrationToken) {
        url.searchParams.append("registration_token", body.registrationToken);
      }
      const toolConfiguration = body.toolConfiguration;
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
    Effect.mapError((a) => a),
    Effect.bind("install", ({ installRequest }) =>
      schemaParse(CreatedToolConfiguration)(installRequest)
    ),
    Effect.mapError((a) => a),
    Effect.flatMap(({ registration, install }) =>
      setRegistrationClientIdAndClientUri({
        registrationId: registration.registration.id,
        client_id: install.client_id,
        registration_config_url:
          install["https://purl.imsglobal.org/spec/lti-tool-configuration"][
            "https://canvas.instructure.com/lti/registration_config_url"
          ],
        registration_client_uri: install.registration_client_uri,
      })
    )
  )
);

bindRegistrationEndpoint(getOpenidConfig)((_params, query) =>
  pipe(
    Effect.Do,
    Effect.flatMap(() => {
      const url = new URL(query.url);

      const reg_token = Option.getOrUndefined(query.registration_token);

      // todo: remove this because it's not in the spec
      if (typeof reg_token !== "undefined") {
        url.searchParams.append("registration_token", reg_token);
      }

      return Fetch.get(
        url.toString(),
        reg_token
          ? {
              headers: {
                Authorization: `Bearer ${reg_token}`,
              },
            }
          : {}
      );
    })
  )
);

bindRegistrationEndpoint(deleteRegistration)(({ registrationId, appId }) =>
  pipe(
    registrationAndApp(appId, registrationId),
    Effect.flatMap(() => deleteRegistrationForId(registrationId))
  )
);

bindRegistrationEndpoint(getApiTokenForRegistration)(
  ({ appId, registrationId }, { scope }) => {
    return pipe(
      registrationAndApp(appId, registrationId),
      Effect.flatMap(({ registration }) => {
        const scopes = pipe(
          scope,
          Option.map((s) => s.split(",")),
          Option.getOrElse(() => registration.scopes)
        );
        return fetchToken(registration, scopes);
      })
    );
  }
);

bindRegistrationEndpoint(signDeepLinkingContentItems)(
  ({ appId, registrationId }, _, body) =>
    pipe(
      registrationAndApp(appId, registrationId),
      Effect.flatMap(({ registration }) =>
        signJwtPayloadForRegistration(registration)({
          [DeploymentIdClaimKey]: body.deploymentId,
          [MessageTypeClaimKey]: "LtiDeepLinkingResponse",
          [LtiVersionClaimKey]: "1.3.0",
          [ContentItemsClaimKey]: body.contentItems,
        })
      ),
      Effect.map((signedJwt) => ({ signedJwt }))
    )
);

bindRegistrationEndpoint(getSavedConfigurationForRegistration)(
  ({ appId, registrationId }) =>
    pipe(
      registrationAndApp(appId, registrationId),
      Effect.flatMap(() =>
        getSavedConfigurationForRegistrationId(registrationId)
      )
    )
);

bindRegistrationEndpoint(signUpdateRequest)(
  ({ appId, registrationId }, _, body) =>
    pipe(
      registrationAndApp(appId, registrationId),
      Effect.flatMap(({ registration }) =>
        signJwtPayloadForRegistration(registration)(body.payload as any)
      ),
      Effect.map((signedRequest) => ({ signedRequest }))
    )
);

bindRegistrationEndpoint(getRegistrationFromPlatform)(
  ({ appId, registrationId }, _) =>
    pipe(
      registrationAndApp(appId, registrationId),
      Effect.bind("client_uri", ({ registration }) =>
        pipe(
          registration.registration_client_uri,
          Option.map(Effect.succeed),
          Option.getOrElse(() =>
            Effect.fail(
              dataIntegrityError("No registration_client_uri for registration")
            )
          )
        )
      ),
      Effect.bind("token", ({ registration }) =>
        fetchToken(registration, [LtiScope.RegistrationReadOnly])
      ),
      Effect.bind("rawToolConfiguration", ({ client_uri, token }) =>
        Fetch.get(client_uri, {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        })
      ),
      Effect.bind("toolConfiguration", ({ rawToolConfiguration }) =>
        schemaParse(CreatedToolConfiguration)(rawToolConfiguration)
      )
    )
);

bindRegistrationEndpoint(sendRegistrationUpdate)(
  ({ appId, registrationId }, _, body) =>
    pipe(
      registrationAndApp(appId, registrationId),
      Effect.bind("request", () => ExpressRequestService),
      Effect.bind("config", () => getConfig),
      Effect.bind("client_uri", ({ registration }) =>
        pipe(
          registration.registration_client_uri,
          Option.map(Effect.succeed),
          Option.getOrElse(() =>
            Effect.fail(
              dataIntegrityError("No registration_client_uri for registration")
            )
          )
        )
      ),

      Effect.bind("token", ({ registration }) =>
        fetchToken(registration, [LtiScope.Registration])
      ),
      Effect.bind(
        "updateRequest",
        ({ client_uri, token, request, config, app, registration }) => {
          const toolConfiguration = mkYalttToolConfiguration(
            config,
            request.request
          )({
            app,
            registration,
            customParameters: body.customParameters,
            messages: body.messages.map((m) => ({
              ...m,
              target_link_uri: mkYalttUrl(
                config,
                request.request
              )(
                `/api/registrations/${registration.id}/launch${
                  m.placements ? `?placement=${m.placements.join(",")}` : ""
                }`
              ),
            })),
            scopes: body.scopes,
            claims: registration.claims,
            toolId: body.toolId,
          });
          console.log("##Sending tool configuration update:");
          console.log(JSON.stringify(toolConfiguration, null, 2));

          return Fetch.put(client_uri, toolConfiguration, {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
            },
          });
        }
      ),
      Effect.map((a) => ({}))
    )
);

import { pipe } from "effect";
import { appsRoute } from "./apps";
import { Body, Endpoint, QP, Response, param, path } from "endpoint-ts";
import { basePath } from "./base";
import * as S from "@effect/schema/Schema";
import { Registration, RegistrationId } from "../registration/Registration";
import {
  ContentItem,
  LtiMessage,
  LtiToken,
  PlatformConfiguration,
  PublicJwkSet,
  ToolConfiguration,
  CreatedToolConfiguration,
} from "lti-model";
import {
  CanvasPrivacyLevel,
  CanvasPrivacyLevels,
  CanvasToolConfiguration,
} from "canvas-lti-model";
import { App, AppId } from "../app/App";

export const appRegistrationsRoute = pipe(
  appsRoute,
  param("appId", S.compose(S.NumberFromString, AppId)),
  path("registrations")
);

export const appRegistrationsRegistrationRoute = pipe(
  appRegistrationsRoute,
  param("registrationId", S.compose(S.NumberFromString, RegistrationId))
);

export const registrationRoute = pipe(
  basePath,
  path("registrations"),
  param("registrationId", S.compose(S.NumberFromString, RegistrationId))
);

export const getRegistrations = Endpoint.get(
  appRegistrationsRoute,
  {},
  Response.json(S.array(Registration))
);

export const getRegistration = Endpoint.get(
  registrationRoute,
  {},
  Response.json(Registration)
);

export const createRegistration = Endpoint.post(
  appRegistrationsRoute,
  {},
  Response.json(Registration),
  Body.json(
    S.struct({
      platformConfiguration: PlatformConfiguration,
    })
  )
);
export const getConfiguration = Endpoint.get(
  pipe(registrationRoute, path("configuration")),
  {},
  Response.json(ToolConfiguration)
);
export const getCanvasConfiguration = Endpoint.get(
  pipe(registrationRoute, path("canvas_configuration")),
  {},
  Response.json(CanvasToolConfiguration)
);
export const getPublicJwkSet = Endpoint.get(
  pipe(registrationRoute, path("jwks")),
  {},
  Response.json(PublicJwkSet)
);

export const createToolInstallation = Endpoint.post(
  pipe(
    appsRoute,
    param("appId", S.compose(S.NumberFromString, AppId)),
    path("install")
  ),
  {},
  Response.json(S.unknown),
  Body.json(
    S.struct({
      registrationEndpoint: S.string,
      registrationToken: S.optional(S.string),
      platformConfiguration: PlatformConfiguration,
      messages: S.array(LtiMessage),
      scopes: S.array(S.string),
      customParameters: S.record(S.string, S.string),
      toolId: S.optional(S.string),
      disableReinstall: S.optional(S.boolean),
    })
  )
);

export const createNewAppInstallation = Endpoint.post(
  pipe(appsRoute, path("install")),
  {},
  Response.json(S.unknown),
  Body.json(
    S.struct({
      registrationEndpoint: S.string,
      registrationToken: S.optional(S.string),
      platformConfiguration: PlatformConfiguration,
      toolConfiguration: S.unknown,
    })
  )
);

export const getOpenidConfig = Endpoint.get(
  pipe(basePath, path("retrieve_openid_configuration")),
  {
    url: QP.single(S.string),
    registration_token: QP.optional(S.string),
  },
  Response.json(S.unknown)
);

export const deleteRegistration = Endpoint.delete(
  pipe(
    appRegistrationsRoute,
    param("registrationId", S.compose(S.NumberFromString, RegistrationId))
  ),
  {},
  Response.json(S.unknown),
  Body.empty
);

export const getApiTokenForRegistration = Endpoint.get(
  pipe(
    appRegistrationsRoute,
    param("registrationId", S.compose(S.NumberFromString, RegistrationId)),
    path("token")
  ),
  {
    scope: QP.optional(S.string),
  },
  Response.json(LtiToken)
);

export const signDeepLinkingContentItems = Endpoint.post(
  pipe(appRegistrationsRegistrationRoute, path("signDeepLinkingContentItems")),
  {},
  Response.json(S.struct({ signedJwt: S.string })),
  Body.json(
    S.struct({ contentItems: S.array(ContentItem), deploymentId: S.string })
  )
);

export const getSavedConfigurationForRegistration = Endpoint.get(
  pipe(appRegistrationsRegistrationRoute, path("saved-configuration")),
  {},
  Response.json(CreatedToolConfiguration)
);

export const signUpdateRequest = Endpoint.post(
  pipe(appRegistrationsRegistrationRoute, path("sign-update-request")),
  {},
  Response.json(S.struct({ signedRequest: S.string })),
  Body.json(
    S.struct({
      payload: S.unknown,
      token: S.string,
    })
  )
);

export const getRegistrationFromPlatform = Endpoint.get(
  pipe(appRegistrationsRegistrationRoute, path("from-platform")),
  {},
  Response.json(
    S.struct({
      rawToolConfiguration: S.unknown,
      toolConfiguration: CreatedToolConfiguration,
      app: App,
      registration: Registration,
    })
  )
);

export const sendRegistrationUpdate = Endpoint.post(
  pipe(appRegistrationsRegistrationRoute, path("update")),
  {},
  Response.json(S.unknown),
  Body.json(
    S.struct({
      messages: S.array(LtiMessage),
      scopes: S.array(S.string),
      customParameters: S.record(S.string, S.string),
      privacyLevel: CanvasPrivacyLevel,
      toolId: S.optional(S.string),
      disableReinstall: S.optional(S.boolean),
    })
  )
);

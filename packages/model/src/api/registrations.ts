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
} from "lti-model";
import { CanvasToolConfiguration } from "canvas-lti-model";
import { AppId } from "../app/App";

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
    scope: QP.single(S.string),
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

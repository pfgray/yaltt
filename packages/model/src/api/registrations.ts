import { pipe } from "effect";
import { appsRoute } from "./apps";
import { Body, Endpoint, Response, param, path } from "endpoint-ts";
import { basePath } from "./base";
import * as S from "@effect/schema/Schema";
import { Registration, RegistrationId } from "../registration/Registration";
import { LtiMessage, PlatformConfiguration, PublicJwkSet, ToolConfiguration } from "lti-model";
import {CanvasToolConfiguration} from 'canvas-lti-model'


const registrationsRoute = pipe(appsRoute, path("registrations"));
const registrationRoute = pipe(basePath, path("registrations"), param("registrationId", S.compose(S.NumberFromString, RegistrationId)));

export const getRegistrations = Endpoint.get(registrationsRoute, {}, Response.json(S.array(Registration)));
export const createRegistration = Endpoint.post(registrationsRoute, {}, Response.json(S.array(Registration)), Body.json(Registration));
export const getConfiguration = Endpoint.get(pipe(registrationRoute, path('configuration')), {}, Response.json(ToolConfiguration));
export const getCanvasConfiguration = Endpoint.get(pipe(registrationRoute, path('canvas_configuration')), {}, Response.json(CanvasToolConfiguration));
export const getPublicJwk = Endpoint.get(pipe(registrationRoute, path('jwks')), {}, Response.json(PublicJwkSet));
export const createToolInstallation = Endpoint.post(pipe(appsRoute, param("appId", S.compose(S.NumberFromString, S.number))), {}, Response.json(S.unknown), Body.json(
  S.struct({
    registrationEndpoint: S.string,
    registrationToken: S.optional(S.string),
    platformConfiguration: PlatformConfiguration,
    messages: S.array(LtiMessage),
    scopes: S.array(S.string),
  })
));

export const fetchOpenidConfig = Endpoint.get(pipe(basePath, path('retrieve_openid_configuration')), {
  url: S.string,
  registration_token: S.optionFromNullable(S.string),
}, Response.json(S.unknown));

<<< >>>> get : "/apps/:appId/registrations"
<<< >>>> post : "/apps/:appId/registrations"
<<< >>>> get : "/registrations/:registrationId/configuration"
<<< >>>> get : "/registrations/:registrationId/canvas_configuration"
<<< >>>> get : "/registrations/:registrationId/jwks"

<<< >>>> get : "/apps/:appId/registrations/new"
<<< >>>> post : "/apps/:appId/install"

>>>> get : "/retrieve_openid_configuration"
>>>> delete : "/apps/:appId/registrations/:registrationId"
>>>> get : "/apps/:appId/registrations/:registrationId/token"
>>>> post : "/apps/:appId/registrations/:registrationId/signDeepLinkingContentItems"
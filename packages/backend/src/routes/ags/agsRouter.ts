import * as S from "@effect/schema/Schema";
import { Effect, Option, pipe } from "effect";
import * as express from "express";

import {
  AppId,
  RegistrationId,
  createRegistration,
  createScoreForUser,
  createToolInstallation,
  getApiTokenForRegistration,
  getCanvasConfiguration,
  getConfiguration,
  getOpenidConfig,
  getPublicJwkSet,
  getRegistrations,
  signDeepLinkingContentItems,
} from "@yaltt/model";
import { CanvasPlacement } from "canvas-lti-model";
import {
  ContentItemsClaimKey,
  DeploymentIdClaimKey,
  LtiMessage,
  LtiMessageTypes,
  LtiScope,
  LtiVersionClaimKey,
  MessageTypeClaimKey,
  PublicJwk,
  ToolConfiguration,
} from "lti-model";
import { unauthorizedError } from "../../auth/authedRequestHandler";
import { getConfig } from "../../config/ConfigService";
import { exportPublicKeyJWK } from "../../crypto/KeyService";
import { ExpressRequestService } from "../../express/RequestService";
import { bindEndpoint } from "../../express/endpointRequestHandler";
import { Fetch, FetchService } from "../../fetch/FetchService";
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
import { appIdIsForUser } from "../apps/appRouter";
import { signJwtPayloadForRegistration } from "../../tokens/jwtSign";

import { deleteRegistration } from "@yaltt/model";
import { getRouteString } from "endpoint-ts";
import { registrationAndApp } from "../registrations/registrationsRouter";
import { provideHttpFetchService } from "../../fetch/HttpFetchService";

export const agsRouter = express.Router();
const bindAgsEndpoint = bindEndpoint(agsRouter);

bindAgsEndpoint(createScoreForUser)(({ appId, registrationId }, query, score) =>
  pipe(
    registrationAndApp(appId, registrationId),
    Effect.flatMap(({ registration }) =>
      fetchToken(registration, [LtiScope.AgsLineItem])
    ),
    Effect.flatMap((token) => {
      // todo: I think score needs to be encoded?
      console.log(`Sending`, score, `to`, query.lineItemUrl);
      return Fetch.post(query.lineItemUrl, score, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    })
  )
);

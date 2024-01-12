import * as crypto from "crypto";
import { Effect, Option, ReadonlyArray, pipe } from "effect";
import * as express from "express";
import * as AST from "@effect/schema/AST";
import * as PR from "@effect/schema/ParseResult";
import * as S from "@effect/schema/Schema";
import * as multer from "multer";
import {
  effRequestHandler,
  redirectResponse,
  schemaResponse,
  successResponse,
} from "../../express/effRequestHandler";

import { parseJwt, stringToInteger } from "@yaltt/model";
import {
  parseBodyOrParams,
  parseParams,
  parseParamsError,
  parseQuery,
} from "../../express/parseParams";
import {
  RegistrationRow,
  getRegistrationForId,
} from "../../model/entities/registrations";
import {
  ContextClaim,
  CustomClaim,
  UserIdentityClaim,
  DeploymentIdClaim,
  LaunchPresentationClaim,
  LisClaim,
  LtiVersionClaim,
  MessageTypeClaim,
  PlatformInstanceClaim,
  ResourceLinkClaim,
  RolesClaim,
  RoleScopeMentorClaim,
  TargetLinkUriClaim,
} from "lti-model";
import { createPersonForRegistrationId } from "../../model/entities/people";
import { createContextForRegistrationId } from "../../model/entities/contexts";
import { createEnrollment } from "../../model/entities/enrollments";
import {
  LaunchRow,
  createLaunchForRegistrationId,
  getLaunchForId,
} from "../../model/entities/launches";
import { getKeyForRegistrationId } from "../../model/entities/keys";
import { signJwt } from "../../crypto/KeyService";

export const deepLinkingRouter = express.Router();

// LtiDeepLinkingResponse;

deepLinkingRouter.post("/deepLinkingResponse", () => {});

const signJwtPayloadForRegistration =
  (registration: RegistrationRow) => (payload: {}) =>
    pipe(
      getKeyForRegistrationId(registration.id),
      Effect.bindTo("key"),
      Effect.bind("token", ({ key }) =>
        signJwt(payload, key.private_key, {
          expiresIn: "1h",
          audience: registration.platform_configuration.token_endpoint,
          issuer: registration.client_id || "",
          subject: registration.client_id || "",
          keyid: key.id.toString(),
          jwtid: crypto.randomBytes(16).toString("hex"),
        })
      )
    );

const signDeepLinkingResponse = (registration: RegistrationRow) =>
  pipe({}, signJwtPayloadForRegistration(registration));

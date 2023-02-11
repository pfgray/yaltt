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
  getRegistrationForId,
  getRegistrationsForAppId,
} from "../../model/entities/registrations";
import { parseParams } from "../../express/parseParams";
import { ExpressRequestService } from "../../express/RequestService";
import { getAppForId } from "../../model/entities/apps";
import { PlatformConfiguration, ToolConfiguration } from "lti-model";
import { stringToInteger } from "@yaltt/model";
import { appIdParam } from "../apps/appRouter";
import { getKeysWithoutPrivateKeyForRegistrationId } from "../../model/entities/keys";

const upload = multer.default();
export const launchRouter = express.Router();

const loginParameters = parseParams(
  S.struct({
    registrationId: stringToInteger,
    iss: S.string,
    login_hint: S.string,
    target_link_uri: S.string,
    lti_message_hint: S.optional(S.string),
    lti_deployment_id: S.optional(S.string),
    client_id: S.optional(S.string),
  })
);

const handleLoginRequest = effRequestHandler(
  pipe(
    Eff.Do(),
    Eff.bind("params", () => loginParameters),
    Eff.bind("registration", ({ params }) =>
      getRegistrationForId(params.registrationId)
    )
    //Eff.bind('hmm', ({registration}) => registration.)
  )
);

launchRouter.get("/registrations/:registrationId/login", handleLoginRequest);

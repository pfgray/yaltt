import * as crypto from "crypto";
import { Effect, Option, ReadonlyArray, pipe } from "effect";
import * as express from "express";

import * as S from "@effect/schema/Schema";
import * as multer from "multer";
import {
  effRequestHandler,
  redirectResponse,
  successResponse,
} from "../../express/effRequestHandler";

import { JsonWebToken, stringToInteger } from "@yaltt/model";
import { parseBodyError } from "../../express/parseBody";
import { parseBodyOrParams, parseParams } from "../../express/parseParams";
import { getRegistrationForId } from "../../model/entities/registrations";

const upload = multer.default();
export const launchRouter = express.Router();

const loginUrlParams = parseParams(
  S.struct({
    registrationId: stringToInteger,
  })
);

const loginParameters = parseBodyOrParams(
  S.struct({
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
    loginUrlParams,
    Effect.bind("params", () => loginParameters),
    Effect.bind("registration", ({ registrationId }) =>
      getRegistrationForId(registrationId)
    ),
    Effect.map(({ params, registration }) => {
      // set cookie, then redirect to authorization endpoint?
      // redirect to authorization endpoint

      const redirectParams = pipe(
        params,
        pick("login_hint", "lti_message_hint", "client_id"),
        withValues({
          redirect_uri: params.target_link_uri,
          scope: "openid",
          nonce: crypto.randomUUID(),
          prompt: "none",
          response_mode: "form_post",
          response_type: "id_token",
        }),
        toParams
      );
      const redirectUrl = `${registration.platform_configuration.authorization_endpoint}${redirectParams}`;
      return redirectResponse(redirectUrl);
    }) // todo change to redirect
    //Effect.bind('hmm', ({registration}) => registration.)
  )
);

const toParams = (params: Record<string, string>) =>
  pipe(
    params,
    Object.entries,
    ReadonlyArray.map(([key, value]) => `${key}=${encodeURIComponent(value)}`),
    ReadonlyArray.join("&"),
    (s) => (s === "" ? "" : `?${s}`)
  );

const withValues =
  (obj: Record<string, string>) => (rest: Record<string, string>) => ({
    ...rest,
    ...obj,
  });

const pick =
  <K extends string>(...keys: K[]) =>
  <R extends Partial<Record<K, unknown>>>(
    record: R
  ): Partial<Record<K, string>> => {
    return pipe(
      record,
      Object.entries,
      ReadonlyArray.filter(([key]) => ReadonlyArray.contains(key)(keys)),
      ReadonlyArray.filterMap(([key, value]) =>
        pipe(
          value,
          Option.fromNullable,
          Option.filter((v) => typeof v === "string"),
          Option.map((v) => [key, v] as const)
        )
      ),
      Object.fromEntries
    );
  };

launchRouter.get("/registrations/:registrationId/login", handleLoginRequest);
launchRouter.post("/registrations/:registrationId/login", handleLoginRequest);

const launchUrlParams = parseParams(
  S.struct({
    registrationId: stringToInteger,
    type: S.literal("resource_link"),
  })
);

const idToken = pipe(
  parseBodyOrParams(
    S.struct({
      id_token: S.string,
    })
  ),
  Effect.flatMap((s) =>
    pipe(
      S.parse(
        JsonWebToken(
          S.struct({
            aud: S.string,
            iss: S.string,
            "https://www.instructure.com/placement": S.optional(S.string),
            "https://purl.imsglobal.org/spec/lti/claim/context": S.optional(
              S.struct({
                id: S.string,
                label: S.string,
                title: S.string,
                type: S.array(S.string),
              })
            ),
          })
        )
      )(s.id_token, { onExcessProperty: "ignore" }),
      Effect.mapError((errs) => parseBodyError(s, errs))
    )
  )
);

const handleLaunchRequest = effRequestHandler(
  pipe(
    launchUrlParams,
    Effect.bindTo("params"),
    // Effect.map((params) => ({ params })),
    Effect.bind("idToken", () => idToken),
    Effect.map(({ params, idToken }) => successResponse({ params, idToken })),
    (a) => a
  )
);

launchRouter.post("/registrations/:registrationId/:type", handleLaunchRequest);

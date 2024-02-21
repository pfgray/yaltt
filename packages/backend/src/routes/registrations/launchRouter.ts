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
} from "../../express/effRequestHandler";

import { App, Registration, parseJwt, stringToInteger } from "@yaltt/model";
import {
  parseBodyOrParams,
  parseParams,
  parseParamsError,
  parseQuery,
} from "../../express/parseParams";
import { getRegistrationForId } from "../../model/entities/registrations";
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
import { getAppForId } from "../../model/entities/apps";
import { successResponse } from "../../express/effRequestHandler";

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
  })
);

const LaunchIdToken = UserIdentityClaim.pipe(
  S.extend(ContextClaim),
  S.extend(CustomClaim),
  S.extend(DeploymentIdClaim),
  S.extend(LaunchPresentationClaim),
  S.extend(LisClaim),
  S.extend(LtiVersionClaim),
  S.extend(MessageTypeClaim),
  S.extend(PlatformInstanceClaim),
  S.extend(ResourceLinkClaim),
  S.extend(RolesClaim),
  S.extend(RoleScopeMentorClaim),
  S.extend(TargetLinkUriClaim)
);

const parseIdToken = pipe(
  parseBodyOrParams(
    S.struct({
      id_token: S.string,
    })
  ),
  // todo: validate the id_token signature?
  Effect.flatMap((s) =>
    pipe(
      parseJwt(s.id_token),
      Effect.mapError(() =>
        parseParamsError(
          { id_token: s },
          PR.parseError(ReadonlyArray.make(PR.type(AST.stringKeyword, s)))
        )
      )
    )
  ),
  Effect.map((rawIdToken) => ({ rawIdToken })),
  Effect.bind("parsedIdToken", ({ rawIdToken }) =>
    pipe(
      S.parse(LaunchIdToken)(rawIdToken.payload, {
        onExcessProperty: "ignore",
      }),
      Effect.mapError((error) => parseParamsError(rawIdToken.payload, error))
    )
  )
);

const savePerson = (
  registrationId: number,
  idToken: S.Schema.To<typeof LaunchIdToken>
) => {
  if (typeof idToken.sub !== "undefined") {
    idToken;
    return pipe(
      createPersonForRegistrationId(
        registrationId,
        idToken.sub,
        idToken.name,
        idToken.given_name,
        idToken.family_name,
        idToken.middle_name,
        idToken.email,
        idToken.locale
      ),
      Effect.map((p) => Option.some(p.id))
    );
  } else {
    return Effect.succeed(Option.none());
  }
};

const saveContext = (
  registrationId: number,
  idToken: S.Schema.To<typeof LaunchIdToken>
) => {
  const context = idToken["https://purl.imsglobal.org/spec/lti/claim/context"];
  if (typeof context !== "undefined") {
    return pipe(
      createContextForRegistrationId(
        registrationId,
        context.type,
        context.label,
        context.title
      ),
      Effect.map((c) => Option.some(c.id))
    );
  } else {
    return Effect.succeed(Option.none());
  }
};

const saveEnrollment = (
  person: Option.Option<number>,
  context: Option.Option<number>,
  idToken: S.Schema.To<typeof LaunchIdToken>
) =>
  pipe(
    idToken["https://purl.imsglobal.org/spec/lti/claim/roles"],
    Option.fromNullable,
    Option.bindTo("roles"),
    Option.bind("person", () => person),
    Option.bind("context", () => context),
    Option.match({
      onSome: ({ roles, person, context }) =>
        pipe(createEnrollment(context, person, roles), Effect.map(Option.some)),
      onNone: () => Effect.succeed(Option.none()),
    })
  );

const saveLaunch = (
  registrationId: number,
  idToken: S.Schema.To<typeof LaunchIdToken>,
  rawIdToken: unknown
) =>
  pipe(
    savePerson(registrationId, idToken),
    Effect.bindTo("person"),
    Effect.bind("context", () => saveContext(registrationId, idToken)),
    Effect.bind("enrollment", ({ person, context }) =>
      saveEnrollment(person, context, idToken)
    ),
    Effect.bind("launch", ({ enrollment, person, context }) =>
      createLaunchForRegistrationId(
        registrationId,
        rawIdToken,
        Option.getOrUndefined(person),
        Option.getOrUndefined(context)
      )
    )
  );

const handleLaunchRequest = effRequestHandler(
  pipe(
    launchUrlParams,
    Effect.bindTo("params"),
    Effect.bind("query", () =>
      parseQuery(
        S.struct({
          placement: S.optional(S.string),
        })
      )
    ),
    Effect.bind("idToken", () => parseIdToken),
    Effect.bind(
      "launch",
      ({ params, idToken: { parsedIdToken, rawIdToken }, query }) =>
        saveLaunch(params.registrationId, parsedIdToken, rawIdToken.payload)
    ),
    Effect.map(
      ({ params, launch, query }) =>
        `/launch/${launch.launch.id}?placement=${query.placement}`
    ),
    Effect.map(redirectResponse)
  )
);

launchRouter.post("/registrations/:registrationId/launch", handleLaunchRequest);

const launchIdParam = parseParams(
  S.struct({
    launchId: stringToInteger,
  })
);

launchRouter.get(
  "/launch/:launchId",
  effRequestHandler(
    pipe(
      launchIdParam,
      Effect.map((l) => l.launchId),
      Effect.flatMap(getLaunchForId),
      Effect.bindTo("launch"),
      Effect.bind("registration", ({ launch }) =>
        getRegistrationForId(launch.registration_id)
      ),
      Effect.bind("app", ({ registration }) =>
        getAppForId(registration.app_id)
      ),
      Effect.map(({ launch, app, registration }) => ({
        ...launch,
        app,
        registration,
      })),
      Effect.map(
        schemaResponse(
          200,
          LaunchRow.pipe(
            S.extend(
              S.struct({
                app: App,
                registration: Registration,
              })
            )
          )
        )
      )
    )
  )
);

import { Effect, Option, pipe } from "effect";
import * as express from "express";
import * as S from "@effect/schema/Schema";
import {
  effRequestHandler,
  redirectResponse,
} from "../../express/effRequestHandler";
import { stringToInteger } from "@yaltt/model";
import { parseBodyOrParams, parseParams } from "../../express/parseParams";
import { getRegistrationForId } from "../../model/entities/registrations";
import { ExpressRequestService } from "../../express/RequestService";
import { createPersonForRegistrationId } from "../../model/entities/people";
import { createContextForRegistrationId } from "../../model/entities/contexts";
import { createEnrollment } from "../../model/entities/enrollments";
import { createLaunchForRegistrationId } from "../../model/entities/launches";
import {
  validateOAuthSignature,
  validateTimestamp,
  constructOAuthUrl,
  OAuthValidationError,
} from "../../lti11/oauth";
import { Lti11ContentItemSelectionRequest } from "lti-model";
import { formatError } from "@effect/schema/TreeFormatter";

export const lti11ContentItemRouter = express.Router();

const contentItemUrlParams = parseParams(
  S.struct({
    registrationId: stringToInteger,
  })
);

/**
 * Error class for LTI 1.1 content-item errors
 */
class Lti11ContentItemError {
  readonly _tag = "Lti11ContentItemError";
  constructor(public readonly message: string) {}
}

/**
 * Maps LTI 1.1 roles to LTI 1.3 format
 * LTI 1.1 uses simple role names (e.g., "Instructor", "Learner")
 * LTI 1.3 uses URNs (e.g., "http://purl.imsglobal.org/vocab/lis/v2/membership#Instructor")
 */
const normalizeLti11Roles = (rolesString?: string): string[] => {
  if (!rolesString) return [];

  const roleMapping: Record<string, string> = {
    Instructor:
      "http://purl.imsglobal.org/vocab/lis/v2/membership#Instructor",
    Learner: "http://purl.imsglobal.org/vocab/lis/v2/membership#Learner",
    Administrator:
      "http://purl.imsglobal.org/vocab/lis/v2/institution/person#Administrator",
    TeachingAssistant:
      "http://purl.imsglobal.org/vocab/lis/v2/membership#Instructor#TeachingAssistant",
    ContentDeveloper:
      "http://purl.imsglobal.org/vocab/lis/v2/membership#ContentDeveloper",
    Member: "http://purl.imsglobal.org/vocab/lis/v2/membership#Member",
  };

  return rolesString
    .split(",")
    .map((role) => role.trim())
    .map((role) => roleMapping[role] || role);
};

/**
 * Saves person information from LTI 1.1 content-item request parameters
 */
const savePerson = (
  registrationId: number,
  params: S.Schema.To<typeof Lti11ContentItemSelectionRequest>
) => {
  if (params.user_id) {
    return pipe(
      createPersonForRegistrationId(
        registrationId,
        params.user_id,
        params.lis_person_name_full,
        params.lis_person_name_given,
        params.lis_person_name_family,
        undefined, // middle_name not in LTI 1.1
        params.lis_person_contact_email_primary,
        undefined // locale not typically in content-item requests
      ),
      Effect.map((p) => Option.some(p.id))
    );
  } else {
    return Effect.succeed(Option.none());
  }
};

/**
 * Saves context information from LTI 1.1 content-item request parameters
 */
const saveContext = (
  registrationId: number,
  params: S.Schema.To<typeof Lti11ContentItemSelectionRequest>
) => {
  if (params.context_id) {
    return pipe(
      createContextForRegistrationId(
        registrationId,
        ["CourseOffering"], // Default type for LTI 1.1
        params.context_label,
        params.context_title
      ),
      Effect.map((c) => Option.some(c.id))
    );
  } else {
    return Effect.succeed(Option.none());
  }
};

/**
 * Saves enrollment information from LTI 1.1 content-item request parameters
 */
const saveEnrollment = (
  person: Option.Option<number>,
  context: Option.Option<number>,
  params: S.Schema.To<typeof Lti11ContentItemSelectionRequest>
) =>
  pipe(
    params.roles,
    Option.fromNullable,
    Option.map(normalizeLti11Roles),
    Option.bindTo("roles"),
    Option.bind("person", () => person),
    Option.bind("context", () => context),
    Option.match({
      onSome: ({ roles, person, context }) =>
        pipe(createEnrollment(context, person, roles), Effect.map(Option.some)),
      onNone: () => Effect.succeed(Option.none()),
    })
  );

/**
 * Saves all content-item request data (person, context, enrollment, launch record)
 */
const saveContentItemLaunch = (
  registrationId: number,
  params: S.Schema.To<typeof Lti11ContentItemSelectionRequest>
) =>
  pipe(
    savePerson(registrationId, params),
    Effect.bindTo("person"),
    Effect.bind("context", () => saveContext(registrationId, params)),
    Effect.bind("enrollment", ({ person, context }) =>
      saveEnrollment(person, context, params)
    ),
    Effect.bind("launch", ({ enrollment, person, context }) =>
      createLaunchForRegistrationId(
        registrationId,
        params, // Store raw LTI 1.1 content-item request as JSONB
        Option.getOrUndefined(person),
        Option.getOrUndefined(context)
      )
    )
  );

/**
 * Main LTI 1.1 content-item request handler
 */
const handleLti11ContentItemRequest = effRequestHandler(
  pipe(
    contentItemUrlParams,
    Effect.bindTo("params"),
    Effect.bind("registration", ({ params }) =>
      getRegistrationForId(params.registrationId)
    ),
    Effect.bind("requestService", () => ExpressRequestService),
    Effect.flatMap(({ params, registration, requestService }) =>
      pipe(
        // Parse and validate content-item request parameters
        Effect.Do,
        Effect.tap(() =>
          Effect.sync(() => {
            const body = requestService.request.body || {};
            const query = requestService.request.query || {};
            const params = { ...body, ...query };
            console.log("Content-item request parameters:", JSON.stringify(params, null, 2));
          })
        ),
        Effect.bind("contentItemParams", () =>
          pipe(
            parseBodyOrParams(Lti11ContentItemSelectionRequest),
            Effect.mapError(
              (err) =>
                new Lti11ContentItemError(
                  `Invalid LTI 1.1 content-item request parameters: ${formatError(err.error)}`
                )
            )
          )
        ),
        // Verify registration is LTI 1.1 type
        Effect.flatMap(({ contentItemParams }) => {
          if (registration.type !== "lti11") {
            return Effect.fail(
              new Lti11ContentItemError(
                `Registration ${params.registrationId} is not an LTI 1.1 registration (type: ${registration.type})`
              )
            );
          }

          // Check if this is a content selection request
          // Canvas uses selection_directive=embed_content instead of ContentItemSelectionRequest
          const isCanvasContentSelection =
            contentItemParams.selection_directive === "embed_content" ||
            !!contentItemParams.ext_content_return_url;

          const isStandardContentItem =
            contentItemParams.lti_message_type === "ContentItemSelectionRequest";

          if (!isCanvasContentSelection && !isStandardContentItem) {
            return Effect.fail(
              new Lti11ContentItemError(
                `Not a content selection request. Message type: ${contentItemParams.lti_message_type}, Selection directive: ${contentItemParams.selection_directive || 'none'}`
              )
            );
          }

          // TypeScript now knows registration is an LTI 1.1 registration
          const consumerKey = registration.consumer_key;
          const sharedSecret = registration.shared_secret;

          // Verify consumer key matches
          if (contentItemParams.oauth_consumer_key !== consumerKey) {
            return Effect.fail(
              new Lti11ContentItemError(
                `OAuth consumer key mismatch. Expected: ${consumerKey}, Got: ${contentItemParams.oauth_consumer_key}`
              )
            );
          }

          // Construct the URL for OAuth validation
          // This must match exactly what the platform signed
          const protocol = requestService.request.protocol || "https";
          const host = requestService.request.get("host") || "localhost";
          const path =
            requestService.request.originalUrl || requestService.request.url || "";
          const url = constructOAuthUrl(protocol, host, path);

          // Validate OAuth signature
          return pipe(
            validateOAuthSignature(
              "POST",
              url,
              contentItemParams as any,
              sharedSecret
            ),
            Effect.flatMap(() =>
              validateTimestamp(contentItemParams.oauth_timestamp)
            ),
            Effect.mapError(
              (err: OAuthValidationError) =>
                new Lti11ContentItemError(
                  `OAuth validation failed: ${err.message}`
                )
            ),
            Effect.map(() => ({ contentItemParams }))
          );
        }),
        // Save content-item request data
        Effect.bind("launch", ({ contentItemParams }) =>
          saveContentItemLaunch(params.registrationId, contentItemParams)
        ),
        Effect.map(({ launch }) => `/launch/${launch.launch.id}`),
        Effect.map(redirectResponse)
      )
    )
  )
);

lti11ContentItemRouter.post(
  "/registrations/:registrationId/lti11/content_item",
  handleLti11ContentItemRequest
);

import * as S from "@effect/schema/Schema";
import { Effect, pipe } from "effect";
import * as express from "express";

import {
  AppId,
  RegistrationId,
  signLti11ContentItems,
} from "@yaltt/model";
import { bindEndpoint } from "../../express/endpointRequestHandler";
import { requireLti11Registration } from "../../model/entities/registrations";
import { registrationAndApp } from "./registrationsRouter";
import { generateOAuthSignature } from "../../lti11/oauth";
import { Lti11ContentItemSelection } from "lti-model";

export const lti11ContentItemSigningRouter = express.Router();
const bindContentItemSigningEndpoint = bindEndpoint(lti11ContentItemSigningRouter);

/**
 * Generates an HTML auto-submit form for posting content items back to the platform
 *
 * @param url - The content_item_return_url from the platform
 * @param parameters - All OAuth-signed parameters including content_items
 * @returns HTML string containing an auto-submit form
 */
const generateAutoSubmitForm = (
  url: string,
  parameters: Record<string, any>
): string => {
  const formFields = Object.entries(parameters)
    .map(
      ([key, value]) =>
        `<input type="hidden" name="${escapeHtml(key)}" value="${escapeHtml(String(value))}" />`
    )
    .join("\n    ");

  return `<!DOCTYPE html>
<html>
<head>
    <title>Returning Content Items</title>
</head>
<body onload="document.getElementById('contentItemForm').submit()">
    <form id="contentItemForm" action="${escapeHtml(url)}" method="POST">
    ${formFields}
    </form>
    <p>Returning content items to the platform...</p>
</body>
</html>`;
};

/**
 * Escapes HTML special characters to prevent XSS
 */
const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

bindContentItemSigningEndpoint(signLti11ContentItems)(
  ({ appId, registrationId }, _, body) =>
    pipe(
      registrationAndApp(appId, registrationId),
      Effect.flatMap(({ registration }) =>
        requireLti11Registration(
          registration,
          "Cannot sign LTI 1.1 content items for LTI 1.3 registration"
        )
      ),
      Effect.flatMap((registration) => {
        // Build the ContentItemSelection JSON-LD structure
        const contentItemSelection: Lti11ContentItemSelection = {
          "@context": "http://purl.imsglobal.org/ctx/lti/v1/ContentItem",
          "@graph": body.contentItems,
        };

        // Prepare the base parameters for OAuth signing
        const baseParams: Record<string, string> = {
          lti_message_type: "ContentItemSelection",
          lti_version: "LTI-1p0",
          content_items: JSON.stringify(contentItemSelection),
        };

        // Include the data parameter if provided
        if (body.data) {
          baseParams.data = body.data;
        }

        // Generate OAuth-signed parameters
        return pipe(
          generateOAuthSignature(
            "POST",
            body.content_item_return_url,
            baseParams,
            registration.consumer_key,
            registration.shared_secret
          ),
          Effect.mapError((err) => ({
            _tag: "Lti11ContentItemError" as const,
            message: `OAuth signature generation failed: ${err.message}`,
          })),
          Effect.map((signedParams) => ({
            html: generateAutoSubmitForm(
              body.content_item_return_url,
              signedParams
            ),
          }))
        );
      })
    )
);

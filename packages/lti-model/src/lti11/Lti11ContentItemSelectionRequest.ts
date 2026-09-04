import * as S from "@effect/schema/Schema";

/**
 * LTI 1.1 Content-Item Selection Request Parameters
 *
 * Represents the parameters sent in an LTI 1.1 ContentItemSelectionRequest.
 * These are form-encoded POST parameters following the IMS LTI Content-Item Message specification.
 *
 * Core required parameters:
 * - lti_message_type: "ContentItemSelectionRequest"
 * - lti_version: LTI version (usually "LTI-1p0")
 * - content_item_return_url: URL where the tool should return the selected content items
 * - accept_media_types: Comma-separated list of accepted media types
 *
 * OAuth 1.0a parameters:
 * - oauth_consumer_key: The consumer key
 * - oauth_signature_method: Signature method (usually "HMAC-SHA1")
 * - oauth_signature: The OAuth signature
 * - oauth_timestamp: Unix timestamp
 * - oauth_nonce: Unique nonce
 * - oauth_version: OAuth version (usually "1.0")
 *
 * Optional parameters:
 * - accept_presentation_document_targets: Comma-separated list of presentation targets
 * - accept_unsigned: Whether unsigned content items are accepted
 * - accept_multiple: Whether multiple content items can be returned
 * - accept_copy_advice: Whether the tool can copy content
 * - auto_create: Whether to auto-create a link
 * - can_confirm: Whether user confirmation is supported
 * - data: Opaque data to be returned with the content item
 * - title: Suggested title for the content item
 * - text: Suggested description for the content item
 *
 * User parameters (optional):
 * - user_id: Unique user identifier
 * - lis_person_name_given: User's first name
 * - lis_person_name_family: User's last name
 * - lis_person_name_full: User's full name
 * - lis_person_contact_email_primary: User's email
 * - roles: Comma-separated list of roles
 *
 * Context parameters (optional):
 * - context_id: Unique context identifier
 * - context_title: Context title
 * - context_label: Context label
 */
const Lti11ContentItemSelectionRequestBase = S.struct({
  // Required core parameters
  lti_message_type: S.string,
  lti_version: S.string,
  // Standard Content-Item Message OR Canvas extension
  content_item_return_url: S.optional(S.string),
  accept_media_types: S.optional(S.string),
  // Canvas extension parameters (used instead of standard)
  ext_content_return_url: S.optional(S.string),
  ext_content_return_types: S.optional(S.string),
  ext_content_intended_use: S.optional(S.string),
  selection_directive: S.optional(S.string),

  // OAuth parameters
  oauth_consumer_key: S.string,
  oauth_signature_method: S.string,
  oauth_signature: S.string,
  oauth_timestamp: S.string,
  oauth_nonce: S.string,
  oauth_version: S.string,

  // Optional content-item specific parameters
  accept_presentation_document_targets: S.optional(S.string),
  accept_unsigned: S.optional(S.string),
  accept_multiple: S.optional(S.string),
  accept_copy_advice: S.optional(S.string),
  auto_create: S.optional(S.string),
  can_confirm: S.optional(S.string),
  data: S.optional(S.string),
  title: S.optional(S.string),
  text: S.optional(S.string),

  // Optional user parameters
  user_id: S.optional(S.string),
  lis_person_name_given: S.optional(S.string),
  lis_person_name_family: S.optional(S.string),
  lis_person_name_full: S.optional(S.string),
  lis_person_contact_email_primary: S.optional(S.string),
  roles: S.optional(S.string),

  // Optional context parameters
  context_id: S.optional(S.string),
  context_title: S.optional(S.string),
  context_label: S.optional(S.string),

  // Optional tool consumer parameters
  tool_consumer_instance_guid: S.optional(S.string),
  tool_consumer_instance_name: S.optional(S.string),
  tool_consumer_instance_description: S.optional(S.string),
  tool_consumer_instance_url: S.optional(S.string),
  tool_consumer_instance_contact_email: S.optional(S.string),
});

export const Lti11ContentItemSelectionRequest = S.extend(
  Lti11ContentItemSelectionRequestBase,
  S.record(S.string, S.unknown)
);

export interface Lti11ContentItemSelectionRequest
  extends S.Schema.To<typeof Lti11ContentItemSelectionRequest> {}

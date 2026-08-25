import * as S from "@effect/schema/Schema";

/**
 * LTI 1.1 Launch Parameters
 *
 * Represents the parameters sent in an LTI 1.1 launch request.
 * These are form-encoded POST parameters, not JWT claims like in LTI 1.3.
 *
 * Core required parameters:
 * - lti_message_type: Type of LTI message (usually "basic-lti-launch-request")
 * - lti_version: LTI version (usually "LTI-1p0")
 * - resource_link_id: Unique identifier for the resource link
 *
 * OAuth 1.0a parameters:
 * - oauth_consumer_key: The consumer key
 * - oauth_signature_method: Signature method (usually "HMAC-SHA1")
 * - oauth_signature: The OAuth signature
 * - oauth_timestamp: Unix timestamp
 * - oauth_nonce: Unique nonce
 * - oauth_version: OAuth version (usually "1.0")
 *
 * User parameters:
 * - user_id: Unique user identifier
 * - lis_person_name_given: User's first name
 * - lis_person_name_family: User's last name
 * - lis_person_name_full: User's full name
 * - lis_person_contact_email_primary: User's email
 * - roles: Comma-separated list of roles
 *
 * Context parameters:
 * - context_id: Unique context identifier
 * - context_title: Context title
 * - context_label: Context label
 *
 * Other parameters:
 * - resource_link_title: Title of the resource link
 * - resource_link_description: Description of the resource link
 * - launch_presentation_return_url: URL to return to after launch
 * - tool_consumer_instance_guid: GUID for the tool consumer
 * - tool_consumer_instance_name: Name of the tool consumer
 */
export const Lti11LaunchParameters = S.struct({
  // Required core parameters
  lti_message_type: S.string,
  lti_version: S.string,
  resource_link_id: S.string,

  // OAuth parameters
  oauth_consumer_key: S.string,
  oauth_signature_method: S.string,
  oauth_signature: S.string,
  oauth_timestamp: S.string,
  oauth_nonce: S.string,
  oauth_version: S.string,

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

  // Optional resource link parameters
  resource_link_title: S.optional(S.string),
  resource_link_description: S.optional(S.string),

  // Optional launch presentation parameters
  launch_presentation_return_url: S.optional(S.string),
  launch_presentation_locale: S.optional(S.string),

  // Optional tool consumer parameters
  tool_consumer_instance_guid: S.optional(S.string),
  tool_consumer_instance_name: S.optional(S.string),
  tool_consumer_instance_description: S.optional(S.string),
  tool_consumer_instance_url: S.optional(S.string),
  tool_consumer_instance_contact_email: S.optional(S.string),
}).pipe(
  // Allow additional unknown parameters
  S.extend(S.record(S.string, S.unknown))
);

export interface Lti11LaunchParameters
  extends S.Schema.To<typeof Lti11LaunchParameters> {}

import { LtiScope } from "lti-model";

/**
 * Lti Scopes specific to Canvas
 *
 * Located here: https://canvas.instructure.com/doc/api/file.tools_intro.html
 */
export const CanvasScopes = {
  /**
   * Can view Progress records associated with the context the tool is installed in
   */
  LTI_AGS_SHOW_PROGRESS_SCOPE:
    "https://canvas.instructure.com/lti-ags/progress/scope/show",
  /**
   * Can update public jwk for LTI services
   */
  LTI_UPDATE_PUBLIC_JWK_SCOPE:
    "https://canvas.instructure.com/lti/public_jwk/scope/update",
  /**
   * Can lookup Account information
   */
  LTI_ACCOUNT_LOOKUP_SCOPE:
    "https://canvas.instructure.com/lti/account_lookup/scope/show",
  LTI_CREATE_DATA_SERVICE_SUBSCRIPTION_SCOPE:
    "https://canvas.instructure.com/lti/data_services/scope/create",
  LTI_SHOW_DATA_SERVICE_SUBSCRIPTION_SCOPE:
    "https://canvas.instructure.com/lti/data_services/scope/show",
  LTI_UPDATE_DATA_SERVICE_SUBSCRIPTION_SCOPE:
    "https://canvas.instructure.com/lti/data_services/scope/update",
  LTI_LIST_DATA_SERVICE_SUBSCRIPTION_SCOPE:
    "https://canvas.instructure.com/lti/data_services/scope/list",
  LTI_DESTROY_DATA_SERVICE_SUBSCRIPTION_SCOPE:
    "https://canvas.instructure.com/lti/data_services/scope/destroy",
  LTI_LIST_EVENT_TYPES_DATA_SERVICE_SUBSCRIPTION_SCOPE:
    "https://canvas.instructure.com/lti/data_services/scope/list_event_types",
  LTI_SHOW_FEATURE_FLAG_SCOPE:
    "https://canvas.instructure.com/lti/feature_flags/scope/show",
  LTI_CREATE_ACCOUNT_EXTERNAL_TOOLS_SCOPE:
    "https://canvas.instructure.com/lti/account_external_tools/scope/create",
  LTI_DESTROY_ACCOUNT_EXTERNAL_TOOLS_SCOPE:
    "https://canvas.instructure.com/lti/account_external_tools/scope/destroy",
  LTI_LIST_ACCOUNT_EXTERNAL_TOOLS_SCOPE:
    "https://canvas.instructure.com/lti/account_external_tools/scope/list",
  LTI_SHOW_ACCOUNT_EXTERNAL_TOOLS_SCOPE:
    "https://canvas.instructure.com/lti/account_external_tools/scope/show",
  LTI_UPDATE_ACCOUNT_EXTERNAL_TOOLS_SCOPE:
    "https://canvas.instructure.com/lti/account_external_tools/scope/update",
  ...LtiScope,
} as const;

export type CanvasScope = (typeof CanvasScopes)[keyof typeof CanvasScopes];

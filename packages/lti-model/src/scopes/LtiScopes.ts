export const LtiScopes = {
  LTI_AGS_LINE_ITEM_SCOPE:
    "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem",
  LTI_AGS_LINE_ITEM_READ_ONLY_SCOPE:
    "https://purl.imsglobal.org/spec/lti-ags/scope/lineitem.readonly",
  LTI_AGS_RESULT_READ_ONLY_SCOPE:
    "https://purl.imsglobal.org/spec/lti-ags/scope/result.readonly",
  LTI_AGS_SCORE_SCOPE: "https://purl.imsglobal.org/spec/lti-ags/scope/score",
  LTI_NRPS_V2_SCOPE:
    "https://purl.imsglobal.org/spec/lti-nrps/scope/contextmembership.readonly",
} as const;
export type LtiScope = typeof LtiScopes[keyof typeof LtiScopes];

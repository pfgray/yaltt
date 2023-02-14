export const LtiMessageTypes = {
  LtiDeepLinkingRequest: "LtiDeepLinkingRequest",
  LtiDeepLinkingResponse: "LtiDeepLinkingResponse",
  LtiResourceLinkRequest: "LtiResourceLinkRequest",
  LtiContextLaunchRequest: "LtiContextLaunchRequest",
  LtiDataPrivacyLaunchRequest: "LtiDataPrivacyLaunchRequest",
  ContentItemSelectionRequest: "ContentItemSelectionRequest",
  LtiDeploymentRequest: "LtiDeploymentRequest",
  ContentItemUpdateRequest: "ContentItemUpdateRequest",
  ContextLaunchRequest: "ContextLaunchRequest",
  LtiPersonRequest: "LtiPersonRequest",
  LtiStartProctoring: "LtiStartProctoring",
  LtiStartAssessment: "LtiStartAssessment",
  LtiEndAssessment: "LtiEndAssessment",
  "basic-lti-launch-request": "basic-lti-launch-request",
} as const;

export type LtiMessageType =
  typeof LtiMessageTypes[keyof typeof LtiMessageTypes];

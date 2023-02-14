export const CanvasLtiMessageTypes = {
  LtiDeepLinkingRequest: "LtiDeepLinkingRequest",
  LtiResourceLinkRequest: "LtiResourceLinkRequest",
} as const;

export type CanvasLtiMessageType =
  typeof CanvasLtiMessageTypes[keyof typeof CanvasLtiMessageTypes];

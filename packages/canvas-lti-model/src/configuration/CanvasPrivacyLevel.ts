export const CanvasPrivacyLevels = {
  public: "public",
  email_only: "email_only",
  name_only: "name_only",
  anonymous: "anonymous",
} as const;

export type CanvasPrivacyLevel =
  typeof CanvasPrivacyLevels[keyof typeof CanvasPrivacyLevels];

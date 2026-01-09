import * as S from "@effect/schema/Schema";

export const CanvasPrivacyLevels = {
  public: "public",
  email_only: "email_only",
  name_only: "name_only",
  anonymous: "anonymous",
} as const;

export const CanvasPrivacyLevel = S.union(
  S.literal("public"),
  S.literal("email_only"),
  S.literal("name_only"),
  S.literal("anonymous")
);

export type CanvasPrivacyLevel = S.Schema.To<typeof CanvasPrivacyLevel>;

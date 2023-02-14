import * as S from "@fp-ts/schema";
import { literal } from "@fp-ts/schema";
import { CanvasPrivacyLevels } from "./CanvasPrivacyLevel";
import { CanvasToolExtensionSettings } from "./CanvasToolExtensionSettings";

export const CanvasToolExtension = S.struct({
  platform: S.string,
  settings: CanvasToolExtensionSettings,
  domain: S.optional(S.string),
  tool_id: S.optional(S.string),
  privacy_level: S.optional(S.literal(...Object.values(CanvasPrivacyLevels))),
});

export interface CanvasToolExtension
  extends S.Infer<typeof CanvasToolExtension> {}

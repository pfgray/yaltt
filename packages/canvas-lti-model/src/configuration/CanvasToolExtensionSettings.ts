import * as S from "@effect/schema/Schema";
import { CanvasPlacement } from "../placements/CanvasPlacement";

export const CanvasToolExtensionSettings = S.struct({
  text: S.optional(S.string),
  placements: S.array(CanvasPlacement),
});

export interface CanvasToolExtensionSettings
  extends S.To<typeof CanvasToolExtensionSettings> {}

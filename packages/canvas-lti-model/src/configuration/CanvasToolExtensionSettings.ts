import * as S from "@fp-ts/schema";
import { CanvasPlacement } from "../placements/CanvasPlacement";

export const CanvasToolExtensionSettings = S.struct({
  text: S.optional(S.string),
  placements: S.array(CanvasPlacement),
});

export interface CanvasToolExtensionSettings
  extends S.Infer<typeof CanvasToolExtensionSettings> {}

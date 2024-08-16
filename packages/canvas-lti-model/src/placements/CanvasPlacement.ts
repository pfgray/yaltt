import * as S from "@effect/schema/Schema";
import { CanvasLtiMessageTypes } from "../message/CanvasLtiMessageTypes";
import { CanvasPlacementTypes } from "./CanvasPlacementTypes";
import { NonPrefixedCanvasPlacementTypes } from "./NonPrefixedCanvasPlacementTypes";

export const CanvasPlacement = S.struct({
  placement: S.literal(...Object.values(NonPrefixedCanvasPlacementTypes)),
  target_link_uri: S.optional(S.string),
  text: S.optional(S.string),
  icon_uri: S.optional(S.string),
  message_type: S.optional(S.literal(...Object.values(CanvasLtiMessageTypes))),
  canvas_icon_class: S.optional(S.string),
  selection_width: S.optional(S.string),
  selection_height: S.optional(S.string),
});

export interface CanvasPlacement extends S.Schema.To<typeof CanvasPlacement> {}

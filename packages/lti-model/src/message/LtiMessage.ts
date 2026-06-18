import * as S from "@effect/schema/Schema";
import { CustomParameters } from "./CustomParameters";
import { Url } from "../registration/Url";
import { pipe } from "effect";
import { LocalizedKey } from "../registration/LocalizedKey";

export const IframeOptions = S.struct({
  width: S.number,
  height: S.number,
});

export interface IframeOptions extends S.Schema.To<typeof IframeOptions> {}

export const LtiMessage = pipe(
  S.struct({
    type: S.string,
    target_link_uri: S.optional(Url),
    custom_parameters: S.optional(CustomParameters),
    icon_uri: S.optional(S.string),
    placements: S.optional(S.array(S.string)),
    roles: S.optional(S.array(S.string)),
    preferred_presentation: S.optional(S.string),
    iframe: S.optional(IframeOptions),
  }),
  S.extend(LocalizedKey("label"))
);

export interface LtiMessage extends S.Schema.To<typeof LtiMessage> {}

import * as S from "@fp-ts/schema";
import { CustomParameters } from "./CustomParameters";
import { Url } from "../registration/Url";
import { pipe } from "@fp-ts/core/Function";
import { LocalizedKey } from "../registration/LocalizedKey";

export const LtiMessage = pipe(
  S.struct({
    type: S.string,
    target_link_uri: S.optional(Url),
    custom_parameters: S.optional(CustomParameters),
    icon_uri: S.optional(S.string),
    placements: S.optional(S.array(S.string)),
  }),
  S.extend(LocalizedKey("label"))
);

export interface LtiMessage extends S.Infer<typeof LtiMessage> {}

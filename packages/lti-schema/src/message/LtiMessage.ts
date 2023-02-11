import * as S from "@fp-ts/schema";
import { CustomParameters } from "./CustomParameters";
import { Url } from "../registration/Url";
import { pipe } from "@fp-ts/core/Function";
import { LocalizedKey } from "../registration/LocalizedKey";

export const LtiMessageS = pipe(
  S.struct({
    type: LtiMessageType,
    target_link_uri: Url,
    custom_parameters: CustomParameters,
  }),
  S.extend(LocalizedKey("label"))
);

export interface LtiMessage extends S.Infer<typeof LtiMessageS> {}

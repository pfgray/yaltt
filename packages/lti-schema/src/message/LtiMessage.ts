import * as S from "@effect/schema/Schema";
import { CustomParameters } from "./CustomParameters";
import { Url } from "../registration/Url";
import { pipe, Either, Option, ReadonlyArray, Effect } from "effect";
import { LocalizedKey } from "../registration/LocalizedKey";

export const LtiMessageS = pipe(
  S.struct({
    type: S.string,
    target_link_uri: Url,
    custom_parameters: CustomParameters,
  }),
  S.extend(LocalizedKey("label"))
);

export interface LtiMessage extends S.To<typeof LtiMessageS> {}

import * as S from "@effect/schema/Schema";
import { CustomParameters } from "./CustomParameters";
import { Url } from "../registration/Url";
import { pipe, Either, Option, ReadonlyArray, Effect } from "effect";
import { LocalizedKey } from "../registration/LocalizedKey";

export const LtiMessageS = pipe(
  S.struct({
    type: S.string,
    target_link_uri: S.optional(Url),
    custom_parameters: S.optional(CustomParameters),
    icon_uri: S.optional(S.string),
    placements: S.optional(S.array(S.string)),
    roles: S.optional(S.array(S.string)),
    "http://canvas.instructure.com/lti/course_navigation/default_enabled": S.optional(S.boolean)
  }),
  S.extend(LocalizedKey("label"))
);

export interface LtiMessage extends S.Schema.To<typeof LtiMessageS> {}

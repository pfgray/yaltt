import { pipe } from "effect";
import * as S from "@effect/schema/Schema";
import { CustomParameters } from "../message/CustomParameters";
import { LtiMessage } from "../message/LtiMessage";
import { LocalizedKeyOp } from "./LocalizedKey";
import { Url } from "./Url";

const Domain = S.string;

export const LtiToolConfiguration = pipe(
  S.struct({
    domain: Domain,
    secondary_domains: S.optional(S.array(Domain)),
    deployment_id: S.optional(S.string),
    target_link_uri: Url,
    custom_parameters: S.optional(CustomParameters),
    messages: S.array(LtiMessage),
    claims: S.array(S.string),
    "https://canvas.instructure.com/lti/privacy_level": S.optional(S.literal("public", "anonymous", "name_only", "email_only")),
  }),
  S.extend(LocalizedKeyOp("description"))
);

export interface LtiToolConfiguration
  extends S.To<typeof LtiToolConfiguration> {}

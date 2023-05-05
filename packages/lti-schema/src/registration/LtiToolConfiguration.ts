import * as S from "@effect/schema/Schema";
import { CustomParameters } from "../message/CustomParameters";
import { LtiMessageS } from "../message/LtiMessage";
import { Url } from "./Url";

const Domain = S.string;

export const LtiToolConfiguration = S.struct({
  domain: Domain,
  secondary_domains: S.optional(S.array(Domain)),
  deployment_id: S.optional(S.string),
  target_link_uri: Url,
  custom_parameters: CustomParameters,
  description: Url,
  messages: S.array(LtiMessageS),
  claims: S.array(S.string),
});

export interface LtiToolConfiguration
  extends S.To<typeof LtiToolConfiguration> {}

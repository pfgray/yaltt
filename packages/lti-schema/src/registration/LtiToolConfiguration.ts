import * as S from "@fp-ts/schema";
import { CustomParameters } from "../message/CustomParameters";
import { LtiMessage } from "../message/LtiMessage";
import { Url } from "./Url";

const Domain = S.string;

export const LtiToolConfiguration = S.struct({
  domain: Domain,
  secondary_domains: S.optional(S.array(Domain)),
  deployment_id: S.optional(S.string),
  target_link_uri: Url,
  custom_parameters: CustomParameters,
  description: Url,
  messages: S.array(LtiMessage),
  claims: S.array(S.string),
});

export interface LtiToolConfiguration
  extends S.Infer<typeof LtiToolConfiguration> {}

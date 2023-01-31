import * as S from "@fp-ts/schema/Schema";
import { LtiToolConfiguration } from "./LtiToolConfiguration";
import { Url } from "./Url";

const Scopes = S.string;

/**
 * An oidc Tool Configuration for LTI as defined by
 * https://www.imsglobal.org/spec/lti-dr/v1p0#tool-configuration
 */
export const ToolConfiguration = S.struct({
  application_type: S.literal("web"),
  grant_types: S.union(
    S.tuple(S.literal("client_credentials"), S.literal("implicit")),
    S.tuple(S.literal("implicit"), S.literal("client_credentials"))
  ),
  response_types: S.array(S.string),
  redirect_uris: S.array(Url),
  initiate_login_uri: Url,
  // Todo: how best to handle localization of the name???
  client_name: S.string,
  jwks_uri: Url,
  logo_uri: S.optional(Url),
  token_endpoint_auth_method: S.literal("private_key_jwt"),
  contacts: S.optional(S.array(S.string)),
  client_uri: S.optional(Url),
  tos_uri: S.optional(Url),
  policy_uri: S.optional(Url),
  "https://purl.imsglobal.org/spec/lti-tool-configuration":
    LtiToolConfiguration,
  scope: Scopes,
});

export type ToolCOnfiguration = S.Infer<typeof ToolConfiguration>;

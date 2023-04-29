import * as S from "@fp-ts/schema";
import { LtiPlatformConfiguration } from "./LtiPlatformConfiguration";
import { Url } from "./Url";

export const PlatformConfiguration = S.struct({
  issuer: Url,
  authorization_endpoint: Url,
  registration_endpoint: Url,
  jwks_uri: Url,
  token_endpoint: Url,
  token_endpoint_auth_methods_supported: S.array(S.string),
  scopes_supported: S.array(S.string),
  response_types_supported: S.array(S.string),
  id_token_signing_alg_values_supported: S.array(S.string),
  claims_supported: S.array(S.string),
  /**
   * The authorization server identifier to be used as the aud when requesting an access token. If not specified, the tool must use the token_endpoint as the aud value when requesting an access token.
   */
  authorization_server: S.optional(S.string),
  "https://purl.imsglobal.org/spec/lti-platform-configuration":
    LtiPlatformConfiguration,
});

export interface PlatformConfiguration
  extends S.Infer<typeof PlatformConfiguration> {}

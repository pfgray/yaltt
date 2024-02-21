import * as S from "@effect/schema/Schema";
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
  authorization_server: S.optional(S.string),
  "https://purl.imsglobal.org/spec/lti-platform-configuration":
    LtiPlatformConfiguration,
});

export interface PlatformConfiguration
  extends S.Schema.To<typeof PlatformConfiguration> {}

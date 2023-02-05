import * as S from "@fp-ts/schema";
import { LtiPlatformConfiguration } from "./LtiPlatformConfiguration";
import { Url } from "./Url";
export const HttpsUrl = S.templateLiteral(S.literal("https://"), S.string);
export const PlatformConfiguration = S.struct({
    issuer: HttpsUrl,
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
    "https://purl.imsglobal.org/spec/lti-platform-configuration": LtiPlatformConfiguration,
});

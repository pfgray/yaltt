import * as S from "@fp-ts/schema";
export declare const HttpsUrl: S.Schema<`https://${string}`>;
export type HttpsUrl = S.Infer<typeof HttpsUrl>;
export declare const PlatformConfiguration: S.Schema<{
    readonly issuer: `https://${string}`;
    readonly authorization_endpoint: string;
    readonly registration_endpoint: string;
    readonly jwks_uri: string;
    readonly token_endpoint: string;
    readonly token_endpoint_auth_methods_supported: readonly string[];
    readonly scopes_supported: readonly string[];
    readonly response_types_supported: readonly string[];
    readonly id_token_signing_alg_values_supported: readonly string[];
    readonly claims_supported: readonly string[];
    readonly "https://purl.imsglobal.org/spec/lti-platform-configuration": {
        readonly product_family_code: string;
        readonly version: string;
        readonly messages_supported: readonly string[];
        readonly variables?: readonly string[];
    };
    readonly authorization_server?: string;
}>;
export type PlatformConfiguration = S.Infer<typeof PlatformConfiguration>;
//# sourceMappingURL=PlatformConfiguration.d.ts.map
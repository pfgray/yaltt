import * as S from "@fp-ts/schema";
/**
 * An oidc Tool Configuration for LTI as defined by
 * https://www.imsglobal.org/spec/lti-dr/v1p0#tool-configuration
 */
export declare const ToolConfiguration: S.Schema<{
    [x: `client_name#${string}`]: string;
    [x: `client_uri#${string}`]: string;
    [x: `tos_uri#${string}`]: string;
    [x: `policy_uri#${string}`]: string;
    readonly jwks_uri: string;
    readonly application_type: "web";
    readonly grant_types: readonly ["client_credentials", "implicit"] | readonly ["implicit", "client_credentials"];
    readonly response_types: readonly string[];
    readonly redirect_uris: readonly string[];
    readonly initiate_login_uri: string;
    readonly token_endpoint_auth_method: "private_key_jwt";
    readonly "https://purl.imsglobal.org/spec/lti-tool-configuration": {
        readonly target_link_uri: string;
        readonly custom_parameters: {
            readonly [x: string]: string;
        };
        readonly domain: string;
        readonly description: string;
        readonly messages: readonly {
            readonly type: string;
            readonly target_link_uri: string;
            readonly label: string;
            readonly custom_parameters: {
                readonly [x: string]: string;
            };
        }[];
        readonly claims: readonly string[];
        readonly secondary_domains?: readonly string[];
        readonly deployment_id?: string;
    };
    readonly scope: string;
    readonly logo_uri?: string;
    readonly contacts?: readonly string[];
    readonly client_name: string;
    readonly client_uri: string;
    readonly tos_uri: string;
    readonly policy_uri: string;
}>;
export type ToolConfiguration = S.Infer<typeof ToolConfiguration>;
//# sourceMappingURL=ToolConfiguration.d.ts.map
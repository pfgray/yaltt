import * as S from "@fp-ts/schema";
export declare const LtiToolConfiguration: S.Schema<{
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
}>;
//# sourceMappingURL=LtiToolConfiguration.d.ts.map
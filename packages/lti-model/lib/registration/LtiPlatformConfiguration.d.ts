import * as S from "@fp-ts/schema";
export declare const LtiPlatformConfiguration: S.Schema<{
    readonly product_family_code: string;
    readonly version: string;
    readonly messages_supported: readonly string[];
    readonly variables?: readonly string[];
}>;
export declare const LtiSupportedMessage: S.Schema<{
    readonly type: string;
    readonly placements: readonly string[];
}>;
//# sourceMappingURL=LtiPlatformConfiguration.d.ts.map
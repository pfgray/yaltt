import * as S from "@fp-ts/schema";
export declare const LtiMessage: S.Schema<{
    readonly type: string;
    readonly target_link_uri: string;
    readonly label: string;
    readonly custom_parameters: {
        readonly [x: string]: string;
    };
}>;
//# sourceMappingURL=LtiMessage.d.ts.map
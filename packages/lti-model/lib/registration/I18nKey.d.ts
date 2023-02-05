import * as S from "@fp-ts/schema";
export declare const I18nKey: <K extends string>(k: K) => S.Schema<S.Spread<{ readonly [k in K]: string; } & { readonly [k_1 in `${K}#${string}`]: string; }>>;
//# sourceMappingURL=I18nKey.d.ts.map
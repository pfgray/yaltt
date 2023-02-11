import * as S from "@fp-ts/schema";

export const CustomParameters = S.record(S.string, S.string);

export interface CustomParameters extends S.Infer<typeof CustomParameters> {}

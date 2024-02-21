import * as S from "@effect/schema/Schema";

export const CustomParameters = S.record(S.string, S.string);

export interface CustomParameters
  extends S.Schema.To<typeof CustomParameters> {}

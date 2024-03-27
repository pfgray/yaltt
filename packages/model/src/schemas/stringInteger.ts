import * as S from "@effect/schema/Schema";

export const stringToInteger: S.Schema<number, string> =
  S.NumberFromString.pipe(S.int());

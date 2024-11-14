import * as S from "@effect/schema/Schema";

export const DateFromStringOrDate = S.union(S.ValidDateFromSelf, S.Date);

import * as S from "@effect/schema/Schema";

export const UserIdentityClaim = S.struct({
  sub: S.optional(S.string),
  name: S.optional(S.string),
  given_name: S.optional(S.string),
  family_name: S.optional(S.string),
  middle_name: S.optional(S.string),
  email: S.optional(S.string),
  locale: S.optional(S.string),
});

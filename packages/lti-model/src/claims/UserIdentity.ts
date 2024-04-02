import * as S from "@effect/schema/Schema";
import { Option, pipe } from "effect";
import { UserId } from "../user/UserId";

export const UserIdentityClaim = S.struct({
  sub: S.optional(UserId),
  name: S.optional(S.string),
  given_name: S.optional(S.string),
  family_name: S.optional(S.string),
  middle_name: S.optional(S.string),
  email: S.optional(S.string),
  locale: S.optional(S.string),
});

export type UserIdentityClaim = S.Schema.To<typeof UserIdentityClaim>;

export const extractUserIdentityClaim = (
  obj: unknown
): Option.Option<UserIdentityClaim> =>
  pipe(
    S.decodeOption(UserIdentityClaim)(obj as any, {
      onExcessProperty: "ignore",
    })
  );

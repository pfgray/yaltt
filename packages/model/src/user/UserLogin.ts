import * as S from "@effect/schema/Schema";

export const GoogleLogin = S.struct({
  _tag: S.literal("google"),
  displayName: S.string,
  email: S.string,
  picture: S.string,
});
export type GoogleLogin = S.Schema.To<typeof GoogleLogin>;

export const PasswordLogin = S.struct({
  _tag: S.literal("password"),
  username: S.string,
});

export type PasswordLogin = S.Schema.To<typeof PasswordLogin>;

export const UserLogin = S.union(GoogleLogin, PasswordLogin);
export type UserLogin = S.Schema.To<typeof UserLogin>;

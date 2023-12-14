import * as S from "@effect/schema/Schema";

export const PasswordLogin = S.struct({
  tag: S.literal("password_login"),
  username: S.string,
});

export const passwordUser = (
  id: number,
  username: string,
  role: "admin" | "user"
): User =>
  ({
    id,
    role,
    login: {
      tag: "password_login",
      username,
    },
  } as const);

export const GoogleProfile = S.struct({
  displayName: S.string,
  email: S.string,
  picture: S.optional(S.string),
});

export const GoogleLogin = S.struct({
  tag: S.literal("google_login"),
  googleId: S.string,
  profile: GoogleProfile,
});

export const googleUser = (
  id: number,
  googleId: string,
  profile: S.To<typeof GoogleProfile>,
  role: "admin" | "user"
): User =>
  ({
    id,
    role,
    login: {
      tag: "google_login",
      googleId,
      profile,
    },
  } as const);

export const Login = S.union(PasswordLogin, GoogleLogin);

export const User = S.struct({
  id: S.number,
  role: S.literal("admin", "user"),
  login: Login,
});

export type User = S.To<typeof User>;

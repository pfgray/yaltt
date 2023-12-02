import * as S from "@effect/schema/Schema";

export const PasswordLogin = S.struct({
  tag: S.literal("password_login"),
  username: S.string,
});

export const passwordUser = (id: number, username: string, role: 'admin' | 'user'): User =>
  ({
    id,
    role,
    login: {
      tag: "password_login",
      username,
    },
  } as const);

export const Login = S.union(PasswordLogin);

export const User = S.struct({
  id: S.number,
  role: S.literal("admin", "user"),
  login: Login,
});

export type User = S.To<typeof User>;

import * as S from "@effect/schema/Schema";

export const PasswordLogin = S.struct({
  tag: S.literal("password_login"),
  username: S.string,
});

export const passwordUser = (id: number, username: string): User =>
  ({
    id,
    login: {
      tag: "password_login",
      username,
    },
  } as const);

export const Login = S.union(PasswordLogin);

export const User = S.struct({
  id: S.number,
  login: Login,
});

export type User = S.To<typeof User>;

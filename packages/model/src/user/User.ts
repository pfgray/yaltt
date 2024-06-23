import * as S from "@effect/schema/Schema";
import { GoogleLogin, PasswordLogin, UserLogin } from "./UserLogin";

export const YalttUserId = S.number.pipe(S.brand("UserId"));

export type YalttUserId = S.Schema.To<typeof YalttUserId>;

export const YalttUser = S.struct({
  id: YalttUserId,
  role: S.literal("admin", "user"),
  created: S.Date,
  login: UserLogin,
});

export type YalttUser = S.Schema.To<typeof YalttUser>;

export const googleUser = (opts: {
  id: YalttUserId;
  role: "admin" | "user";
  created: Date;
  login: Omit<GoogleLogin, "_tag">;
}): YalttUser => ({
  ...opts,
  login: {
    ...opts.login,
    _tag: "google",
  },
});

export const passwordUser = (opts: {
  id: YalttUserId;
  role: "admin" | "user";
  created: Date;
  login: Omit<PasswordLogin, "_tag">;
}): YalttUser => ({
  ...opts,
  login: {
    ...opts.login,
    _tag: "password",
  },
});

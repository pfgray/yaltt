import * as Eff from "@effect/io/Effect";
import * as S from "@fp-ts/schema";
import { buffer } from "../lib/BufferSchema";
import { query1 } from "../db/db";
import { pipe } from "@fp-ts/core/Function";
import { hashPassword } from "../crypto/hash";
import { passwordUser } from "@yaltt/model";

const UserRow = S.struct({
  id: S.number,
  logins: S.unknown,
  created: S.date,
});

const PasswordLoginRow = S.struct({
  user_id: S.number,
  username: S.string,
  hashed_password: buffer,
  salt: buffer,
});

export const getLoginByUsername = (username: string) =>
  query1(
    S.struct({
      id: S.number,
      username: S.string,
      hashed_password: buffer,
      salt: buffer,
    })
  )(
    "select id, username, hashed_password, salt from users u join password_logins pl on pl.user_id = u.id where pl.username = $1;",
    [username]
  );

export const addUserWithLocalPassword = (username: string, password: string) =>
  pipe(
    Eff.Do(),
    Eff.bind("pw", () => hashPassword(password)),
    Eff.bind("user", () =>
      query1(UserRow)(
        "insert into users (logins) values ('{}'::jsonb) returning *",
        []
      )
    ),
    Eff.bind("passwordLogin", ({ user, pw }) =>
      query1(PasswordLoginRow)(
        "insert into password_logins (user_id, username, hashed_password, salt) values ($1, $2, $3, $4) returning *",
        [user.id, username, pw.hashedPassword, pw.salt]
      )
    ),
    Eff.map(({ user }) => passwordUser(user.id, username))
  );

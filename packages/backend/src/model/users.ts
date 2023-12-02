import { pipe, Effect, Option, ReadonlyArray } from "effect";
import * as S from "@effect/schema/Schema";
import { buffer } from "../util/BufferSchema";
import { query, query1, toOption } from "../db/db";

import { hashPassword } from "../crypto/hash";
import { passwordUser } from "@yaltt/model";

const UserRow = S.struct({
  id: S.number,
  logins: S.unknown,
  role: S.literal("admin", "user"),
  created: S.ValidDateFromSelf,
});

const PasswordLoginRow = S.struct({
  user_id: S.number,
  username: S.string,
  hashed_password: buffer,
  salt: buffer,
});

export const getAllUsers = () =>
  pipe(
    query(S.struct({
      id: S.number,
      role: S.literal("admin", "user"),
      created: S.ValidDateFromSelf,
      pl_username: S.string,
    }))(
      `
      select
        u.id as id, u.created as created, u.role as role,
        pl.username as pl_username
      from users u
        join password_logins pl on pl.user_id = u.id
      `,
      []
    ),
    Effect.map(ReadonlyArray.map((result) => ({
      id: result.id,
      created: result.created,
      role: result.role,
      login: { tag: "password_login" as const, username: result.pl_username },
    })))
  )

export const getUserById = (id: number) =>
  pipe(
    query1(UserRow)(
      "select id, logins, role, created from users where id = $1;",
      [id]
    ),
    Effect.map((result) => ({
      id: result.id,
      created: result.created,
      role: result.role,
      logins: result.logins,
    }))
  )

export const getPasswordLoginUserById = (id: number) =>
  pipe(
    query1(
      S.struct({
        id: S.number,
        role: S.literal("admin", "user"),
        created: S.ValidDateFromSelf,
        pl_username: S.string,
      })
    )(
      `
      select
        u.id as id, u.created as created, u.role as role,
        pl.username as pl_username
      from users u
        join password_logins pl on pl.user_id = u.id
      where u.id = $1;
      `,
      [id]
    ),
    Effect.map((result) => ({
      id: result.id,
      created: result.created,
      role: result.role,
      login: { tag: "password_login" as const, username: result.pl_username },
    }))
  );

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

export const addOrUpdateUserWithLocalPassword = (username: string, password: string, role: 'admin' | 'user') => {
  return pipe(
    Effect.succeed({}),
    Effect.bind("passwordLogin", () => pipe(
      getLoginByUsername(username),
      toOption,
      Effect.flatMap(Option.match({
        onNone: () => addUserWithLocalPassword(username, password, role),
        onSome: (login) => pipe(
          getUserById(login.id),
          Effect.flatMap(user => 
            updateLocalPasswordForUser(user, username, password)
          )
        )
      }))
    )),
  );
}

export const updateLocalPasswordForUser = (user: S.To<typeof UserRow>, username: string, pw: string) =>
  pipe(
    Effect.succeed({}),
    Effect.bind("pw", () => hashPassword(pw)),
    Effect.bind("passwordLogin", ({ pw }) =>
      query1(PasswordLoginRow)(
        "update password_logins set hashed_password = $2, salt = $3 where user_id = $1 returning *",
        [user.id, pw.hashedPassword, pw.salt]
      )
    ),
    Effect.map(() => passwordUser(user.id, username, user.role))
  )

export const addLocalPasswordForUser = (userId: number, username: string, password: string) =>
  pipe(
    Effect.succeed({}),
    Effect.bind("pw", () => hashPassword(password)),
    Effect.bind("passwordLogin", ({ pw }) =>
      query1(PasswordLoginRow)(
        "insert into password_logins (user_id, username, hashed_password, salt) values ($1, $2, $3, $4) returning *",
        [userId, username, pw.hashedPassword, pw.salt]
      )
    )
  )

export const addUserWithLocalPassword = (username: string, password: string, role: 'admin' | 'user' = 'user') =>
  pipe(
    Effect.succeed({}),
    Effect.bind("user", () =>
      query1(UserRow)(
        "insert into users (logins, role) values ('{}'::jsonb, $1) returning *",
        [role]
      )
    ),
    Effect.bind('passwordLogin', ({user}) => addLocalPasswordForUser(user.id, username, password)),
    Effect.map(({ user }) => passwordUser(user.id, username, user.role))
  );

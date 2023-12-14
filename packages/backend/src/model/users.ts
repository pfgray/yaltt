import { pipe, Effect, Option, ReadonlyArray } from "effect";
import * as S from "@effect/schema/Schema";
import { buffer } from "../util/BufferSchema";
import { query, query1, toOption } from "../db/db";

import { hashPassword } from "../crypto/hash";
import { passwordUser, googleUser } from "@yaltt/model";

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

const GoogleLoginRow = S.struct({
  user_id: S.number,
  profile: S.unknown,
  google_id: S.string,
});

export const getAllUsers = () =>
  pipe(
    query(
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
      `,
      []
    ),
    Effect.map(
      ReadonlyArray.map((result) => ({
        id: result.id,
        created: result.created,
        role: result.role,
        login: { tag: "password_login" as const, username: result.pl_username },
      }))
    )
  );

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
  );

export const getUserWithLoginById = (id: number) =>
  pipe(
    getPasswordLoginUserById(id),
    toOption,
    Effect.flatMap(
      Option.match({
        onNone: () => getGoogleLoginUserById(id),
        onSome: (user) => Effect.succeed(user),
      })
    )
  );

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

export const getUserByGoogleProfileId = (googleProfileId: string) =>
  query1(
    S.struct({
      id: S.number,
      google_id: S.string,
      profile: S.unknown,
    })
  )(
    `
    select
      u.id,
      gl.google_id,
      gl.profile
    from users u 
      join google_logins gl
        on gl.user_id = u.id
    where gl.google_id = $1;`,
    [googleProfileId]
  );

export const addOrUpdateUserWithLocalPassword = (
  username: string,
  password: string,
  role: "admin" | "user"
) => {
  return pipe(
    Effect.succeed({}),
    Effect.bind("passwordLogin", () =>
      pipe(
        getLoginByUsername(username),
        toOption,
        Effect.flatMap(
          Option.match({
            onNone: () => addUserWithLocalPassword(username, password, role),
            onSome: (login) =>
              pipe(
                getUserById(login.id),
                Effect.flatMap((user) =>
                  updateLocalPasswordForUser(user, username, password)
                )
              ),
          })
        )
      )
    )
  );
};

export const updateLocalPasswordForUser = (
  user: S.To<typeof UserRow>,
  username: string,
  pw: string
) =>
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
  );

export const addLocalPasswordForUser = (
  userId: number,
  username: string,
  password: string
) =>
  pipe(
    Effect.succeed({}),
    Effect.bind("pw", () => hashPassword(password)),
    Effect.bind("passwordLogin", ({ pw }) =>
      query1(PasswordLoginRow)(
        "insert into password_logins (user_id, username, hashed_password, salt) values ($1, $2, $3, $4) returning *",
        [userId, username, pw.hashedPassword, pw.salt]
      )
    )
  );

export const addUserWithLocalPassword = (
  username: string,
  password: string,
  role: "admin" | "user" = "user"
) =>
  pipe(
    Effect.succeed({}),
    Effect.bind("user", () =>
      query1(UserRow)(
        "insert into users (logins, role) values ('{}'::jsonb, $1) returning *",
        [role]
      )
    ),
    Effect.bind("passwordLogin", ({ user }) =>
      addLocalPasswordForUser(user.id, username, password)
    ),
    Effect.map(({ user }) => passwordUser(user.id, username, user.role))
  );

export const addGoogleLoginForUser = (
  userId: number,
  googleId: string,
  profile: unknown
) =>
  query1(GoogleLoginRow)(
    `
    insert into google_logins
      (user_id, google_id, profile)
    values ($1, $2, $3) returning *`,
    [userId, googleId, profile]
  );

export const updateGoogleLoginForUser = (googleId: string, profile: unknown) =>
  query1(GoogleLoginRow)(
    `
    update google_logins
      set profile = $2
    where google_id = $1
    returning *`,
    [googleId, profile]
  );

export const addUserWithGoogleLogin = (
  googleId: string,
  profile: unknown,
  role: "admin" | "user" = "user"
) =>
  pipe(
    Effect.succeed({}),
    Effect.bind("user", () =>
      query1(UserRow)(
        "insert into users (logins, role) values ('{}'::jsonb, $1) returning *",
        [role]
      )
    ),
    Effect.bind("google", ({ user }) =>
      addGoogleLoginForUser(user.id, googleId, profile)
    ),
    Effect.map(({ user, google }) =>
      googleUser(user.id, google.google_id, google.profile, user.role)
    )
  );

export const addOrUpdateUserWithGoogleProfile = (
  googleId: string,
  profile: unknown,
  role: "admin" | "user" = "user"
) =>
  pipe(
    getUserByGoogleProfileId(googleId),
    toOption,
    Effect.flatMap(
      Option.match({
        onNone: () => addUserWithGoogleLogin(googleId, profile, role),
        onSome: (login) =>
          pipe(
            getUserById(login.id),
            Effect.bindTo("user"),
            Effect.bind("googleLogin", ({ user }) =>
              updateGoogleLoginForUser(login.google_id, profile)
            ),
            Effect.map(({ user, googleLogin }) =>
              googleUser(
                user.id,
                googleLogin.google_id,
                googleLogin.profile,
                role
              )
            )
          ),
      })
    )
  );

export const getGoogleLoginUserById = (id: number) =>
  pipe(
    query1(
      S.struct({
        id: S.number,
        role: S.literal("admin", "user"),
        created: S.ValidDateFromSelf,
        profile: S.unknown,
        google_id: S.string,
      })
    )(
      `
    select
      u.id as id, u.created as created, u.role as role,
      gl.google_id as google_id,
      gl.profile as profile
    from users u
      join google_logins gl on gl.user_id = u.id
    where u.id = $1;
    `,
      [id]
    ),
    Effect.map((result) =>
      googleUser(id, result.google_id, result.profile, result.role)
    )
  );

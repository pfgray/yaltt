import { pipe, Effect, Option, ReadonlyArray } from "effect";
import * as S from "@effect/schema/Schema";
import { buffer } from "../util/BufferSchema";
import { dataIntegrityError, query, query1, toOption } from "../db/db";

import { hashPassword } from "../crypto/hash";
import {
  passwordUser,
  googleUser,
  YalttUserId,
  GoogleProfile,
  YalttUser,
} from "@yaltt/model";

const UserRow = S.struct({
  id: YalttUserId,
  role: S.literal("admin", "user"),
  created: S.ValidDateFromSelf,
  _tag: S.literal("password", "google"),
  picture: S.nullable(S.string),
  display_name: S.nullable(S.string),
  email: S.nullable(S.string),
  username: S.nullable(S.string),
});

export type UserRow = S.Schema.To<typeof UserRow>;

export const convertUser = (u: UserRow) => {
  if (u._tag === "password" && u.username) {
    return Effect.succeed(
      passwordUser({
        ...u,
        login: {
          username: u.username,
        },
      })
    );
  } else if (u._tag === "google" && u.picture && u.display_name && u.email) {
    return Effect.succeed(
      googleUser({
        ...u,
        login: {
          picture: u.picture,
          email: u.email,
          displayName: u.display_name,
        },
      })
    );
  } else {
    return Effect.fail(
      dataIntegrityError(`Invalid user login data. ${u.id}, ${u._tag}`)
    );
  }
};

export const getAllUsers = () =>
  pipe(
    query(UserRow)(
      `
        select
          users.id,
          user_logins._tag,
          user_logins.picture,
          user_logins.display_name,
          user_logins.email,
          user_logins.username,
          users.created,
          users.role

        from (

          select
            user_id,
            'google' as _tag,
            profile -> 'picture' as picture,
            profile -> 'displayName' as display_name,
            profile -> 'email' as email,
            null as username
          from google_logins

          union

          select
            user_id,
            'password' as _tag,
            null as picture,
            null as display_name,
            null as email,
            username
          from password_logins

        ) as user_logins
        join users on user_logins.user_id = users.id;
      `,
      []
    ),
    Effect.flatMap(Effect.forEach(convertUser))
  );

export const getUserWithLoginById = (id: YalttUserId) =>
  pipe(
    query1(UserRow)(
      `
      select
        users.id,
        user_logins._tag,
        user_logins.picture,
        user_logins.display_name,
        user_logins.email,
        user_logins.username,
        users.created,
        users.role

      from (

        select
          user_id,
          'google' as _tag,
          profile -> 'picture' as picture,
          profile -> 'displayName' as display_name,
          profile -> 'email' as email,
          null as username
        from google_logins

        union

        select
          user_id,
          'password' as _tag,
          null as picture,
          null as display_name,
          null as email,
          username
        from password_logins

      ) as user_logins
      join users on user_logins.user_id = users.id
      where users.id = $1;`,
      [id]
    ),
    Effect.flatMap(convertUser)
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
      login: { _tag: "password_login" as const, username: result.pl_username },
    }))
  );

export const getLoginByUsername = (username: string) =>
  query1(
    S.struct({
      id: YalttUserId,
      username: S.string,
      hashed_password: buffer,
      salt: buffer,
    })
  )(
    "select id, username, hashed_password, salt from users u join password_logins pl on pl.user_id = u.id where pl.username = $1;",
    [username]
  );

export const getUserByGoogleProfileId = (googleProfileId: string) =>
  query1(GoogleLoginRow)(
    `
    select
      u.id as user_id,
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
                getUserWithLoginById(login.id),
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

const PasswordLoginRow = S.struct({
  user_id: S.number,
  username: S.string,
  hashed_password: buffer,
  salt: buffer,
});

export const updateLocalPasswordForUser = (
  user: YalttUser,
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
    Effect.map(() =>
      passwordUser({
        ...user,
        login: { username },
      })
    )
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
      query1(
        S.struct({
          id: YalttUserId,
          role: S.literal("admin", "user"),
          created: S.ValidDateFromSelf,
        })
      )(
        "insert into users (logins, role) values ('{}'::jsonb, $1) returning *",
        [role]
      )
    ),
    Effect.bind("passwordLogin", ({ user }) =>
      addLocalPasswordForUser(user.id, username, password)
    ),
    Effect.map(({ user }) =>
      passwordUser({
        ...user,
        login: { username },
      })
    )
  );

const GoogleLoginRow = S.struct({
  user_id: YalttUserId,
  profile: GoogleProfile,
  google_id: S.string,
});

export const addGoogleLoginForUser = (
  userId: number,
  googleId: string,
  profile: GoogleProfile
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
  profile: GoogleProfile,
  role: "admin" | "user" = "user"
) =>
  pipe(
    Effect.succeed({}),
    Effect.bind("user", () =>
      query1(
        S.struct({
          id: YalttUserId,
          role: S.literal("admin", "user"),
          created: S.ValidDateFromSelf,
        })
      )(
        "insert into users (logins, role) values ('{}'::jsonb, $1) returning *",
        [role]
      )
    ),
    Effect.bind("google", ({ user }) =>
      addGoogleLoginForUser(user.id, googleId, profile)
    ),
    Effect.map(({ user, google }) =>
      googleUser({
        ...user,
        login: {
          displayName: google.profile.displayName,
          email: google.profile.email,
          picture: google.profile.picture,
        },
      })
    )
  );

export const addOrUpdateUserWithGoogleProfile = (
  googleId: string,
  profile: GoogleProfile,
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
            getUserWithLoginById(login.user_id),
            Effect.bindTo("user"),
            Effect.bind("googleLogin", ({ user }) =>
              updateGoogleLoginForUser(login.google_id, profile)
            ),
            Effect.map(({ user, googleLogin }) =>
              googleUser({
                ...user,
                login: {
                  displayName: googleLogin.profile.displayName,
                  email: googleLogin.profile.email,
                  picture: googleLogin.profile.picture,
                },
              })
            )
          ),
      })
    )
  );

export const getGoogleLoginUserById = (id: number) =>
  pipe(
    query1(
      S.struct({
        id: YalttUserId,
        role: S.literal("admin", "user"),
        created: S.ValidDateFromSelf,
        profile: GoogleProfile,
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
      googleUser({
        ...result,
        login: {
          displayName: result.profile.displayName,
          email: result.profile.email,
          picture: result.profile.picture,
        },
      })
    )
  );

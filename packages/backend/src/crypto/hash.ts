import * as crypto from "crypto";

import { pipe, Effect, Option, Either } from "effect";

export interface HashError {
  _tag: "hash_error";
  cause: Error;
}

export const pbkdf2_ = (
  password: crypto.BinaryLike,
  salt: crypto.BinaryLike,
  iterations: number,
  keylen: number,
  digest: string
) =>
  pipe(
    Effect.async<Buffer, Error, never>((resume) => {
      crypto.pbkdf2(
        password,
        salt,
        iterations,
        keylen,
        digest,
        (err, derivedKey) => {
          if (err) {
            resume(Effect.fail(err));
          } else {
            resume(Effect.succeed(derivedKey));
          }
        }
      );
    }),
    Effect.mapError((cause): HashError => ({ _tag: "hash_error", cause }))
  );

export interface InvalidPassword {
  _tag: "invalid_password";
}

/**
 * Hashes a password, with a given salt
 * @param password
 */
export const hashPasswordWithSalt = (password: string, salt: Buffer) =>
  pbkdf2_(password, salt, 310000, 32, "sha256");

/**
 * Hashes a password, returning the hashed password and salt
 * @param password
 */
export const hashPassword = (password: string) =>
  pipe(
    Effect.succeed({ salt: crypto.randomBytes(16) }),
    Effect.bind("hashedPassword", ({ salt }) =>
      hashPasswordWithSalt(password, salt)
    )
  );

export const validatePassword = (
  password: string,
  salt: Buffer,
  hashed: Buffer
) =>
  pipe(
    hashPasswordWithSalt(password, salt),
    Effect.flatMap((hashedPassword) => {
      if (!crypto.timingSafeEqual(hashedPassword, hashed)) {
        return Effect.fail<InvalidPassword>({ _tag: "invalid_password" });
      } else {
        return Effect.succeed({});
      }
    })
  );

import * as crypto from "crypto";
import { pipe } from "@fp-ts/core/Function";
import * as Eff from "@effect/io/Effect";

export interface HashError {
  tag: "hash_error";
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
    Eff.async<never, Error, Buffer>((resume) => {
      crypto.pbkdf2(
        password,
        salt,
        iterations,
        keylen,
        digest,
        (err, derivedKey) => {
          if (err) {
            resume(Eff.fail(err));
          } else {
            resume(Eff.succeed(derivedKey));
          }
        }
      );
    }),
    Eff.mapError((cause): HashError => ({ tag: "hash_error", cause }))
  );

export interface InvalidPassword {
  tag: "invalid_password";
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
    Eff.Do(),
    Eff.bindValue("salt", () => crypto.randomBytes(16)),
    Eff.bind("hashedPassword", ({ salt }) =>
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
    Eff.flatMap((hashedPassword) => {
      if (!crypto.timingSafeEqual(hashedPassword, hashed)) {
        return Eff.fail<InvalidPassword>({ tag: "invalid_password" });
      } else {
        return Eff.succeed({});
      }
    })
  );

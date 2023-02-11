import * as crypto from "crypto";
import { pipe } from "@fp-ts/core/Function";
import * as Eff from "@effect/io/Effect";
import * as jsonwebtoken from "jsonwebtoken";
import * as Context from "@fp-ts/data/Context";

export interface KeyError {
  tag: "key_error";
  error: Error;
}

export interface KeyService {
  generateKeyPair: () => Eff.Effect<
    never,
    KeyError,
    {
      publicKey: Buffer;
      privateKey: Buffer;
    }
  >;
  sign: (input: {}, privateKey: Buffer) => string;
  verify: (
    input: string,
    publicKey: Buffer
  ) => string | jsonwebtoken.JwtPayload;
}

export const KeyService = Context.Tag<KeyService>();

export const generateKeyPair = Eff.serviceWithEffect(
  KeyService,
  ({ generateKeyPair }) => generateKeyPair()
);

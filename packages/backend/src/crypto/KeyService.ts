import { Effect, Context } from "effect";
import * as jsonwebtoken from "jsonwebtoken";
import { PublicJwk } from "lti-model";

export interface KeyError {
  _tag: "key_error";
  error?: unknown;
}

export type KeyServiceInterface = {
  generateKeyPair: () => Effect.Effect<
    {
      publicKey: Buffer;
      privateKey: Buffer;
    },
    KeyError,
    never
  >;
  sign: (
    input: unknown,
    privateKey: Buffer,
    options?: jsonwebtoken.SignOptions
  ) => string;
  verify: (
    input: string,
    publicKey: Buffer
  ) => string | jsonwebtoken.JwtPayload;
  exportPublickKeyJWK: (
    b: Buffer
  ) => Effect.Effect<Omit<PublicJwk, "kid">, KeyError, never>;
};

export class KeyService extends Context.Tag("KeyService")<
  KeyService,
  KeyServiceInterface
>() {}

export const generateKeyPair = KeyService.pipe(
  Effect.flatMap(({ generateKeyPair }) => generateKeyPair())
);

export const exportPublicKeyJWK = (b: Buffer) =>
  KeyService.pipe(
    Effect.flatMap(({ exportPublickKeyJWK }) => exportPublickKeyJWK(b))
  );

export const signJwt = (
  input: {},
  privateKey: Buffer,
  options?: jsonwebtoken.SignOptions
) =>
  KeyService.pipe(Effect.map(({ sign }) => sign(input, privateKey, options)));

import { Effect, Context } from "effect";
import * as jsonwebtoken from "jsonwebtoken";

export interface KeyError {
  tag: "key_error";
  error?: unknown;
}

export interface KeyService {
  generateKeyPair: () => Effect.Effect<
    never,
    KeyError,
    {
      publicKey: Buffer;
      privateKey: Buffer;
    }
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
  ) => Effect.Effect<never, KeyError, Record<string, unknown>>;
}

export const KeyService = Context.Tag<KeyService>();

export const generateKeyPair = KeyService.pipe(
  Effect.flatMap(({ generateKeyPair }) => generateKeyPair())
);

export const exportPublickKeyJWK = (b: Buffer) =>
  KeyService.pipe(
    Effect.flatMap(({ exportPublickKeyJWK }) => exportPublickKeyJWK(b))
  );

export const signJwt = (
  input: {},
  privateKey: Buffer,
  options?: jsonwebtoken.SignOptions
) =>
  KeyService.pipe(Effect.map(({ sign }) => sign(input, privateKey, options)));

import * as crypto from "crypto";
import * as Eff from "@effect/io/Effect";
import * as jsonwebtoken from "jsonwebtoken";
import { KeyError, KeyService } from "./KeyService";

const generateKeyPair: KeyService["generateKeyPair"] = () =>
  Eff.async((resume) => {
    crypto.generateKeyPair(
      "rsa",
      {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: "spki",
          format: "der",
        },
        privateKeyEncoding: {
          type: "pkcs1",
          format: "der",
        },
      },
      (err, publicKey, privateKey) => {
        if (err) {
          resume(Eff.fail({ tag: "key_error", error: err }));
        } else {
          resume(Eff.succeed({ publicKey, privateKey }));
        }
      }
    );
  });

const sign: KeyService["sign"] = (input: {}, privateKey: Buffer) =>
  jsonwebtoken.sign(input, privateKey, { algorithm: "RS256" });

const verify: KeyService["verify"] = (input: string, publicKey: Buffer) =>
  jsonwebtoken.verify(input, publicKey, { algorithms: ["RS256"] });

const exportPublickKeyJWK = (
  publicKey: Buffer
): Eff.Effect<never, KeyError, Record<string, unknown>> =>
  Eff.tryCatch(
    () =>
      crypto
        .createPublicKey({
          format: "der",
          key: publicKey,
          type: "spki",
        })
        .export({
          format: "jwk",
        }),
    (error) => ({
      tag: "key_error",
      error,
    })
  );

export const provideRsaKeyService = Eff.provideService(KeyService, {
  generateKeyPair,
  sign,
  verify,
  exportPublickKeyJWK,
});

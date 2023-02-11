import * as crypto from "crypto";
import { pipe } from "@fp-ts/core/Function";
import * as Eff from "@effect/io/Effect";
import * as jsonwebtoken from "jsonwebtoken";
import { KeyService } from "./KeyService";

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
          type: "pkcs8",
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

export const provideRsaKeyService = Eff.provideService(KeyService, {
  generateKeyPair,
  sign,
  verify,
});

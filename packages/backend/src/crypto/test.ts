import * as crypto from "crypto";

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
    if (!err) {
      console.log("success!");
      console.log(
        crypto
          .createPublicKey({
            format: "der",
            key: publicKey,
            type: "spki",
          })
          .export({
            format: "jwk",
          })
      );
    } else {
      console.log("erroar", err);
    }
  }
);

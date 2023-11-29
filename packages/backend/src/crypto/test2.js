const crypto = require("crypto");

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
      console.log('error:', err)
    } else {
      console.log('computed:', 
        jsonwebtoken.sign(
          {foo: 'bar'},
            crypto.createPrivateKey({
              key: privateKey,
              format: "der",
              type: "pkcs1",
              
            }),
//           crypto.createPrivateKey(`
// -----BEGIN RSA PRIVATE KEY-----
// ${privateKey.toString("base64")}
// -----END RSA PRIVATE KEY-----
//           `),
          {
            algorithm: "RS256",
          }
        )
      )
    }
  }
);
import * as crypto from "crypto";
import { Effect, Option, pipe } from "effect";

import { signJwt } from "../crypto/KeyService";
import { getKeyForRegistrationId } from "../model/entities/keys";
import { RegistrationRow } from "../model/entities/registrations";

export const signJwtPayloadForRegistration =
  (registration: RegistrationRow) => (payload: {}) =>
    pipe(
      getKeyForRegistrationId(registration.id),
      Effect.bindTo("key"),
      Effect.bind("token", ({ key }) => {
        console.log(
          "signing jwt with iss: ",
          registration.platform_configuration.issuer
        );
        return signJwt(payload, key.private_key, {
          expiresIn: "1h",
          audience: registration.platform_configuration.issuer,
          issuer: Option.getOrUndefined(registration.client_id),
          subject: Option.getOrUndefined(registration.client_id),
          keyid: key.id.toString(),
          jwtid: crypto.randomBytes(16).toString("hex"),
        });
      }),
      Effect.map(({ token }) => token)
    );

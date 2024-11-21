import * as crypto from "crypto";
import { Effect, Option, pipe } from "effect";
import { Registration } from "@yaltt/model";
import { Fetch } from "../fetch/FetchService";
import { getKeyForRegistrationId } from "../model/entities/keys";
import { signJwt } from "../crypto/KeyService";
import { LtiToken } from "lti-model";
import { schemaParse } from "../schemaParse";
import { Headers } from "node-fetch";

/**
 * Fetches a token from the platform's token endpoint.
 * @param registration
 * @param deployment_id
 * @returns
 */
export const fetchToken = (
  registration: Registration,
  scopes: ReadonlyArray<string>,
  deployment_id?: string
) =>
  pipe(
    getKeyForRegistrationId(registration.id),
    Effect.bindTo("key"),
    Effect.bind("token", ({ key }) =>
      signJwt(
        deployment_id
          ? {
              "https://purl.imsglobal.org/spec/lti/claim/deployment_id":
                deployment_id,
            }
          : {},
        key.private_key,
        {
          expiresIn: "1h",
          audience: [registration.platform_configuration.token_endpoint],
          issuer: Option.getOrUndefined(registration.client_id),
          subject: Option.getOrUndefined(registration.client_id),
          keyid: key.id.toString(),
          jwtid: crypto.randomBytes(16).toString("hex"),
        }
      )
    ),
    Effect.flatMap(({ token }) => {
      const encodeQueryParams = (p: Record<string, string>) =>
        Object.entries(p)
          .map((kv) => kv.map(encodeURIComponent).join("="))
          .join("&");

      const params = {
        client_assertion_type:
          "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        client_assertion: token,
        grant_type: "client_credentials",
        scope: scopes.join(" "),
        ...pipe(
          registration.client_id,
          Option.map((client_id) => ({ client_id })),
          Option.getOrElse(() => ({}))
        ),
      };
      return Fetch.post(
        `${
          registration.platform_configuration.token_endpoint
        }?${encodeQueryParams(params)}`,
        undefined,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    }),
    Effect.flatMap(schemaParse(LtiToken))
    // Fetch.get(registration.platform_configuration.token_endpoint)
  );

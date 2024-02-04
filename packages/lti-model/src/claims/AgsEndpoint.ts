import * as S from "@effect/schema/Schema";
import { extractClaim } from "./extractClaim";

export const AgsEndpointClaimKey =
  "https://purl.imsglobal.org/spec/lti-ags/claim/endpoint";

export const AgsEndpointClaim = S.struct({
  [AgsEndpointClaimKey]: S.struct({
    lineitems: S.optional(S.string),
    lineitem: S.optional(S.string),
    scope: S.array(S.string),
  }),
});

export type AgsEndpointClaim = S.To<
  typeof AgsEndpointClaim
>[typeof AgsEndpointClaimKey];

export const extractAgsEndpointClaim = extractClaim(
  AgsEndpointClaim,
  AgsEndpointClaimKey
);

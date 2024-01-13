import * as S from "@effect/schema/Schema";
import { extractClaim } from "./extractClaim";

export const LtiVersionClaimKey =
  "https://purl.imsglobal.org/spec/lti/claim/version";

export const LtiVersionClaim = S.struct({
  [LtiVersionClaimKey]: S.string,
});

export const extractLtiVersionClaim = extractClaim(
  LtiVersionClaim,
  LtiVersionClaimKey
);

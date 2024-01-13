import * as S from "@effect/schema/Schema";
import { extractClaim } from "./extractClaim";

export const DeploymentIdClaimKey =
  "https://purl.imsglobal.org/spec/lti/claim/deployment_id";

export const DeploymentIdClaim = S.struct({
  [DeploymentIdClaimKey]: S.string,
});

export const extractDeploymentIdClaim = extractClaim(
  DeploymentIdClaim,
  DeploymentIdClaimKey
);

import * as S from "@effect/schema/Schema";

export const DeploymentIdClaim = S.struct({
  "https://purl.imsglobal.org/spec/lti/claim/deployment_id": S.string,
});

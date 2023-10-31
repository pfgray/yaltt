import * as S from "@effect/schema/Schema";

export const TargetLinkUriClaim = S.struct({
  "https://purl.imsglobal.org/spec/lti/claim/target_link_uri": S.string,
});

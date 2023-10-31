import * as S from "@effect/schema/Schema";

export const MessageTypeClaim = S.struct({
  "https://purl.imsglobal.org/spec/lti/claim/message_type": S.string,
});

import * as S from "@effect/schema/Schema";
import { extractClaim } from "./extractClaim";

export const MessageTypeClaimKey =
  "https://purl.imsglobal.org/spec/lti/claim/message_type";

export const MessageTypeClaim = S.struct({
  [MessageTypeClaimKey]: S.string,
});

export const extractMessageTypeClaim = extractClaim(
  MessageTypeClaim,
  MessageTypeClaimKey
);

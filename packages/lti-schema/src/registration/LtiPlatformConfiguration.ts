import * as S from "@fp-ts/schema";

const HttpsUrl = S.templateLiteral(S.literal("https://"), S.string);

export const LtiPlatformConfiguration = S.struct({
  product_family_code: S.string,
  version: S.string,
  messages_supported: S.array(S.string),
  variables: S.optional(S.array(S.string)),
});

export interface LtiPlatformConfiguration
  extends S.Infer<typeof LtiPlatformConfiguration> {}

export const LtiSupportedMessage = S.struct({
  type: S.string,
  placements: S.array(S.string),
});

export interface LtiSupportedMessage
  extends S.Infer<typeof LtiSupportedMessage> {}

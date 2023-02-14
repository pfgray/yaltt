export const OpenidClaims = {
  sub: "sub",
  iss: "iss",
  name: "name",
  given_name: "given_name",
  family_name: "family_name",
  nickname: "nickname",
  picture: "picture",
  email: "email",
  locale: "locale",
} as const;

export type OpenidClaim = typeof OpenidClaims[keyof typeof OpenidClaims];

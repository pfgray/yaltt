import { OpenidClaims } from "lti-model";

export const YalttClaims = {
  ...OpenidClaims,
};

export type YalttClaim = typeof YalttClaims[keyof typeof YalttClaims];

import { LtiMessageTypes } from "lti-model";

export const YalttMessageTypes = {
  ...LtiMessageTypes,
};

export type YalttMessageType =
  typeof YalttMessageTypes[keyof typeof YalttMessageTypes];

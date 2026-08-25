import * as S from "@effect/schema/Schema";
import { PlatformConfiguration } from "lti-model";
import type * as B from "effect/Brand";
import { AppId } from "../app/App";
import { DateFromStringOrDate } from "../lib/DateFromStringOrDate";

export type RegistrationId = number & B.Brand<"RegistrationId">;

export const RegistrationId = S.number.pipe(S.brand("RegistrationId"));

// Common fields shared by all registration types
const BaseRegistration = S.struct({
  id: RegistrationId,
  created: DateFromStringOrDate,
  app_id: AppId,
  custom_parameters: S.record(S.string, S.string),
});

// LTI 1.3 registration (manual or dynamic)
const Lti13Registration = BaseRegistration.pipe(
  S.extend(
    S.struct({
      type: S.union(S.literal("manual"), S.literal("dynamic")),
      client_id: S.optionFromNullable(S.string),
      platform_configuration: PlatformConfiguration,
      claims: S.array(S.string),
      scopes: S.array(S.string),
      registration_config_url: S.optionFromNullable(S.string),
      registration_client_uri: S.optionFromNullable(S.string),
    })
  )
);

// LTI 1.1 registration
const Lti11Registration = BaseRegistration.pipe(
  S.extend(
    S.struct({
      type: S.literal("lti11"),
      consumer_key: S.string,
      shared_secret: S.string,
    })
  )
);

// Discriminated union of all registration types
export const Registration = S.union(Lti13Registration, Lti11Registration);

export type Registration = S.Schema.To<typeof Registration>;
export type Lti13RegistrationType = S.Schema.To<typeof Lti13Registration>;
export type Lti11RegistrationType = S.Schema.To<typeof Lti11Registration>;

/**
 * Narrows a Lti 1.3 Registration
 * @param reg
 * @returns true if this registration is an Lti 1.3 Registration
 */
export const isLti13Registration = (
  reg: Registration
): reg is Lti13RegistrationType =>
  reg.type === "manual" || reg.type === "dynamic";

/**
 * Narrows an Lti 1.1 Registration
 * @param reg
 * @returns true if this registration is an Lti 1.1 Registration
 */
export const isLti11Registration = (
  reg: Registration
): reg is Lti11RegistrationType => reg.type === "lti11";

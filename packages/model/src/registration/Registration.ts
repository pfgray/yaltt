import * as S from "@effect/schema/Schema";
import { PlatformConfiguration } from "lti-model";
import { RegistrationType } from "./RegistrationType";
import type * as B from "effect/Brand";
import { AppId } from "../app/App";
import { DateFromStringOrDate } from "../lib/DateFromStringOrDate";

export type RegistrationId = number & B.Brand<"RegistrationId">;

export const RegistrationId = S.number.pipe(S.brand("RegistrationId"));

export const Registration = S.struct({
  id: RegistrationId,
  client_id: S.optionFromNullable(S.string),
  type: RegistrationType,
  created: DateFromStringOrDate,
  app_id: AppId,
  claims: S.array(S.string),
  scopes: S.array(S.string),
  custom_parameters: S.record(S.string, S.string),
  platform_configuration: PlatformConfiguration,
  registration_config_url: S.optionFromNullable(S.string),
});

export interface Registration extends S.Schema.To<typeof Registration> {}

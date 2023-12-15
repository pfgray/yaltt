import * as S from "@effect/schema/Schema";
import { PlatformConfiguration } from "lti-model";
import { query, query1 } from "../../db/db";

import { Effect } from "effect";
import { createKeyForRegistrationId } from "./keys";

const RegistrationType = S.union(S.literal("manual"), S.literal("dynamic"));

export const RegistrationRow = S.struct({
  id: S.number,
  client_id: S.nullable(S.string),
  type: RegistrationType,
  created: S.ValidDateFromSelf,
  app_id: S.number,
  claims: S.array(S.string),
  scopes: S.array(S.string),
  custom_parameters: S.record(S.string, S.string),
  platform_configuration: PlatformConfiguration,
  registration_config_url: S.nullable(S.string),
});

export interface RegistrationRow extends S.To<typeof RegistrationRow> {}

export const getRegistrationForId = (registrationId: number) =>
  query1(RegistrationRow)(
    "select id, client_id, type, app_id, created, platform_configuration, claims, scopes, custom_parameters, registration_config_url from registrations where id = $1",
    [registrationId]
  );

export const deleteRegistrationForId = (registrationId: number) =>
  query(S.unknown)("delete from registrations where id = $1", [registrationId]);

export const getRegistrationsForAppId = (appId: number) =>
  query(RegistrationRow)(
    "select id, client_id, type, app_id, created, platform_configuration, claims, scopes, custom_parameters, registration_config_url from registrations where app_id = $1",
    [appId]
  );

export const createRegistrationForAppId = (
  appId: number,
  type: S.To<typeof RegistrationType>,
  platformConfiguration: PlatformConfiguration,
  claims: ReadonlyArray<string> = [],
  scopes: ReadonlyArray<string> = [],
  client_id?: string
) =>
  Effect.tap(
    query1(RegistrationRow)(
      `insert into registrations 
      (app_id, type, client_id, platform_configuration, claims, scopes)
      values ($1, $2, $3, $4, $5, $6)
      returning *`,
      [appId, type, client_id, platformConfiguration, claims, scopes]
    ),
    (reg) => createKeyForRegistrationId(reg.id)
  );

export const setRegistrationClientId = (
  registrationId: number,
  client_id: string,
  registration_config_url?: string
) =>
  query(S.unknown)(
    `update registrations
        set client_id = $2,
        registration_config_url = $3
      where id = $1`,
    [registrationId, client_id, registration_config_url]
  );

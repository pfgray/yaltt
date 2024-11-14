import * as S from "@effect/schema/Schema";
import { PlatformConfiguration } from "lti-model";
import { query, query1 } from "../../db/db";

import { Effect } from "effect";
import { createKeyForRegistrationId } from "./keys";
import { Registration, RegistrationType } from "@yaltt/model";

export const getRegistrationForId = (registrationId: number) =>
  query1(Registration)(
    "select id, client_id, type, app_id, created, platform_configuration, claims, scopes, custom_parameters, registration_config_url from registrations where id = $1",
    [registrationId]
  );

export const deleteRegistrationForId = (registrationId: number) =>
  query(S.unknown)("delete from registrations where id = $1", [registrationId]);

export const getRegistrationsForAppId = (appId: number) =>
  query(Registration)(
    "select id, client_id, type, app_id, created, platform_configuration, claims, scopes, custom_parameters, registration_config_url from registrations where app_id = $1",
    [appId]
  );

export const createRegistrationForAppId = (
  appId: number,
  type: S.Schema.To<typeof RegistrationType>,
  platformConfiguration: PlatformConfiguration,
  claims: ReadonlyArray<string> = [],
  scopes: ReadonlyArray<string> = [],
  client_id?: string
) =>
  Effect.tap(
    query1(Registration)(
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

import * as S from "@effect/schema/Schema";
import { PlatformConfiguration, CreatedToolConfiguration } from "lti-model";
import { query, query1 } from "../../db/db";

import { Effect, pipe } from "effect";
import { createKeyForRegistrationId } from "./keys";
import { Registration, RegistrationId, RegistrationType } from "@yaltt/model";

export const getRegistrationForId = (registrationId: number) =>
  query1(Registration)(
    "select id, client_id, type, app_id, created, platform_configuration, claims, scopes, custom_parameters, registration_config_url, registration_client_uri from registrations where id = $1",
    [registrationId]
  );

export const deleteRegistrationForId = (registrationId: number) =>
  query(S.unknown)("delete from registrations where id = $1", [registrationId]);

export const getRegistrationsForAppId = (appId: number) =>
  query(Registration)(
    "select id, client_id, type, app_id, created, platform_configuration, claims, scopes, custom_parameters, registration_config_url, registration_client_uri from registrations where app_id = $1 order by created desc",
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

export const setRegistrationClientIdAndClientUri = (params: {
  registrationId: number;
  client_id: string;
  registration_config_url?: string;
  registration_client_uri?: string;
}) =>
  query(S.unknown)(
    `update registrations
        set client_id = $2,
        registration_config_url = $3,
        registration_client_uri = $4
      where id = $1`,
    [
      params.registrationId,
      params.client_id,
      params.registration_config_url,
      params.registration_client_uri,
    ]
  );

export const setRegistrationSavedConfiguration = (
  registrationId: number,
  saved_configuration: CreatedToolConfiguration
) =>
  query(S.unknown)(
    `update registrations
        set saved_configuration = $2
      where id = $1`,
    [registrationId, saved_configuration]
  );

export const getSavedConfigurationForRegistrationId = (
  registrationId: RegistrationId
) =>
  pipe(
    query1(S.struct({ saved_configuration: CreatedToolConfiguration }))(
      "SELECT saved_configuration FROM registrations WHERE id = $1 AND saved_configuration IS NOT NULL",
      [registrationId]
    ),
    Effect.map(({ saved_configuration }) => saved_configuration)
  );

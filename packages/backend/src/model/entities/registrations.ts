import { ToolConfiguration, PlatformConfiguration } from "lti-model";
import * as S from "@fp-ts/schema";
import { query, query1 } from "../../db/db";
import { pipe } from "@fp-ts/core/Function";
import * as Eff from "@effect/io/Effect";
import { App } from "@yaltt/model";
import { createKeyForRegistrationId } from "./keys";

const RegistrationRow = S.struct({
  id: S.number,
  created: S.date,
  app_id: S.number,
  claims: S.array(S.string),
  custom_parameters: S.record(S.string, S.string),
  platform_configuration: PlatformConfiguration,
});

export const getRegistrationForId = (registrationId: number) =>
  query1(RegistrationRow)(
    "select id, app_id, created, platform_configuration, claims, custom_parameters from registrations where id = $1",
    [registrationId]
  );

export const getRegistrationsForAppId = (appId: number) =>
  query(RegistrationRow)(
    "select id, app_id, created, platform_configuration, claims, custom_parameters from registrations where app_id = $1",
    [appId]
  );

export const createRegistrationForAppId = (
  appId: number,
  platformConfiguration: PlatformConfiguration
) =>
  Eff.tap(
    query1(RegistrationRow)(
      `insert into registrations 
      (app_id, platform_configuration)
      values ($1, $2)
      returning *`,
      [appId, platformConfiguration]
    ),
    (reg) => createKeyForRegistrationId(reg.id)
  );

import { ToolConfiguration, PlatformConfiguration } from "lti-model";
import * as S from "@fp-ts/schema";
import { query, query1 } from "../../db/db";
import { pipe } from "@fp-ts/core/Function";
import * as Eff from "@effect/io/Effect";
import { App } from "@yaltt/model";
import { createKeyForRegistrationId } from "./keys";

const RegistrationRow = S.struct({
  id: S.number,
  app_id: S.number,
  created: S.date,
  tool_configuration: ToolConfiguration,
  platform_configuration: PlatformConfiguration,
});

export const getRegistrationForId = (registrationId: number) =>
  query1(RegistrationRow)(
    "select id, app_id, created, tool_configuration, platform_configuration from registrations where id = $1",
    [registrationId]
  );

export const getRegistrationsForAppId = (appId: number) =>
  query(RegistrationRow)(
    "select id, app_id, created, tool_configuration, platform_configuration from registrations where app_id = $1",
    [appId]
  );

export const createRegistrationForAppId = (
  appId: number,
  toolConfiguration: ToolConfiguration,
  platformConfiguration: PlatformConfiguration
) =>
  Eff.tap(
    query1(RegistrationRow)(
      `insert into registrations 
      (app_id, tool_configuration, platform_configuration)
      values ($1, $2, $3)
      returning *`,
      [appId, toolConfiguration, platformConfiguration]
    ),
    (reg) => createKeyForRegistrationId(reg.id)
  );

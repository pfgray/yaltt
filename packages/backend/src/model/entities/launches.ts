import * as S from "@effect/schema/Schema";
import { query, query1 } from "../../db/db";
import { DateFromStringOrDate } from "@yaltt/model";

export const LaunchRow = S.struct({
  id: S.number,
  created: DateFromStringOrDate,
  id_token: S.unknown,
  registration_id: S.number,
  person_id: S.optionFromNullable(S.number),
  context_id: S.optionFromNullable(S.number),
});

export const getLaunchForId = (id: number) =>
  query1(LaunchRow)(
    `select
      id,
      created,
      id_token,
      registration_id,
      person_id,
      context_id
    from launches where id = $1`,
    [id]
  );

export const getLaunchesForPerson = (personId: number) =>
  query(LaunchRow)(
    `select
      id,
      created,
      id_token,
      registration_id,
      person_id,
      context_id
    from launches where person_id = $1`,
    [personId]
  );

export const getLaunchesForContext = (contextId: number) =>
  query(LaunchRow)(
    `select
      id,
      created,
      id_token,
      registration_id,
      person_id,
      context_id
    from launches where context_id = $1`,
    [contextId]
  );

export const getLaunchesForRegistration = (registrationId: number) =>
  query(LaunchRow)(
    `select
      id,
      created,
      id_token,
      registration_id,
      person_id,
      context_id
    from launches where registration_id = $1`,
    [registrationId]
  );

export const createLaunchForRegistrationId = (
  registrationId: number,
  idToken: unknown,
  personId?: number,
  contextId?: number
) =>
  query1(LaunchRow)(
    `insert into launches 
      (
        registration_id,
        id_token,
        person_id,
        context_id
      )
      values ($1, $2, $3, $4)
      returning *`,
    [registrationId, idToken, personId, contextId]
  );

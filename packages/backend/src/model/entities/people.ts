import * as S from "@effect/schema/Schema";
import { query, query1 } from "../../db/db";
import { DateFromStringOrDate } from "@yaltt/model";

const PersonRow = S.struct({
  id: S.number,
  created: DateFromStringOrDate,
  sub: S.string,
  name: S.optionFromNullable(S.string),
  given_name: S.optionFromNullable(S.string),
  family_name: S.optionFromNullable(S.string),
  middle_name: S.optionFromNullable(S.string),
  email: S.optionFromNullable(S.string),
  locale: S.optionFromNullable(S.string),
  registration_id: S.number,
});

export const getPersonForId = (id: number) =>
  query1(PersonRow)(
    `select
      id,
      created,
      sub,
      name,
      given_name,
      family_name,
      middle_name,
      email,
      locale,
      registration_id
    from people where id = $1`,
    [id]
  );

export const getPersonsForRegistrationId = (registrationId: number) =>
  query(PersonRow)(
    `select
      id,
      created,
      sub,
      name,
      given_name,
      family_name,
      middle_name,
      email,
      locale,
      registration_id
    from people where registration_id = $1`,
    [registrationId]
  );

export const createPersonForRegistrationId = (
  registrationId: number,
  sub: string,
  name?: string,
  given_name?: string,
  family_name?: string,
  middle_name?: string,
  email?: string,
  locale?: string
) =>
  query1(PersonRow)(
    `insert into people 
      (
        registration_id, 
        sub,
        name,
        given_name,
        family_name,
        middle_name,
        email,
        locale
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`,
    [
      registrationId,
      sub,
      name,
      given_name,
      family_name,
      middle_name,
      email,
      locale,
    ]
  );

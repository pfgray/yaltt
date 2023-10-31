import * as S from "@effect/schema/Schema";
import { query, query1 } from "../../db/db";

const ContextRow = S.struct({
  id: S.number,
  registration_id: S.number,
  created: S.ValidDateFromSelf,
  title: S.optionFromNullable(S.string),
  type: S.optionFromNullable(S.array(S.string)),
  label: S.optionFromNullable(S.string),
});

export const getContextForId = (id: number) =>
  query1(ContextRow)(
    `select
      id,
      registration_id,
      created,
      type,
      label,
      title,
    from contexts where id = $1`,
    [id]
  );

export const getContextsForRegistrationId = (registrationId: number) =>
  query(ContextRow)(
    `select 
      id,
      registration_id,
      created,
      type,
      label,
      title,
    from contexts where registration_id = $1`,
    [registrationId]
  );

export const createContextForRegistrationId = (
  registrationId: number,
  type?: ReadonlyArray<string>,
  label?: string,
  title?: string
) =>
  query1(ContextRow)(
    `insert into contexts 
      (registration_id, type, label, title)
      values ($1, $2, $3, $4)
      returning *`,
    [registrationId, type, label, title]
  );

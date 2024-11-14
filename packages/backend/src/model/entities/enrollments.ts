import * as S from "@effect/schema/Schema";
import { query, query1 } from "../../db/db";
import { DateFromStringOrDate } from "@yaltt/model";

const EnrollmentRow = S.struct({
  id: S.number,
  created: DateFromStringOrDate,
  person_id: S.number,
  context_id: S.number,
  roles: S.array(S.string),
});

export const getEnrollmentForPersonId = (personId: number) =>
  query(EnrollmentRow)(
    `select
      id,
      created,
      person_id,
      context_id,
      roles,
    from enrollments where person_id = $1`,
    [personId]
  );

export const getEnrollmentForContextId = (contextId: number) =>
  query(EnrollmentRow)(
    `select
      id,
      created,
      person_id,
      context_id,
      roles,
    from enrollments where context_id = $1`,
    [contextId]
  );

export const getEnrollmentForUserIdAndContextId = (
  userId: number,
  contextId: number
) =>
  query(EnrollmentRow)(
    `select
      id,
      created,
      person_id,
      context_id,
      roles,
    from enrollments where context_id = $1 and user_id = $2`,
    [contextId, userId]
  );

export const createEnrollment = (
  contextId: number,
  personId: number,
  roles: ReadonlyArray<string>
) =>
  query1(EnrollmentRow)(
    `insert into enrollments 
      (
        person_id,
        context_id,
        roles
      )
      values ($1, $2, $3)
      returning *`,
    [personId, contextId, roles]
  );

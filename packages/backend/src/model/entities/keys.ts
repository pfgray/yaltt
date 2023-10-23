import * as S from "@effect/schema/Schema";
import { query, query1 } from "../../db/db";

import { pipe, Effect, Option, Either } from "effect";
import { buffer } from "../../util/BufferSchema";
import { generateKeyPair } from "../../crypto/KeyService";

const KeyRowWithoutPrivateKey = S.struct({
  id: S.number,
  created: S.ValidDateFromSelf,
  active: S.boolean,
  registration_id: S.number,
  public_key: buffer,
});

const KeyRow = pipe(
  KeyRowWithoutPrivateKey,
  S.extend(
    S.struct({
      private_key: buffer,
    })
  )
);

export const createKeyForRegistrationId = (registrationId: number) =>
  pipe(
    generateKeyPair,
    Effect.flatMap(({ privateKey, publicKey }) =>
      insertKeyForRegistrationId(registrationId, privateKey, publicKey)
    )
  );

export const insertKeyForRegistrationId = (
  registrationId: number,
  privateKey: Buffer,
  publicKey: Buffer
) =>
  query1(KeyRow)(
    `insert into jwks 
    (registration_id, private_key, public_key)
    values ($1, $2, $3)
    returning *`,
    [registrationId, privateKey, publicKey]
  );

export const getKeysWithoutPrivateKeyForRegistrationId = (
  registrationId: number
) =>
  query(KeyRowWithoutPrivateKey)(
    `
	  select id, created, active, registration_id, public_key from jwks where registration_id = $1
	`,
    [registrationId]
  );

import { isoStringDate, User } from "@yaltt/model";
import * as S from "@fp-ts/schema";
import { query, query1 } from "../../db/db";
import { pipe } from "@fp-ts/core/Function";
import * as Eff from "@effect/io/Effect";
import { buffer } from "../../lib/BufferSchema";
import { generateKeyPair } from "../../crypto/KeyService";

const KeyRowWithoutPrivateKey = S.struct({
  id: S.number,
  created: S.date,
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
    Eff.flatMap(({ privateKey, publicKey }) =>
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

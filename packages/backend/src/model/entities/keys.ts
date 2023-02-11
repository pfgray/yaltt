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
  app_id: S.number,
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

export const createKeyForAppId = (appId: number) =>
  pipe(
    generateKeyPair,
    Eff.flatMap(({ privateKey, publicKey }) =>
      insertKeyForAppId(appId, privateKey, publicKey)
    )
  );

export const insertKeyForAppId = (
  appId: number,
  privateKey: Buffer,
  publicKey: Buffer
) =>
  query1(KeyRow)(
    `insert into jwks 
    (app_id, private_key, public_key)
    values ($1, $2, $3)
    returning *`,
    [appId, privateKey, publicKey]
  );

export const getKeysWithoutPrivateKeyForAppId = (appId: number) =>
  query(KeyRowWithoutPrivateKey)(
    `
	  select id, created, active, app_id, public_key from jwks where app_id = $1
	`,
    [appId]
  );

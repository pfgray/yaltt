
import {Pool} from 'pg'

import * as wut from '@fp-ts/core'
import * as TE from '@effect/io'


export const pool = new Pool()

const query_ = TE.taskify<string, any[], Error, any[]>(pool.query)

export const query = flow(
  query_,
  TE.mapError((error) => ({
    tag: 'pg_error',
    error
  }))
)

const query1 = flow(
  query,
  TE.flatMap(
    flow(RA.head, TE.fromOption(() => ({tag: 'error', message: 'query returned none'})))
  )
)


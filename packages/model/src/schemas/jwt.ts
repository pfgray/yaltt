import * as AST from "@fp-ts/schema/AST";
import * as PR from "@fp-ts/schema/ParseResult";
import * as S from "@fp-ts/schema";
import { pipe } from "@fp-ts/core/Function";
import * as O from "@fp-ts/core/Option";
import * as E from "@fp-ts/core/Either";
import * as NERA from '@fp-ts/core/ReadonlyArray'

export type RawJwt = {
  header: object
  payload: unknown
  signature: string
}

export type Jwt<A> = {
  header: object
  payload: A
  signature: string
}

const isObject = (x: unknown): x is object =>
  typeof x === 'object' && x !== null

const parse = O.liftThrowable((s: string) => {
  return JSON.parse(s) as unknown
})

const decode = O.liftThrowable((base64Url: string) => {
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    Buffer.from(base64, 'base64').toString()
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return jsonPayload
});

const parsePart =
  (index: 0 | 1 | 2) =>
  <R extends Record<'parts', string[]>>(obj: R) =>
    pipe(
      O.fromNullable(obj.parts[index]),
      O.flatMap(decode),
      O.flatMap(parse),
      O.filter(isObject)
    )

export const parseJwt = (s: string) => {
  return pipe(
    O.some(s.split('.')),
    O.bindTo('parts'),
    O.bind('header', parsePart(0)),
    O.bind('payload', parsePart(1)),
    O.bind('signature', ({parts}) => O.fromNullable(parts[2])),
    O.map(({ header, payload, signature }) => ({
      header,
      payload,
      signature
    }))
  )
}

const decodeJwt = <A>(bodySchema: S.Schema<A>) => (s: string, parseOptions?: AST.ParseOptions): PR.ParseResult<Jwt<A>> =>
  pipe(
    parseJwt(s),
    E.fromOption(() => NERA.make(PR.type(AST.stringKeyword, s))),
    E.flatMap(jwt => pipe(
      S.decode(bodySchema)(jwt.payload, parseOptions),
      E.map(payload => ({
        header: jwt.header,
        payload,
        signature: jwt.signature
      }))
    )),
    a => {
      console.log(`Preliminary result`, JSON.stringify(a), 'with parse options', JSON.stringify(parseOptions));
      return a;
    }
  )

const encodeJwt = <A>(s: Jwt<A>): PR.ParseResult<string> =>
  PR.success(`${s.header}.${s.payload?.toString()}.${s.signature}`)

export const JsonWebToken = <A>(payloadSchema: S.Schema<A>): S.Schema<Jwt<A>> => pipe(
  S.string,
  S.transformOrFail(
    S.struct({
      header: S.object,
      payload: payloadSchema,
      signature: S.string
    }),
    decodeJwt(payloadSchema),
    encodeJwt
  )
);

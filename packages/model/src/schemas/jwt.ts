import * as AST from "@effect/schema/AST";
import * as PR from "@effect/schema/ParseResult";
import * as S from "@effect/schema/Schema";
import { pipe, Either, Option, ReadonlyArray, Effect } from "effect";

export type RawJwt = {
  header: object;
  payload: unknown;
  signature: string;
};

export type Jwt<A> = {
  header: object;
  payload: A;
  signature: string;
};

const isObject = (x: unknown): x is object =>
  typeof x === "object" && x !== null;

const parse = Option.liftThrowable((s: string) => {
  return JSON.parse(s) as unknown;
});

const decode = Option.liftThrowable((base64Url: string) => {
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    Buffer.from(base64, "base64")
      .toString()
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return jsonPayload;
});

const parsePart =
  (index: 0 | 1 | 2) =>
  <R extends Record<"parts", string[]>>(obj: R) =>
    pipe(
      Option.fromNullable(obj.parts[index]),
      Option.flatMap(decode),
      Option.flatMap(parse),
      Option.filter(isObject)
    );

export const parseJwt = (s: string) => {
  return pipe(
    Option.some(s.split(".")),
    Option.bindTo("parts"),
    Option.bind("header", parsePart(0)),
    Option.bind("payload", parsePart(1)),
    Option.bind("signature", ({ parts }) => Option.fromNullable(parts[2])),
    Option.map(({ header, payload, signature }) => ({
      header,
      payload,
      signature,
    }))
  );
};

const decodeJwt =
  <A>(bodySchema: S.Schema<A>) =>
  (s: string, parseOptions?: AST.ParseOptions): PR.ParseResult<Jwt<A>> =>
    pipe(
      parseJwt(s),
      Effect.mapError((nse) =>
        PR.parseError(ReadonlyArray.make(PR.type(AST.stringKeyword, s)))
      ),
      Effect.flatMap((jwt) =>
        pipe(
          S.parse(bodySchema)(jwt.payload, parseOptions),
          Effect.map((payload) => ({
            header: jwt.header,
            payload,
            signature: jwt.signature,
          }))
        )
      ),
      (a) => {
        console.log(
          `Preliminary result`,
          JSON.stringify(a),
          "with parse options",
          JSON.stringify(parseOptions)
        );
        return a;
      }
    );

const encodeJwt = <A>(s: Jwt<A>): PR.ParseResult<string> =>
  PR.success(`${s.header}.${s.payload?.toString()}.${s.signature}`);

export const JsonWebToken = <A>(
  payloadSchema: S.Schema<A>
): S.Schema<string, Jwt<A>> =>
  pipe(
    S.string,
    S.transformResult(
      S.struct({
        header: S.object,
        payload: payloadSchema,
        signature: S.string,
      }),
      decodeJwt(payloadSchema),
      encodeJwt
    )
  );

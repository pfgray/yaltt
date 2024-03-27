import { Option, pipe } from "effect";

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

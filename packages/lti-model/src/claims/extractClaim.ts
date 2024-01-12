import * as S from "@effect/schema/Schema";

export const extractClaim =
  <T extends S.Schema<any, any>>(schema: T) =>
  <Key extends string>(key: K): Option.Option<S.To<T>> => {};

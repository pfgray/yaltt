import * as S from "@effect/schema/Schema";
import { Option, pipe } from "effect";

export const extractClaim =
  <T extends S.Schema<any, any>, Key extends string>(schema: T, key: Key) =>
  (obj: unknown): Option.Option<S.To<T>[Key]> =>
    pipe(
      S.parseOption(schema)(obj, { onExcessProperty: "ignore" }),
      Option.map((x) => x[key])
    );

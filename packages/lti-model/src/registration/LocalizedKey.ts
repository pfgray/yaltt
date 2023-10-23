import * as S from "@effect/schema/Schema";
import { pipe } from "effect";

export type LocalizedKey<K extends string, A> = {
  [V in K]: Record<V, A> & Record<`${V}#${string}`, A>;
};

export const LocalizedKey = <K extends string>(k: K) =>
  pipe(
    S.record(S.literal(k), S.string),
    S.extend(
      S.record(S.templateLiteral(S.literal(`${k}#`), S.string), S.string)
    )
  );

export const LocalizedKeyOp = <K extends string>(k: K) =>
  pipe(
    S.partial(S.record(S.literal(k), S.string)),
    S.extend(
      S.record(S.templateLiteral(S.literal(`${k}#`), S.string), S.string)
    )
  );

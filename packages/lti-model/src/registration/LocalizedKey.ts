import * as S from "@fp-ts/schema";
import { pipe } from "@fp-ts/core/Function";

export type LocalizedKey<K extends string, A> = {
  [V in K]: Record<V, A> & Record<`${V}#${string}`, A>;
};

type Foo = LocalizedKey<"foo", number>;

// {
//   [`${K}#${string}`]: A;
// };

// pipe(
//   S.record(S.literal(k), S.string),
//   S.extend(S.record(S.templateLiteral(S.literal(`${k}#`), S.string), S.string))
// );

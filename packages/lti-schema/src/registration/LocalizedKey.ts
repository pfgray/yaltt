import * as S from "@effect/schema/Schema";
import { pipe, Either, Option, ReadonlyArray, Effect } from "effect";

export const LocalizedKey = <K extends string>(k: K) =>
  pipe(
    S.record(S.literal(k), S.string),
    S.extend(
      S.record(S.templateLiteral(S.literal(`${k}#`), S.string), S.string)
    )
  );

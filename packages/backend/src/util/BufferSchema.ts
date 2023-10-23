import * as S from "@effect/schema/Schema";
import { pipe } from "effect";

export const buffer = pipe(
  S.unknown,
  S.filter((u): u is Buffer => u instanceof Buffer, {
    message: () => "an instance of Buffer",
    identifier: "Buffer",
    // jsonSchema: { minLength: 10 },
    description: "a Buffer object",
  })
);

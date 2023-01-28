import * as S from "@fp-ts/schema/Schema";
import * as AST from "@fp-ts/schema/AST";
import * as O from "@fp-ts/data/Option";
import { pipe } from "@fp-ts/data/Function";

export const buffer = pipe(
  S.unknown,
  S.filter((u): u is Buffer => u instanceof Buffer, {
    message: () => "an instance of Buffer",
    identifier: "Buffer",
    // jsonSchema: { minLength: 10 },
    description: "a Buffer object",
  })
);

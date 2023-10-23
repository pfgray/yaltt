import * as AST from "@effect/schema/AST";
import * as PR from "@effect/schema/ParseResult";
import * as S from "@effect/schema/Schema";
import { pipe } from "effect";

const decode = (s: string): PR.ParseResult<number> => {
  const result = parseInt(s, 10);
  if (!isNaN(result)) {
    return PR.success(result);
  } else {
    return PR.failure(PR.type(AST.numberKeyword, s));
  }
};

export const stringToInteger: S.Schema<string, number> = pipe(
  S.string,
  S.transformResult(S.number, decode, (n) => PR.success(n.toString()))
);

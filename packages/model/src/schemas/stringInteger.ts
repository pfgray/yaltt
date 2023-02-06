import * as AST from "@fp-ts/schema/AST";
import * as PR from "@fp-ts/schema/ParseResult";
import * as S from "@fp-ts/schema";
import { pipe } from "@fp-ts/core/Function";

const decode = (s: string): PR.ParseResult<number> => {
  const result = parseInt(s, 10);
  if (!isNaN(result)) {
    return PR.success(result);
  } else {
    return PR.failure(PR.type(AST.numberKeyword, s));
  }
};

export const stringToInteger: S.Schema<number> = pipe(
  S.string,
  S.transformOrFail(S.number, decode, (n) => PR.success(n.toString()))
);

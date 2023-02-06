import * as AST from "@fp-ts/schema/AST";
import * as PR from "@fp-ts/schema/ParseResult";
import * as S from "@fp-ts/schema";
import { pipe } from "@fp-ts/core/Function";

const decode = (s: string): PR.ParseResult<Date> => {
  const result = new Date(s);
  if (!isNaN(result.getTime())) {
    return PR.success(result);
  } else {
    return PR.failure(PR.type(AST.anyKeyword, s));
  }
};

export const isoStringDate: S.Schema<Date> = pipe(
  S.string,
  S.transformOrFail(S.date, decode, (n) => PR.success(n.toString()))
);

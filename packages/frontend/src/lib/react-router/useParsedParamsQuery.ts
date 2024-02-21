import * as S from "@effect/schema/Schema";
import { Either, pipe } from "effect";
import { useParsedQuery } from "./useParsedQuery";
import { useParsedParams } from "./useSchemaParams";

export function useParsedParamsQuery<P, Q>(
  paramsSchema: S.Schema<P, any>,
  querySchema: S.Schema<Q, any>
) {
  const parsedQuery = useParsedQuery(querySchema);
  const parsedParams = useParsedParams(paramsSchema);

  return pipe(
    parsedParams,
    Either.flatMap((params) =>
      pipe(
        parsedQuery,
        Either.map((query) => ({ query, params }))
      )
    )
  );
}

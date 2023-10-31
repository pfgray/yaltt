import React from "react";
import * as S from "@effect/schema/Schema";
import { useQuery } from "./useQuery";
import { useParams } from "react-router-dom";
import { useParsedParams } from "./useSchemaParams";
import { useParsedQuery } from "./useParsedQuery";
import { Either, pipe } from "effect";

export function useParsedParamsQuery<P, Q>(
  paramsSchema: S.Schema<any, P>,
  querySchema: S.Schema<any, Q>
) {
  const parsedQuery = useParsedQuery(querySchema);
  const parsedParams = useParsedParams(paramsSchema);

  return pipe(
    parsedParams,
    Either.flatMap((params) =>
      pipe(
        parsedQuery,
        Either.mapRight((query) => ({ query, params }))
      )
    )
  );
}

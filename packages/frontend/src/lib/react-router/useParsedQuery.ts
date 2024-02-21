import React from "react";
import * as S from "@effect/schema/Schema";
import { useQuery } from "./useQuery";

export function useParsedQuery<A>(schema: S.Schema<A, any>) {
  const query = useQuery();

  return React.useMemo(
    () => S.decodeEither(schema)(Object.fromEntries(query.entries())),
    [query]
  );
}

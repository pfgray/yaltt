import React from "react";
import * as S from "@effect/schema/Schema";
import { useQuery } from "./useQuery";

export function useParsedQuery<A>(schema: S.Schema<any, A>) {
  const query = useQuery();

  return React.useMemo(
    () => S.parseEither(schema)(Object.fromEntries(query.entries())),
    [query]
  );
}

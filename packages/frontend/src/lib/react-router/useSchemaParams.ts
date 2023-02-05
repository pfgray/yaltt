import React from "react";
import { useParams } from "react-router-dom";
import * as S from "@fp-ts/schema";

export function useSchemaParams<A>(schema: S.Schema<A>) {
  const params = useParams();

  return S.decode(schema)(params);
}

import { useParams } from "react-router-dom";
import * as S from "@effect/schema/Schema";

export function useParsedParams<A>(schema: S.Schema<A, any>) {
  const params = useParams();

  return S.decodeEither(schema)(params);
}

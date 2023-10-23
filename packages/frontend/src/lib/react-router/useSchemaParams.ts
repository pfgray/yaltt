import { useParams } from "react-router-dom";
import * as S from "@effect/schema/Schema";

export function useParsedParams<A>(schema: S.Schema<any, A>) {
  const params = useParams();

  return S.parseEither(schema)(params);
}

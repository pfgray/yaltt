import * as S from "@effect/schema/Schema";
import { PublicJwk } from "./PublicJwk";

export const PublicJwkSet = S.struct({
  keys: S.array(PublicJwk),
});

export interface PublicJwkSet extends S.Schema.To<typeof PublicJwkSet> {}

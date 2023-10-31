import * as S from "@effect/schema/Schema";

export const PlacementClaim = S.struct({
  "https://www.instructure.com/placement": S.string,
});

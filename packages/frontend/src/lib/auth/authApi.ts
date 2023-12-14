import { getDecode } from "../api/request";
import * as S from "@effect/schema/Schema";

export const getLoginMechanisms = getDecode(
  S.struct({
    types: S.array(S.literal("local", "google")),
  })
)("/api/loginMechanisms");

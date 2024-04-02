import * as S from "@effect/schema/Schema";
import type * as B from "effect/Brand";

export type UserId = string & B.Brand<"UserId">;

export const UserId = S.string.pipe(S.brand("UserId"));

import * as S from "@effect/schema/Schema";
import type * as B from "effect/Brand";

export type UserId = number & B.Brand<"UserId">;

export const UserId = S.number.pipe(S.brand("UserId"));

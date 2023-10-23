import * as S from "@effect/schema/Schema";

// todo: make this an actual url?
export const Url = S.string;

export type Url = S.To<typeof Url>;

import * as S from "@fp-ts/schema";

// todo: make this an actual url?
export const Url = S.string;

export type Url = S.Infer<typeof Url>;

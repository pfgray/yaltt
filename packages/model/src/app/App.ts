import * as S from "@fp-ts/schema/Schema";

export const App = S.struct({
  id: S.number,
  name: S.string,
  user_id: S.number,
});

export type App = S.Infer<typeof App>;

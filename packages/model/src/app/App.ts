import * as S from "@effect/schema/Schema";

export const App = S.struct({
  id: S.number,
  name: S.string,
  user_id: S.number,
  created: S.Date,
  modified: S.Date,
  icon_url: S.optionFromNullable(S.string),
});

export type App = S.To<typeof App>;

import * as S from "@effect/schema/Schema";

import type * as B from "effect/Brand";

export type AppId = number & B.Brand<"AppId">;

export const AppId = S.number.pipe(S.brand("AppId"));

export const UncreatedApp = S.struct({
  name: S.string,
  user_id: S.number,
  created: S.Date,
  modified: S.Date,
  icon_url: S.optionFromNullable(S.string),
});

export interface UncreatedApp extends S.Schema.To<typeof UncreatedApp> {}

export const App = UncreatedApp.pipe(S.extend(S.struct({ id: AppId })));

export interface App extends S.Schema.To<typeof App> {}

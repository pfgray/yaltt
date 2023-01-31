import * as S from "@fp-ts/schema/Schema";

export const Vendor = S.struct({
  id: S.number,
  name: S.string,
  user_id: S.number,
});

export type Vendor = S.Infer<typeof Vendor>;

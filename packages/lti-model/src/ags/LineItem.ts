import * as S from "@effect/schema/Schema";
import { ActivityProgress } from "./ActivityProgress";
import { GradingProgress } from "./GradingProgress";
import { UserId } from "../user/UserId";
import { Submission } from "./Submission";

export const LineItem = S.struct({
  scoreMaximum: S.number,
  label: S.string,
  resourceId: S.string,
  resourceLinkId: S.optional(S.string),
});

export type LineItem = S.Schema.To<typeof LineItem>;

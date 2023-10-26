import { makeMatchers, MakeADT } from "ts-adt/MakeADT";

export const [match, matchP, matchI, matchPI] = makeMatchers("tag");

export type TagADT<A extends Record<string, {}>> = MakeADT<"tag", A>;

import { makeMatchers, MakeADT } from "ts-adt/MakeADT";

export const [match, matchP, matchI, matchPI] = makeMatchers("_tag");

export type TagADT<A extends Record<string, {}>> = MakeADT<"_tag", A>;

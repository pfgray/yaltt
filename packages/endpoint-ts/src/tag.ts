import { makeMatchers, MakeADT, MakeADTMember } from "ts-adt/MakeADT";

export const [match, matchP, matchI, matchPI] = makeMatchers("_tag");

export type TagADT<A extends Record<string, {}>> = MakeADT<"_tag", A>;

export type TagADTMember<K extends string, ADT> = MakeADTMember<"_tag", ADT, K>;

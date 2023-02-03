import { makeMatchers } from "ts-adt/MakeADT";

export const [match, matchP, matchI, matchPI] = makeMatchers("tag");

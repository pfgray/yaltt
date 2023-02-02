import { get, getDecode } from "../api/request";
import * as S from "@fp-ts/schema/Schema";
import { User } from "@yaltt/model";

export const getCurrentUser = getDecode(User)("/api/me");

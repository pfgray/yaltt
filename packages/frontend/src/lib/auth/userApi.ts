import { YalttUser } from "@yaltt/model";
import { getDecode } from "../api/request";

export const getCurrentUser = getDecode(YalttUser)("/api/me");

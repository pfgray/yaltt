import { User } from "@yaltt/model";
import { getDecode } from "../api/request";

export const getCurrentUser = getDecode(User)("/api/me");

import { YalttAPIDef } from "@yaltt/model";
import { createApiClient } from "endpoint-ts-fetch";

export const YalttAPI = createApiClient(YalttAPIDef);

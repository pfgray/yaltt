import { createApp, getApp, getApps } from "@yaltt/model";
import {
  fetchBodyFromEndpoint,
  fetchFromEndpoint,
} from "../endpoint-ts/fetchFromEndpoint";

export const fetchApps = fetchFromEndpoint(getApps);
export const fetchApp = fetchFromEndpoint(getApp);
export const fetchCreateApp = fetchBodyFromEndpoint(createApp);

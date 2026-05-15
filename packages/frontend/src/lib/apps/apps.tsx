import { createApp, deleteApp, getApp, getApps } from "@yaltt/model";
import { fetchBodyFromEndpoint, fetchFromEndpoint } from "endpoint-ts-fetch";

export const fetchApps = fetchFromEndpoint(getApps);
export const fetchApp = fetchFromEndpoint(getApp);
export const fetchCreateApp = fetchBodyFromEndpoint(createApp);
export const fetchDeleteApp = fetchFromEndpoint(deleteApp);

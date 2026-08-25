import { createLti11Registration, deleteRegistration } from "@yaltt/model";
import { fetchBodyFromEndpoint, fetchFromEndpoint } from "endpoint-ts-fetch";

export const fetchCreateLti11Registration = fetchBodyFromEndpoint(createLti11Registration);
export const fetchDeleteRegistration = fetchFromEndpoint(deleteRegistration);

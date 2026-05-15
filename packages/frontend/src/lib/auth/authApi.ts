import { fetchFromEndpoint } from "endpoint-ts-fetch";
import { getLoginMechanisms } from "@yaltt/model";

export const fetchLoginMechanisms = fetchFromEndpoint(getLoginMechanisms);

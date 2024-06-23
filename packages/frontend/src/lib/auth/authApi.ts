import { fetchFromEndpoint } from "../endpoint-ts/fetchFromEndpoint";
import { getLoginMechanisms } from "@yaltt/model";

export const fetchLoginMechanisms = fetchFromEndpoint(getLoginMechanisms);

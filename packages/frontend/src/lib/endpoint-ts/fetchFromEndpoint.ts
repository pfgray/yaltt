import {
  BodyFromEndpoint,
  Endpoint,
  ResponseFromEndpoint,
  RouteParametersForEndpoint,
} from "endpoint-ts";

export const fetchFromEndpoint = <E extends Endpoint<any, any, any, any>>(
  endpoint: E
) => {
  return (route: RouteParametersForEndpoint<E>) =>
    (body: BodyFromEndpoint<E>) => {};
};

AppEndpoints.getApp;

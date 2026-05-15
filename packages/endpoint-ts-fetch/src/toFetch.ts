import { Effect } from "effect";
import {
  BodyFromEndpoint,
  Endpoint,
  QueryParametersFromEndpoint,
  ResponseFromEndpoint,
  RouteParametersFromEndpoint,
} from "endpoint-ts";
import {
  FetchError,
  fetchBodyFromEndpoint,
  fetchFromEndpoint,
} from "./index.js";

// Type helpers to detect what params an endpoint needs

type IsEmptyObject<T> = keyof T extends never ? true : false;

type HasRouteParams<E extends Endpoint<any, any, any, any, any, any, any>> =
  IsEmptyObject<RouteParametersFromEndpoint<E>> extends true ? false : true;

type HasQueryParams<E extends Endpoint<any, any, any, any, any, any, any>> =
  IsEmptyObject<QueryParametersFromEndpoint<E>> extends true ? false : true;

type HasBody<E extends Endpoint<any, any, any, any, any, any, any>> =
  E extends Endpoint<any, any, any, any, any, any, infer B>
    ? B extends { _tag: "empty" }
      ? false
      : true
    : false;

// Compute the correct function signature based on what the endpoint needs
// Order: routeParams (if any), queryParams (if any), body (if any)
type EndpointFetcherParams<E extends Endpoint<any, any, any, any, any, any, any>> =
  HasBody<E> extends true
    ? // With body
      HasQueryParams<E> extends true
        ? HasRouteParams<E> extends true
          ? [routeParams: RouteParametersFromEndpoint<E>, queryParams: QueryParametersFromEndpoint<E>, body: BodyFromEndpoint<E>]
          : [queryParams: QueryParametersFromEndpoint<E>, body: BodyFromEndpoint<E>]
        : HasRouteParams<E> extends true
          ? [routeParams: RouteParametersFromEndpoint<E>, body: BodyFromEndpoint<E>]
          : [body: BodyFromEndpoint<E>]
    : // Without body
      HasQueryParams<E> extends true
        ? HasRouteParams<E> extends true
          ? [routeParams: RouteParametersFromEndpoint<E>, queryParams: QueryParametersFromEndpoint<E>]
          : [queryParams: QueryParametersFromEndpoint<E>]
        : HasRouteParams<E> extends true
          ? [routeParams: RouteParametersFromEndpoint<E>]
          : [];

// The fetch function type for an endpoint
export type EndpointFetcher<E extends Endpoint<any, any, any, any, any, any, any>> = (
  ...params: EndpointFetcherParams<E>
) => Effect.Effect<ResponseFromEndpoint<E>, FetchError, never>;

/**
 * Transforms an endpoint definition into a callable fetch function.
 * The function signature adapts based on what the endpoint needs:
 * - No params → `()`
 * - Route only → `(routeParams)`
 * - Query only → `(queryParams)`
 * - Route + query → `(routeParams, queryParams)`
 * - Body only → `(body)`
 * - Route + body → `(routeParams, body)`
 * - Query + body → `(queryParams, body)`
 * - Route + query + body → `(routeParams, queryParams, body)`
 */
export function toFetch<E extends Endpoint<any, any, any, any, any, any, any>>(
  endpoint: E
): EndpointFetcher<E> {
  const hasBody = endpoint.body._tag !== "empty";
  const hasRoute = Object.keys(endpoint.route.routeParamCodecs).length > 0;
  const hasQuery = Object.keys(endpoint.query).length > 0;

  if (hasBody) {
    // Use fetchBodyFromEndpoint internally
    const fetcher = fetchBodyFromEndpoint(endpoint as any);

    if (hasRoute && hasQuery) {
      // (routeParams, queryParams, body)
      return ((routeParams: any, queryParams: any, body: any) =>
        fetcher(routeParams, queryParams)(body)) as EndpointFetcher<E>;
    } else if (hasRoute) {
      // (routeParams, body)
      return ((routeParams: any, body: any) =>
        fetcher(routeParams, {})(body)) as EndpointFetcher<E>;
    } else if (hasQuery) {
      // (queryParams, body)
      return ((queryParams: any, body: any) =>
        fetcher({}, queryParams)(body)) as EndpointFetcher<E>;
    } else {
      // (body)
      return ((body: any) => fetcher({}, {})(body)) as EndpointFetcher<E>;
    }
  } else {
    // Use fetchFromEndpoint internally
    const fetcher = fetchFromEndpoint(endpoint as any);

    if (hasRoute && hasQuery) {
      // (routeParams, queryParams)
      return fetcher as EndpointFetcher<E>;
    } else if (hasRoute) {
      // (routeParams)
      return fetcher as EndpointFetcher<E>;
    } else if (hasQuery) {
      // (queryParams) - need to adapt signature
      return ((queryParams: any) => fetcher({}, queryParams)) as EndpointFetcher<E>;
    } else {
      // ()
      return fetcher as EndpointFetcher<E>;
    }
  }
}

// Type to check if a value is an Endpoint
type IsEndpoint<T> = T extends Endpoint<any, any, any, any, any, any, any>
  ? true
  : false;

// Recursively convert an API definition object to fetch functions
// If a value is an Endpoint, convert it to EndpointFetcher
// If a value is an object, recursively convert its properties
type ApiClient<T> = {
  [K in keyof T]: T[K] extends Endpoint<any, any, any, any, any, any, any>
    ? EndpointFetcher<T[K]>
    : T[K] extends Record<string, any>
      ? ApiClient<T[K]>
      : never;
};

/**
 * Converts an API definition object into a client with callable fetch functions.
 *
 * Takes a nested object of endpoint definitions and returns an object with the
 * same structure, but with each endpoint converted to a fetch function.
 *
 * @example
 * ```typescript
 * import { API } from "@yaltt/model";
 * import { createApiClient } from "endpoint-ts-fetch";
 *
 * const api = createApiClient(API);
 *
 * // Now you can call endpoints directly:
 * api.apps.getApps()
 * api.apps.getApp({ appId: 1 })
 * api.apps.createApp({ name: "My App", ... })
 * api.registrations.getApiTokenForRegistration(
 *   { appId: 1, registrationId: 2 },
 *   { scope: Option.some("lineitem") }
 * )
 * ```
 */
export function createApiClient<T extends Record<string, any>>(
  apiDefinition: T
): ApiClient<T> {
  const result: Record<string, any> = {};

  for (const key of Object.keys(apiDefinition)) {
    const value = apiDefinition[key];

    // Check if this is an endpoint (has the expected shape)
    if (isEndpoint(value)) {
      result[key] = toFetch(value);
    } else if (typeof value === "object" && value !== null) {
      // Recursively process nested namespaces
      result[key] = createApiClient(value);
    }
  }

  return result as ApiClient<T>;
}

// Runtime check for whether a value is an Endpoint
function isEndpoint(value: unknown): value is Endpoint<any, any, any, any, any, any, any> {
  return (
    typeof value === "object" &&
    value !== null &&
    "route" in value &&
    "query" in value &&
    "method" in value &&
    "body" in value &&
    "response" in value
  );
}

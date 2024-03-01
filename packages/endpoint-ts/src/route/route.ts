/* eslint-disable @typescript-eslint/no-explicit-any */
import { Either, ReadonlyArray, pipe } from "effect";
import * as S from "@effect/schema/Schema";

//#region Type definitions

export type RouteCodec<A> = S.Schema<A, string>;

export type RouteParamsFromRoute<
  R extends Array<string>,
  Acc = never
> = R extends [`:${infer Param}`, ...infer Rest]
  ? Rest extends Array<string>
    ? RouteParamsFromRoute<Rest, Acc | Param>
    : never
  : R extends [string, ...infer Rest]
  ? Rest extends Array<string>
    ? RouteParamsFromRoute<Rest, Acc>
    : never
  : never;

export type Route<
  R extends Array<string>,
  RPs extends Partial<Record<RouteParamsFromRoute<R>, RouteCodec<any>>>
> = {
  _tag: "RouteDefinition";
  routeSegments: R;
  routeParamCodecs: RPs;
};

export type RouteParametersForRoute<RouteInstance> =
  RouteInstance extends Route<infer _R, infer RPs>
    ? { [K in keyof RPs]: RPs[K] extends RouteCodec<infer C> ? C : never }
    : never;

export type RouteParameters<RPs extends Record<string, RouteCodec<any>>> = {
  [K in keyof RPs]: RPs[K] extends RouteCodec<infer C> ? C : never;
};

//#endregion

// eslint-disable-next-line @typescript-eslint/ban-types
export const RootPath: Route<[], {}> = {
  _tag: "RouteDefinition",
  routeSegments: [],
  routeParamCodecs: {},
};

type SlashlessNonparameter<S> = S extends `:${string}`
  ? never
  : S extends `${string}/${string}`
  ? never
  : S;

export type OptionalQueryParamCodec<T> = {
  _tag: "optional";
  codec: RouteCodec<T>;
};
export type RequiredQueryParamCodec<T> = {
  _tag: "required";
  codec: RouteCodec<T>;
};

type Join<R extends Array<string>, Acc extends string = ""> = R extends [
  infer S,
  ...infer Rest
]
  ? Rest extends Array<string>
    ? S extends string
      ? Join<Rest, `${Acc}/${S}`>
      : never
    : never
  : Acc;

export const getRouteString: <
  R extends Array<string>,
  RPs extends Partial<Record<RouteParamsFromRoute<R, never>, RouteCodec<any>>>
>(
  route: Route<R, RPs>
) => Join<R> = (route) =>
  ("/" + route.routeSegments.join("/")) as Join<
    (typeof route)["routeSegments"]
  >;

export const path: <R extends string>(
  r: SlashlessNonparameter<R>
) => <
  RR extends Array<string>,
  RPs extends Partial<Record<RouteParamsFromRoute<RR>, RouteCodec<any>>>
>(
  basePath: Route<RR, RPs>
  // eslint-disable-next-line @typescript-eslint/ban-types
) => Route<[...RR, R], RPs> = (r) => (basePath) => ({
  ...basePath,
  routeSegments: [...basePath.routeSegments, r],
  queryParamCodecs: {},
});

export const param =
  <
    Name extends string,
    A,
    RPs extends Partial<
      Record<RouteParamsFromRoute<any, never>, RouteCodec<any>>
    >
  >(
    name: Exclude<SlashlessNonparameter<Name>, keyof RPs>,
    codec: RouteCodec<A>
  ) =>
  <R extends Array<string>>(
    path: Route<R, RPs>
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Route<[...R, `:${Name}`], RPs & { [N in Name]: RouteCodec<A> }> => ({
    ...path,
    routeSegments: [...path.routeSegments, `:${name}`],
    routeParamCodecs: { ...path.routeParamCodecs, [name]: codec } as RPs & {
      [N in Name]: RouteCodec<A>;
    },
  });

export const buildPath = <
  R extends Array<string>,
  RPs extends Record<string, RouteCodec<any>>
>(
  route: Route<R, RPs>,
  routeParams: RouteParameters<RPs>
) =>
  pipe(
    route.routeSegments.map((segment) => {
      if (segment.startsWith(":")) {
        const name = segment.slice(1);
        const schema = route.routeParamCodecs[name];
        const value = routeParams[name];
        return S.encodeEither(schema, {})(value);
      } else {
        return Either.right(segment);
      }
    }),
    (a) => a,
    Either.all,
    Either.map(ReadonlyArray.join("/"))
  );

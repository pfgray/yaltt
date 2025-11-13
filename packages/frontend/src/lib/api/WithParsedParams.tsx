import * as S from "@effect/schema/Schema";
import { Either, pipe } from "effect";
import { useParsedParams } from "../react-router/useSchemaParams";
import { Pre } from "../ui/Pre";
import { ParseError } from "@effect/schema/ParseResult";
import { useParsedParamsQuery } from "../react-router/useParsedParamsQuery";

type SchemaMap = Record<string, S.Schema<any, string>>;

type ExtractSchemaResult<T> = T extends S.Schema<infer A, any> ? A : never;

export type InferSchemaMap<T extends SchemaMap> = {
  [K in keyof T]: ExtractSchemaResult<T[K]>;
};

type WithParsedParamsProps<
  T extends SchemaMap = {},
  U extends SchemaMap = {}
> = {
  params?: T;
  query?: U;
  children: (parsed: {
    params: InferSchemaMap<T>;
    query: InferSchemaMap<U>;
  }) => React.ReactNode;
  onError?: (error: ParseError) => React.ReactNode;
};

export const mkWithParsedParams =
  <T extends SchemaMap, U extends SchemaMap>(params?: T, query?: U) =>
  (props: {
    children: (parsed: {
      params: InferSchemaMap<T>;
      query: InferSchemaMap<U>;
    }) => React.ReactNode;
    onError?: (error: ParseError) => React.ReactNode;
  }) =>
    <></>;

// Helper function with better type inference using `const` assertions
export const withParsedParams =
  <T extends SchemaMap = {}, U extends SchemaMap = {}>(params?: T, query?: U) =>
  (
    children: (parsed: {
      params: InferSchemaMap<T>;
      query: InferSchemaMap<U>;
    }) => React.ReactNode,
    onError?: (error: ParseError) => React.ReactNode
  ): React.ReactElement => {
    const paramsSchema = S.struct((params || {}) as T);
    const querySchema = S.struct((query || {}) as U);
    const parsedParams = useParsedParamsQuery(
      paramsSchema as any,
      querySchema as any
    );

    return pipe(
      parsedParams as any,
      Either.match({
        onLeft: (error: ParseError) =>
          onError ? (
            onError(error)
          ) : (
            <div className="alert alert-error">
              <div>
                <h3 className="font-bold">Invalid URL Parameters</h3>
                <div className="text-xs">
                  <Pre>{JSON.stringify(error, null, 2)}</Pre>
                </div>
              </div>
            </div>
          ),
        onRight: children,
      })
    ) as any;
  };

export const WithParsedParams = <
  const T extends SchemaMap,
  const U extends SchemaMap
>({
  params,
  query,
  children,
  onError,
}: WithParsedParamsProps<T, U>) => {
  const paramsSchema = S.struct(params || {});
  const querySchema = S.struct(query || {});
  const parsedParams = useParsedParamsQuery(
    paramsSchema as any,
    querySchema as any
  );

  return pipe(
    parsedParams as any,
    Either.match({
      onLeft: (error: ParseError) =>
        onError ? (
          onError(error)
        ) : (
          <div className="alert alert-error">
            <div>
              <h3 className="font-bold">Invalid URL Parameters</h3>
              <div className="text-xs">
                <Pre>{JSON.stringify(error, null, 2)}</Pre>
              </div>
            </div>
          </div>
        ),
      onRight: children,
    })
  );
};

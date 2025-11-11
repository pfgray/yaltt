import * as S from "@effect/schema/Schema";
import { Either, pipe } from "effect";
import { useParsedParams } from "../react-router/useSchemaParams";
import { Pre } from "../ui/Pre";
import { ParseError } from "@effect/schema/ParseResult";

type WithParsedParamsProps<A> = {
  schema: S.Schema<A, unknown>;
  children: (params: A) => React.ReactNode;
  onError?: (error: ParseError) => React.ReactNode;
};

export const WithParsedParams = <A,>({
  schema,
  children,
  onError,
}: WithParsedParamsProps<A>) => {
  const parsedParams = useParsedParams(schema);

  return pipe(
    parsedParams,
    Either.match({
      onLeft: (error) =>
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

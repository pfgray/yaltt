import { formatError } from "@effect/schema/TreeFormatter";
import { match } from "@yaltt/model";
import { Effect, Either, Option, pipe } from "effect";
import * as React from "react";
import { RequestError, RequestService } from "./request";
import { provideRequestService } from "./requestServiceImpl";
import {
  FetchError,
  FetchException,
  FetchParseError,
  FetchParseJsonError,
} from "../endpoint-ts/fetchFromEndpoint";
import { ParseError } from "@effect/schema/ParseResult";

type WithRequestProps<A> = {
  eff: Effect.Effect<A, RequestError | FetchError, RequestService>;
  children: (
    a: A,
    reloadData: Effect.Effect<A, RequestError | FetchError, never>
  ) => React.ReactNode;
};

export const WithRequest = <A,>(props: WithRequestProps<A>): JSX.Element => {
  const [value, setValue] = React.useState<
    Option.Option<Either.Either<A, RequestError | FetchError>>
  >(Option.none);
  props.eff;
  provideRequestService<A, RequestError | FetchError, RequestService>(
    props.eff
  );
  provideRequestService(props.eff);

  const effect = pipe(
    provideRequestService(props.eff),
    (a) => a,
    Effect.tap((a) =>
      Effect.sync(() => {
        setValue(Option.some(Either.right(a)));
      })
    ),
    Effect.onError((err) =>
      Effect.sync(() => {
        console.log("Error", err);
        if (err._tag === "Fail") {
          err.error._tag;
          setValue(Option.some(Either.left(err.error)));
        }
      })
    )
  );

  React.useEffect(() => {
    Effect.runCallback(effect);
  }, []);

  return pipe(
    value,
    Option.match({
      onNone: () => (
        <div className="w-full h-full flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ),
      onSome: Either.match({
        onLeft: match({
          req_client_error: genericError,
          req_server_error: genericError,
          decode_error: (err) => parseError(err.errors),
          fetch_exception: genericError,
          fetch_parse_error: (a) => parseError(a.reason),
          fetch_parse_json_error: genericError,
          encode_error: (e) => parseError(e.error),
        }),
        onRight: (a) => <>{props.children(a, effect)}</>,
      }),
    })
  );
};

const genericError = (err: unknown) => (
  <div>
    <pre>{JSON.stringify(err, null, 2)}</pre>
  </div>
);

const parseError = (err: ParseError) => (
  <div>
    <pre>{formatError(err)}</pre>
  </div>
);

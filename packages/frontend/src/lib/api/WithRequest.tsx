import { formatError } from "@effect/schema/TreeFormatter";
import { match } from "@yaltt/model";
import { Effect, Either, Option, pipe } from "effect";
import * as React from "react";
import { RequestError, RequestService } from "./request";
import { provideRequestService } from "./requestServiceImpl";

type WithRequestProps<A> = {
  eff: Effect.Effect<A, RequestError, RequestService>;
  children: (
    a: A,
    reloadData: Effect.Effect<A, RequestError, never>
  ) => React.ReactNode;
};

export const WithRequest = <A,>(props: WithRequestProps<A>): JSX.Element => {
  const [value, setValue] = React.useState<
    Option.Option<Either.Either<RequestError, A>>
  >(Option.none);
  props.eff;
  provideRequestService<A, RequestError, RequestService>(props.eff);
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
          req_client_error: (err) => (
            <div>
              <pre>{JSON.stringify(err, null, 2)}</pre>
            </div>
          ),
          req_server_error: (err) => (
            <div>
              <pre>{JSON.stringify(err, null, 2)}</pre>
            </div>
          ),
          decode_error: (err) => (
            <div>
              <pre>{formatError(err.errors)}</pre>
            </div>
          ),
        }),
        onRight: (a) => <>{props.children(a, effect)}</>,
      }),
    })
  );
};

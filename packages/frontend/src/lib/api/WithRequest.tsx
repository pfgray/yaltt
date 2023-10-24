import * as Eff from "@effect/io/Effect";
import { formatErrors } from "@effect/schema/TreeFormatter";
import { match } from "@yaltt/model";
import { Either, Option, pipe } from "effect";
import * as React from "react";
import { RequestError, RequestService } from "./request";
import { provideRequestService } from "./requestServiceImpl";

type WithRequestProps<A> = {
  eff: Eff.Effect<RequestService, RequestError, A>;
  children: (
    a: A,
    reloadData: Eff.Effect<never, RequestError, A>
  ) => React.ReactNode;
};

export const WithRequest = <A,>(props: WithRequestProps<A>): JSX.Element => {
  const [value, setValue] = React.useState<
    Option.Option<Either.Either<RequestError, A>>
  >(Option.none);

  const effect = pipe(
    provideRequestService(props.eff),
    Eff.tap((a) =>
      Eff.sync(() => {
        setValue(Option.some(Either.right(a)));
      })
    ),
    Eff.onError((err) =>
      Eff.sync(() => {
        console.log("Error", err);
        if (err._tag === "Fail") {
          setValue(Option.some(Either.left(err.error)));
        }
      })
    )
  );

  React.useEffect(() => {
    Eff.runCallback(effect);
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
              <pre>{formatErrors(err.errors.errors)}</pre>
            </div>
          ),
        }),
        onRight: (a) => <>{props.children(a, effect)}</>,
      }),
    })
  );
};

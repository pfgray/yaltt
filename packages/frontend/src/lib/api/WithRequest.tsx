import * as Eff from "@effect/io/Effect";
import * as Exit from "@effect/io/Exit";
import { pipe, Either, Option, ReadonlyArray, Effect } from "effect";
import * as React from "react";
import { RequestService } from "./request";
import { provideRequestService } from "./requestServiceImpl";

type WithRequestProps<A> = {
  eff: Eff.Effect<RequestService, unknown, A>;
  children: (a: A) => React.ReactNode;
};

export const WithRequest = <A,>(props: WithRequestProps<A>): JSX.Element => {
  const [value, setValue] = React.useState<
    Option.Option<Either.Either<unknown, A>>
  >(Option.none);

  React.useEffect(() => {
    Eff.runCallback(
      provideRequestService(props.eff),
      Exit.match({
        onFailure: (err) => {
          console.log("Error", err);
          setValue(Option.some(Either.left(err)));
        },
        onSuccess: (a) => {
          setValue(Option.some(Either.right(a)));
        },
      })
    );
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
        onLeft: (err) => (
          <div>
            error! <pre>{JSON.stringify(err, null, 2)}</pre>
          </div>
        ),
        onRight: (a) => <>{props.children(a)}</>,
      }),
    })
  );
};

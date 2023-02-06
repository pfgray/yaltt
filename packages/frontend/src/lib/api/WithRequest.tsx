import * as Eff from "@effect/io/Effect";
import * as Exit from "@effect/io/Exit";
import * as E from "@fp-ts/core/Either";
import { pipe } from "@fp-ts/core/Function";
import * as O from "@fp-ts/core/Option";
import * as React from "react";
import { RequestService } from "./request";
import { provideRequestService } from "./requestServiceImpl";

type WithRequestProps<A> = {
  eff: Eff.Effect<RequestService, unknown, A>;
  children: (a: A) => React.ReactNode;
};

export const WithRequest = <A,>(props: WithRequestProps<A>): JSX.Element => {
  const [value, setValue] = React.useState<O.Option<E.Either<unknown, A>>>(
    O.none
  );

  React.useEffect(() => {
    Eff.runCallback(
      provideRequestService(props.eff),
      Exit.match(
        (err) => {
          console.log("Error", err);
          setValue(O.some(E.left(err)));
        },
        (a) => {
          setValue(O.some(E.right(a)));
        }
      )
    );
  }, []);

  return pipe(
    value,
    O.match(
      () => <div>loading...</div>,
      E.match(
        (err) => (
          <div>
            error! <pre>{JSON.stringify(err, null, 2)}</pre>
          </div>
        ),
        (a) => <>{props.children(a)}</>
      )
    )
  );
};

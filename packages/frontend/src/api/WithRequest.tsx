import { pipe } from "@fp-ts/data/Function";
import * as React from "react";
import * as Eff from "@effect/io/Effect";
import * as Exit from "@effect/io/Exit";
import { provideRequestService } from "./requestServiceImpl";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "@yaltt/model";
import { RequestService } from "./request";
import * as O from "@fp-ts/data/Option";
import * as E from "@fp-ts/data/Either";

type WithRequestProps<A> = {
  eff: Eff.Effect<RequestService, unknown, A>;
  children: (a: A) => React.ReactNode;
};

export const WithRequest = <A,>(props: WithRequestProps<A>): JSX.Element => {
  const [value, setValue] = React.useState<O.Option<E.Either<unknown, A>>>(
    O.none
  );

  React.useEffect(() => {
    Eff.unsafeRun(
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
        (err) => <div>error! {JSON.stringify(err)}</div>,
        (a) => <>{props.children(a)}</>
      )
    )
  );
};

import { pipe, Either, Option, ReadonlyArray, Effect, Exit } from "effect";
import * as React from "react";
import { getCurrentUser } from "./userApi";
import { provideRequestService } from "../api/requestServiceImpl";
import { useLocation, useNavigate } from "react-router-dom";
import { YalttUser } from "@yaltt/model";

type WithAuthProps = {
  children: (user: YalttUser) => JSX.Element;
};

export const WithAuth = (props: WithAuthProps): JSX.Element => {
  const [user, setUser] = React.useState<YalttUser | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    Effect.runPromiseExit(provideRequestService(getCurrentUser)).then(
      Exit.match({
        onFailure: (err) => {
          const redirectUrl = `/login?redirectUrl=${encodeURIComponent(
            location.pathname + location.search
          )}`;
          navigate(redirectUrl, {
            replace: true,
          });
        },
        onSuccess: (user) => {
          setUser(user);
        },
      })
    );
  }, []);
  if (!user) {
    return <></>;
  } else {
    return props.children(user);
  }
};

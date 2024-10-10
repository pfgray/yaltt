import { LoginMechanisms } from "@yaltt/model";
import {
  Effect,
  Either,
  Equivalence,
  Option,
  pipe,
  ReadonlyArray,
} from "effect";
import * as React from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import img from "../../img/bg.jpg";
import { formBody, post, RequestService } from "../../lib/api/request";
import { provideRequestService } from "../../lib/api/requestServiceImpl";
import { fetchLoginMechanisms } from "../../lib/auth/authApi";
import { FetchError } from "../../lib/endpoint-ts/fetchFromEndpoint";
import { useQuery } from "../../lib/react-router/useQuery";
import { GoogleIcon } from "./GoogleIcon";

const inIframe = () => window.self !== window.top;

const useLoginMechanisms = () => {
  const [loginMechanisms, setLoginMechanisms] = React.useState<
    Option.Option<Either.Either<LoginMechanisms, FetchError>>
  >(Option.none);
  const effect = pipe(
    provideRequestService(fetchLoginMechanisms()),
    Effect.tap((a) =>
      Effect.sync(() => {
        setLoginMechanisms(Option.some(Either.right(a)));
      })
    ),
    Effect.tapError((err) =>
      Effect.sync(() => {
        console.log("Error", err);
        setLoginMechanisms(Option.some(Either.left(err)));
      })
    )
  );

  React.useEffect(() => {
    Effect.runCallback(effect);
  }, []);
  return loginMechanisms;
};

if (window.opener) {
  window.opener.postMessage("login", "*");
  window.close();
}

export default function SignIn() {
  const navigate = useNavigate();
  let query = useQuery();

  const loginMechanisms = useLoginMechanisms();

  React.useEffect(() => {
    function redirectToUrl(event: MessageEvent) {
      if (event.data === "login") {
        const redirectUrl = query.get("redirectUrl") || "/";
        navigate(redirectUrl, {
          replace: true,
        });
      }
    }
    window.addEventListener("message", redirectToUrl);
    return () => {
      window.removeEventListener("message", redirectToUrl);
    };
  }, []);

  const [loginStatus, setLoginStatus] = React.useState<
    "not_sending" | "loading" | "req_server_error" | "req_client_error"
  >("not_sending");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginStatus("loading");
    const data = new FormData(event.currentTarget);
    Effect.runPromiseExit(
      pipe(
        post("/api/login/password", formBody(data)),
        Effect.flatMap(() =>
          Effect.async<{}, never, never>((resume) => {
            const redirectUrl = query.get("redirectUrl") || "/";
            console.log("REDIRECTING TO:", redirectUrl);
            navigate(redirectUrl, {
              replace: true,
            });
            resume(Effect.succeed({}));
          })
        ),
        Effect.tapError((err) =>
          Effect.sync(() => {
            console.log("Error", err);
            setLoginStatus(err._tag);
          })
        ),
        Effect.provideService(RequestService, {
          config: { baseUrl: import.meta.env.VITE_API_URL },
        })
      )
    );
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://www.roadunraveled.com/wp-content/uploads/2019/09/shenandoah-top.jpg)`,
      }}
      className="h-screen w-screen bg-cover bg-center bg-gradient-to-r from-cyan-500 to-blue-500"
    >
      <div
        className="h-screen w-screen bg-cover bg-center bg-zinc-950/50 flex flex-col justify-center"
        data-theme="dark"
      >
        <form onSubmit={handleSubmit}>
          <div className="container mx-auto flex flex-col items-center">
            <h1 className="text-3xl font-bold underline mb-2 text-white">
              yaltt
            </h1>
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="input input-bordered w-full max-w-xs bg-zinc-950/70 border-0 mb-2 text-white"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="input input-bordered w-full max-w-xs bg-zinc-950/70 border-0 mb-2 text-white"
            />
            <button
              type="submit"
              className="btn btn-wide bg-zinc-950/70 border-0 text-white mb-2"
            >
              Sign in
            </button>
            {loginStatus === "req_server_error" ? (
              <div role="alert" className="alert alert-error max-w-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>An error occurred.</span>
              </div>
            ) : loginStatus === "req_client_error" ? (
              <div role="alert" className="alert alert-warning max-w-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Invalid Login</span>
              </div>
            ) : null}
            {/* <pre>{loginStatus}</pre> */}
            {pipe(
              loginMechanisms,
              Option.flatMap(
                Either.match({
                  onLeft: Option.none,
                  onRight: (r) => Option.some(r.types),
                })
              ),
              Option.filter(
                ReadonlyArray.containsWith(Equivalence.string)("google")
              ),
              Option.match({
                onNone: () => <></>,
                onSome: () => (
                  <a
                    type="button"
                    href="/api/login/google"
                    className="btn btn-wide bg-zinc-950/70 border-0 text-white mb-2"
                    rel="opener"
                    onClick={(event) => {
                      if (inIframe()) {
                        window.open(
                          "/api/login/google",
                          "google-login",
                          "width=600,height=600"
                        );
                        event.preventDefault();
                      }
                    }}
                  >
                    <GoogleIcon /> Sign in with Google
                  </a>
                ),
              })
            )}
            <a className="text-1xl mb-2 text-white link" href="/docs">
              docs/user guide
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

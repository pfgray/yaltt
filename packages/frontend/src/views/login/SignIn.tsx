import * as React from "react";
import {
  formBody,
  post,
  RequestError,
  RequestService,
} from "../../lib/api/request";
import * as Eff from "@effect/io/Effect";
import {
  pipe,
  Either,
  Option,
  ReadonlyArray,
  Effect,
  Equivalence,
} from "effect";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../lib/react-router/useQuery";
import img from "../../img/bg.jpg";
import { getLoginMechanisms } from "../../lib/auth/authApi";
import { WithRequest } from "../../lib/api/WithRequest";
import { provideRequestService } from "../../lib/api/requestServiceImpl";
import { GoogleIcon } from "./GoogleIcon";

export default function SignIn() {
  const navigate = useNavigate();
  let query = useQuery();

  const [loginMechanisms, setLoginMechanisms] = React.useState<
    Option.Option<
      Either.Either<RequestError, { types: readonly ("local" | "google")[] }>
    >
  >(Option.none);

  const effect = pipe(
    provideRequestService(getLoginMechanisms),
    Eff.tap((a) =>
      Eff.sync(() => {
        setLoginMechanisms(Option.some(Either.right(a)));
      })
    ),
    Eff.onError((err) =>
      Eff.sync(() => {
        console.log("Error", err);
        if (err._tag === "Fail") {
          setLoginMechanisms(Option.some(Either.left(err.error)));
        }
      })
    )
  );

  React.useEffect(() => {
    Eff.runCallback(effect);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("sending: to", import.meta.env.VITE_API_URL, {
      username: data.get("username"),
      password: data.get("password"),
    });
    Eff.runCallback(
      pipe(
        post("/api/login/password", formBody(data)),
        Eff.flatMap(() =>
          Eff.async<never, never, {}>((resume) => {
            const redirectUrl = query.get("redirectUrl") || "/";
            console.log("REDIRECTING TO:", redirectUrl);
            navigate(redirectUrl, {
              replace: true,
            });
            resume(Eff.succeed({}));
          })
        ),
        Eff.provideService(RequestService, {
          config: { baseUrl: import.meta.env.VITE_API_URL },
        })
      ),
      (exit) => {
        console.log("finished?", exit);
      }
    );
  };

  return (
    <div
      // style={
      //   {
      //     //backgroundImage: `url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80)`,
      //   }
      // }
      style={{ backgroundImage: `url(${img})` }}
      className="h-screen w-screen bg-cover bg-center bg-gradient-to-r from-cyan-500 to-blue-500"
    >
      <div
        className="h-screen w-screen bg-cover bg-center bg-zinc-950/50 flex flex-col justify-center"
        data-theme="dark"
      >
        <form onSubmit={handleSubmit}>
          <div className="container mx-auto flex flex-col items-center">
            <h1 className="text-3xl font-bold underline mb-4 text-white">
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
                onNone: () => (
                  <></>
                ),
                onSome: () => (
                  <a
                    type="button"
                    href="/api/login/google"
                    className="btn btn-wide bg-zinc-950/70 border-0 text-white"
                  >
                    <GoogleIcon /> Sign in with Google
                  </a>
                ),
              })
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

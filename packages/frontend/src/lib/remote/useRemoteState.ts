import { useState } from "react";
import { Effect, Either, pipe } from "effect";
import { RequestError, RequestService } from "../../lib/api/request";
import { provideRequestService } from "../../lib/api/requestServiceImpl";

export type RemoteState<E, A> =
  | {
      tag: "initial";
    }
  | {
      tag: "loading";
    }
  | {
      tag: "error";
      error: E;
    }
  | {
      tag: "loaded";
      value: A;
    };

type EffectData<T> = T extends Effect.Effect<
  RequestService,
  RequestError,
  infer A
>
  ? A
  : unknown;

export const useRemoteState = <
  F extends (...a: any[]) => Effect.Effect<RequestService, RequestError, any>
>(
  eff: F
): {
  data: RemoteState<RequestError, EffectData<ReturnType<F>>>;
  fetch: (...params: Parameters<F>) => void;
} => {
  const [data, setData] = useState<
    RemoteState<RequestError, EffectData<ReturnType<F>>>
  >({
    tag: "initial" as const,
  });
  const fetch = (...params: Parameters<F>) => {
    setData({
      tag: "loading",
    });
    pipe(
      eff(...params),
      Effect.either,
      provideRequestService,
      Effect.runPromise
    )
      .then(
        Either.match({
          onRight: (value) => {
            setData({
              tag: "loaded",
              value,
            });
          },
          onLeft: (error) => {
            setData({
              tag: "error",
              error,
            });
          },
        })
      )
      .catch((e) => {
        setData({
          tag: "error",
          error: {
            tag: "req_client_error",
            status: 100,
            body: {},
          },
        });
      });
  };
  return {
    data,
    fetch,
  };
};

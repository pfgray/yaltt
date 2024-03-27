import { useState } from "react";
import { Effect, Either, pipe } from "effect";
import { RequestError, RequestService } from "../../lib/api/request";
import { provideRequestService } from "../../lib/api/requestServiceImpl";

export type RemoteState<E, A> =
  | {
      _tag: "initial";
    }
  | {
      _tag: "loading";
    }
  | {
      _tag: "error";
      error: E;
    }
  | {
      _tag: "loaded";
      value: A;
    };

type EffectData<T> = T extends Effect.Effect<
  infer A,
  RequestError,
  RequestService
>
  ? A
  : unknown;

export const useRemoteState = <
  F extends (...a: any[]) => Effect.Effect<any, RequestError, RequestService>
>(
  eff: F
): {
  data: RemoteState<RequestError, EffectData<ReturnType<F>>>;
  fetch: (...params: Parameters<F>) => void;
} => {
  const [data, setData] = useState<
    RemoteState<RequestError, EffectData<ReturnType<F>>>
  >({
    _tag: "initial" as const,
  });
  const fetch = (...params: Parameters<F>) => {
    setData({
      _tag: "loading",
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
              _tag: "loaded",
              value,
            });
          },
          onLeft: (error) => {
            setData({
              _tag: "error",
              error,
            });
          },
        })
      )
      .catch((e) => {
        setData({
          _tag: "error",
          error: {
            _tag: "req_client_error",
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

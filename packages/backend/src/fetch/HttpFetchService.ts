import { FetchService } from "./FetchService";
import { pipe, Effect } from "effect";
import fetch from "node-fetch";

export const mkHttpFetchService = (): FetchService => {
  return {
    fetch: (url, init) => {
      return pipe(
        Effect.tryPromise(() => fetch(url, init)),
        Effect.mapError((err) => ({ tag: "fetch_error", reason: err }))
      );
    },
  };
};

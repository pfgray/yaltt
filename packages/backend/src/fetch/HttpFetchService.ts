import { FetchService } from "./FetchService";
import { pipe, Effect } from "effect";
import * as fetch from "node-fetch";

export const provideHttpFetchService = Effect.provideService(FetchService, {
  fetch: (url: URL | fetch.RequestInfo, init?: fetch.RequestInit) => {
    return pipe(
      Effect.tryPromise(() => fetch.default(url, init)),
      Effect.mapError((err) => ({ _tag: "fetch_error" as const, reason: err }))
    );
  },
});

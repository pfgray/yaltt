import * as fetch from "node-fetch";
import * as S from "@effect/schema/Schema";

import { pipe, Effect, Option, Either, Context } from "effect";

export type FetchError = {
  tag: "fetch_error";
  reason: unknown;
};
export type FetchJsonParseError = {
  tag: "fetch_json_parse_error";
  body: unknown;
  reason: unknown;
};

export interface FetchService {
  fetch: (
    url: URL | fetch.RequestInfo,
    init?: fetch.RequestInit
  ) => Effect.Effect<never, FetchError, fetch.Response>;
}

export const FetchService = Context.Tag<FetchService>();

export const Fetch = {
  get: (url: URL | string, init?: fetch.RequestInit) => {
    return FetchService.pipe(
      Effect.flatMap((fs) => fs.fetch(url, init)),
      Effect.flatMap((resp) =>
        pipe(
          Effect.tryPromise(() => resp.json()),
          Effect.mapError(
            (e): FetchJsonParseError => ({
              tag: "fetch_json_parse_error",
              body: resp.body,
              reason: e,
            })
          )
        )
      )
    );
  },
  post: (url: URL | string, body?: unknown, init?: fetch.RequestInit) => {
    return FetchService.pipe(
      Effect.flatMap((fs) =>
        fs.fetch(url, {
          ...init,
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            ...init?.headers,
          },
          method: "POST",
        })
      ),
      Effect.flatMap((resp) =>
        pipe(
          Effect.tryPromise(() => resp.json()),
          Effect.mapError(
            (e): FetchJsonParseError => ({
              tag: "fetch_json_parse_error",
              body: resp.body,
              reason: e,
            })
          )
        )
      )
    );
  },
};

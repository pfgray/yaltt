import { pipe, Either, Option, ReadonlyArray, Effect, Context } from "effect";
import * as PE from "@effect/schema/ParseResult";
import * as S from "@effect/schema/Schema";
import * as P from "@effect/schema/Parser";
import { match } from "@yaltt/model";
import { flow } from "effect/Function";

export class RequestService extends Context.Tag("Request")<
  RequestService,
  {
    config: {
      baseUrl: string;
    };
  }
>() {}

interface Response {
  status: number;
  body: unknown;
}

type Method = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

export type PostData = FormPostData | JsonPostData;

export interface FormPostData {
  _tag: "form_post_data";
  body: FormData;
}

export const formBody = (body: FormData): FormPostData => ({
  _tag: "form_post_data",
  body,
});

export interface JsonPostData {
  _tag: "json_post_data";
  body: unknown;
}
export const jsonBody = (body: unknown): JsonPostData => ({
  _tag: "json_post_data",
  body,
});

const request_ = (
  method: Method,
  url: string | URL,
  options?: {
    body?: PostData;
  }
) =>
  pipe(
    RequestService.pipe(
      Effect.flatMap(({ config }) =>
        Effect.async<Response, never, never>((resume) => {
          const req = new XMLHttpRequest();
          req.addEventListener("load", () => {
            resume(
              Effect.succeed({
                body: JSON.parse(req.response),
                status: req.status,
              })
            );
          });
          req.open(method, `${config.baseUrl}${url}`);
          req.setRequestHeader("Accept", "application/json");
          pipe(
            options,
            Option.fromNullable,
            Option.bindTo("options"),
            Option.bind("body", ({ options }) =>
              Option.fromNullable(options.body)
            ),
            Option.match({
              onNone: () => {
                req.send();
              },
              onSome: ({ options, body }) => {
                pipe(
                  body,
                  match({
                    form_post_data: () => Option.none<string>(),
                    json_post_data: () => Option.some("application/json"),
                  }),
                  Option.match({
                    onNone: () => {},
                    onSome: (contentType) => {
                      req.setRequestHeader("Content-Type", contentType);
                    },
                  })
                );

                const data = pipe(
                  body,
                  match({
                    form_post_data: ({ body }) => body,
                    json_post_data: ({ body }) => JSON.stringify(body),
                  })
                );
                // req.withCredentials = true;
                req.send(data);
              },
            })
          );
          return Effect.sync(() => req.abort());
        })
      )
    )
  );

/**
 * Represents 4xx errors
 */
export interface ClientError {
  _tag: "req_client_error";
  status: number;
  body: unknown;
}

/**
 * Represents 5xx errors
 */
export interface ServerError {
  _tag: "req_server_error";
  status: number;
  body: unknown;
}

export type RequestError = ClientError | ServerError | DecodeError;

const handleErrorStatus = Effect.flatMap(
  (
    resp: Response
  ): Effect.Effect<Response, ClientError | ServerError, never> => {
    if (resp.status >= 400 && resp.status < 500) {
      return Effect.fail({ _tag: "req_client_error", ...resp } as const);
    } else if (resp.status >= 500) {
      return Effect.fail({ _tag: "req_server_error", ...resp } as const);
    } else {
      return Effect.succeed(resp);
    }
  }
);

/**
 * Represents a resp body that doesn't match a schema
 */
export interface DecodeError {
  _tag: "decode_error";
  errors: PE.ParseError;
  actual: unknown;
}

const decodeRespBody = <A>(schema: S.Schema<A, any>) =>
  Effect.flatMap(
    (resp: Response): Effect.Effect<A, DecodeError, never> =>
      pipe(
        resp.body,
        S.decode(schema),
        (a) => a,
        Effect.mapError(
          (errors): DecodeError => ({
            _tag: "decode_error",
            errors,
            actual: resp.body,
          })
        )
      )
  );

export const get = (url: string | URL) =>
  pipe(request_("GET", url, {}), handleErrorStatus);

export const getDecode = <A>(s: S.Schema<any, A>) =>
  flow(get, decodeRespBody(s));

export const post = (url: string | URL, body?: PostData) =>
  pipe(
    request_("POST", url, {
      body,
    }),
    handleErrorStatus
  );

export const postDecode = <A>(s: S.Schema<A>) => flow(post, decodeRespBody(s));

export const delete_ = (url: string | URL, body?: PostData) =>
  pipe(
    request_("DELETE", url, {
      body,
    }),
    handleErrorStatus
  );

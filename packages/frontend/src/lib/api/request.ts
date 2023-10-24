import { pipe, Either, Option, ReadonlyArray, Effect, Context } from "effect";
import * as PE from "@effect/schema/ParseResult";
import * as S from "@effect/schema/Schema";
import * as P from "@effect/schema/Parser";
import { match } from "@yaltt/model";
import { flow } from "effect/Function";

export interface RequestService {
  config: {
    baseUrl: string;
  };
}

export const RequestService = Context.Tag<RequestService>();

interface Response {
  status: number;
  body: unknown;
}

type Method = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

export type PostData = FormPostData | JsonPostData;

export interface FormPostData {
  tag: "form_post_data";
  body: FormData;
}

export const formBody = (body: FormData): FormPostData => ({
  tag: "form_post_data",
  body,
});

export interface JsonPostData {
  tag: "json_post_data";
  body: unknown;
}
export const jsonBody = (body: unknown): JsonPostData => ({
  tag: "json_post_data",
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
        Effect.async<never, never, Response>((resume) => {
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
  tag: "req_client_error";
  status: number;
  body: unknown;
}

/**
 * Represents 5xx errors
 */
export interface ServerError {
  tag: "req_server_error";
  status: number;
  body: unknown;
}

export type RequestError = ClientError | ServerError | DecodeError;

const handleErrorStatus = Effect.flatMap<
  Response,
  never,
  ClientError | ServerError,
  Response
>((resp) => {
  if (resp.status >= 400 && resp.status < 500) {
    return Effect.fail({ tag: "req_client_error", ...resp } as const);
  } else if (resp.status >= 500) {
    return Effect.fail({ tag: "req_server_error", ...resp } as const);
  } else {
    return Effect.succeed(resp);
  }
});

/**
 * Represents a resp body that doesn't match a schema
 */
export interface DecodeError {
  tag: "decode_error";
  errors: PE.ParseError;
  actual: unknown;
}

const decodeRespBody = <A>(schema: S.Schema<any, A>) =>
  Effect.flatMap<Response, never, DecodeError, A>((resp) =>
    pipe(
      resp.body,
      P.parse(schema),
      Effect.mapError(
        (errors): DecodeError => ({
          tag: "decode_error",
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

import * as Eff from "@effect/io/Effect";
import { flow, pipe } from "@fp-ts/core/Function";
import { NonEmptyReadonlyArray } from "@fp-ts/core/ReadonlyArray";
import * as PE from "@fp-ts/schema/ParseResult";
import * as P from "@fp-ts/schema/Parser";
import * as S from "@fp-ts/schema";
import * as Context from "@fp-ts/data/Context";
import * as O from "@fp-ts/core/Option";
import { match } from "@yaltt/model";

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
    Eff.serviceWithEffect(RequestService, ({ config }) =>
      Eff.asyncInterrupt<never, never, Response>((resume) => {
        const req = new XMLHttpRequest();
        req.addEventListener("load", () => {
          resume(
            Eff.succeed({
              body: JSON.parse(req.response),
              status: req.status,
            })
          );
        });
        req.open(method, `${config.baseUrl}${url}`);
        pipe(
          options,
          O.fromNullable,
          O.bindTo("options"),
          O.bind("body", ({ options }) => O.fromNullable(options.body)),
          O.match(
            () => {
              req.send();
            },
            ({ options, body }) => {
              pipe(
                body,
                match({
                  form_post_data: () => O.none<string>(),
                  json_post_data: () => O.some("application/json"),
                }),
                O.match(
                  () => {},
                  (contentType) => {
                    req.setRequestHeader("Content-Type", contentType);
                  }
                )
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
            }
          )
        );
        return Eff.sync(() => req.abort());
      })
    )
  );

/**
 * Represents 4xx errors
 */
interface ClientError {
  tag: "req_client_error";
  status: number;
  body: unknown;
}

/**
 * Represents 5xx errors
 */
interface ServerError {
  tag: "req_server_error";
  status: number;
  body: unknown;
}

const handleErrorStatus = Eff.flatMap<
  Response,
  never,
  ClientError | ServerError,
  Response
>((resp) => {
  if (resp.status >= 400 && resp.status < 500) {
    return Eff.fail({ tag: "req_client_error", ...resp } as const);
  } else if (resp.status >= 500) {
    return Eff.fail({ tag: "req_server_error", ...resp } as const);
  } else {
    return Eff.succeed(resp);
  }
});

/**
 * Represents a resp body that doesn't match a schema
 */
export interface DecodeError {
  tag: "decode_error";
  errors: NonEmptyReadonlyArray<PE.ParseError>;
  actual: unknown;
}

const decodeRespBody = <A>(schema: S.Schema<A>) =>
  Eff.flatMap<Response, never, DecodeError, A>((resp) =>
    pipe(
      resp.body,
      P.decode(schema),
      Eff.fromEither,
      Eff.mapError(
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

export const getDecode = <A>(s: S.Schema<A>) => flow(get, decodeRespBody(s));

export const post = (url: string | URL, body?: PostData) =>
  pipe(
    request_("POST", url, {
      body,
    }),
    handleErrorStatus
  );

export const postDecode = <A>(s: S.Schema<A>) => flow(post, decodeRespBody(s));

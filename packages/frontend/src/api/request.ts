import * as Eff from "@effect/io/Effect";
import { flow, pipe } from "@fp-ts/data/Function";
import { NonEmptyReadonlyArray } from "@fp-ts/data/ReadonlyArray";
import * as PE from "@fp-ts/schema/ParseError";
import * as P from "@fp-ts/schema/Parser";
import * as S from "@fp-ts/schema/Schema";
import * as Context from "@fp-ts/data/Context";

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

const request_ = (
  method: Method,
  url: string | URL,
  options: {
    body?: unknown;
    contentType?: string;
  }
) =>
  pipe(
    Eff.serviceWithEffect(RequestService, ({ config }) =>
      Eff.asyncInterrupt<never, never, Response>((resume) => {
        const req = new XMLHttpRequest();
        req.addEventListener("load", () => {
          resume(
            Eff.succeed({
              body: req.response,
              status: req.status,
            })
          );
        });
        req.open;
        req.open(method, `${config.baseUrl}${url}`);
        if ("body" in options) {
          const contentType =
            "contentType" in options && typeof options.contentType === "string"
              ? options.contentType
              : "application/json";

          req.setRequestHeader("Content-Type", contentType);
          req.send(JSON.stringify(options.body));
        } else {
          req.send();
        }
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
  } else if (resp.status < 500) {
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
}

const decodeRespBody = <A>(schema: S.Schema<A>) =>
  Eff.flatMap<Response, never, DecodeError, A>((resp) =>
    pipe(
      resp.body,
      P.decode(schema),
      Eff.fromEither,
      Eff.mapError((errors): DecodeError => ({ tag: "decode_error", errors }))
    )
  );

export const get = (url: string | URL) =>
  pipe(request_("GET", url, {}), handleErrorStatus);

export const getDecode = <A>(s: S.Schema<A>) => flow(get, decodeRespBody(s));

export const post = (url: string | URL, body: unknown) =>
  pipe(
    request_("POST", url, {
      body,
    }),
    handleErrorStatus
  );

export const postDecode = <A>(s: S.Schema<A>) => flow(post, decodeRespBody(s));

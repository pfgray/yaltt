import RedisStore from "connect-redis";
import * as cors from "cors";
import { Effect, pipe } from "effect";
import * as express from "express";
import * as session from "express-session";
import * as passport from "passport";
import { createClient } from "redis";
import { adminRouter } from "./admin/adminRouter";
import { authRouter } from "./auth/authRouter";
import { QueryService } from "./db/QueryService";
import { mkTransactionalPgService } from "./db/TransactionalPgService";
import { DecodeQueryError, PgError, pool } from "./db/db";
import { addOrUpdateUserWithLocalPassword } from "./model/users";
import { appRouter } from "./routes/apps/appRouter";
import { agsRouter } from "./routes/ags/agsRouter";
import { launchRouter } from "./routes/registrations/launchRouter";
import { registrationRouter } from "./routes/registrations/registrationsRouter";
import {
  effRequestHandler,
  successResponse,
} from "./express/effRequestHandler";
import { getIconForApp } from "./routes/apps/appIcon";
import { match } from "endpoint-ts";
import { formatError } from "@effect/schema/TreeFormatter";
import { runMigrations } from "./db/migrations";

const app = express.default();

const port = 3000;

const printDecodeQueryError = (e: DecodeQueryError) =>
  `Could not decode query result: ${formatError(e.error.error)} --- \n${
    e.error.actual
  }`;

const printPgError = (e: PgError) =>
  `PG error: ${e.cause.message}\n${e.cause.stack}`;

const pgService = mkTransactionalPgService(pool);
// Run migrations before starting the application
pipe(runMigrations(), pgService.provide, Effect.runPromiseExit).then((exit) => {
  if (exit._tag === "Failure") {
    if (exit.cause._tag === "Fail") {
      pipe(
        exit.cause.error,
        match({
          generic_error: (e) =>
            e.cause instanceof Error
              ? `Error migrating: ${e.message}, cause: ${e.cause.message}`
              : `Error migrating: ${e.message}, cause: ${e.cause}`,
          migration_error: (e) =>
            `Error in migration ${e.filename}: ${pipe(
              e.cause,
              match({
                decode_query_error: printDecodeQueryError,
                pg_error: printPgError,
              })
            )}`,
          decode_query_error: printDecodeQueryError,
          pg_error: printPgError,
        }),
        (message) => {
          console.log(message);
        }
      );
    }
    console.error("Failed to run migrations:", exit.cause);
    process.exit(1);
  } else {
    console.log("Migrations completed successfully");
  }
});

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
  },
});
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "yaltt:",
});

app.use(
  cors.default({
    origin: function (origin, callback) {
      callback(null, origin);
    },
  })
);

console.log("initializing session: ", process.env.NODE_ENV);

app.use(
  session.default({
    store: redisStore,
    secret: "keyboard cat",
    resave: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      // ended up doing this in nginx instead https://serverfault.com/a/883824
      // secure: process.env.NODE_ENV !== "development",
      // sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax",
    }, // 30 days
    saveUninitialized: false,
  })
);

app.use(((passport as any).default as typeof passport).authenticate("session"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/api", authRouter);
app.use(appRouter);
app.use(registrationRouter);
app.use(agsRouter);
app.use("/api", launchRouter);
app.use(adminRouter);

app.get("/api/no_canvas_extension", (req, res) => {
  res.json({
    title: "Yaltt",
    description: "Yet another LTI test tool",
    target_link_uri: "http://yaltt.inst.test/api/registrations/1/launch",
    oidc_initiation_url: "http://yaltt.inst.test/api/registrations/1/login",
    public_jwk_url: "http://yaltt.inst.test/api/registrations/1/jwks",
    scopes: [],
    extensions: [
      {
        platform: "canvas.instructure.coms",
        windowTarget: "_blank",
        required_permissions: "asdf",
        settings: {
          placements: [
            {
              windowTarget: "_blank",
              required_permissions: "asdf",
              placement: "course_navigation",
              target_link_uri:
                "http://yaltt.inst.test/api/registrations/1/resource_link",
              message_type: "LtiResourceLinkRequest",
            },
          ],
        },
      },
    ],
  });
});

app.get("/api/invalid_placements", (req, res) => {
  res.json({
    title: "Yaltt",
    description: "Yet another LTI test tool",
    target_link_uri: "http://yaltt.inst.test/api/registrations/1/launch",
    oidc_initiation_url: "http://yaltt.inst.test/api/registrations/1/login",
    public_jwk_url: "http://yaltt.inst.test/api/registrations/1/jwks",
    scopes: [],
    extensions: [
      {
        platform: "canvas.instructure.com",
        settings: {
          windowTarget: "_self",
          placements: [
            {
              windowTarget: "_self",
              visibility: "foo",
              default: "hidden",
              use_tray: "true",
              placement: "course_navigation",
              target_link_uri:
                "http://yaltt.inst.test/api/registrations/1/resource_link",
              message_type: "LtiResourceLinkRequest",
            },
          ],
        },
      },
    ],
  });
});

if (process.env.ADMIN_USER && process.env.ADMIN_PASSWORD) {
  const username = process.env.ADMIN_USER.trim();
  if (username.length > 0) {
    const pgService = mkTransactionalPgService(pool);
    pipe(
      addOrUpdateUserWithLocalPassword(
        username,
        process.env.ADMIN_PASSWORD,
        "admin"
      ),
      pgService.provide,
      Effect.runPromiseExit
    ).then((exit) => {
      if (exit._tag === "Failure") {
        if (exit.cause._tag === "Fail") {
          pipe(
            exit.cause.error,
            match({
              data_integrity_error: (e) => `Data Integrity Error: ${e.message}`,
              decode_query_error: (e) =>
                `Could not decode query result: ${formatError(e.error.error)}`,
              hash_error: (e) =>
                `Hash Error: ${e.cause.message}\n${e.cause.stack}`,
              no_record_found: (e) => `No Record found: ${e.query}`,
              pg_error: (e) => `PG error: ${e.cause.message}\n${e.cause.stack}`,
            }),
            (message) => {
              console.log(message);
            }
          );
        } else {
          console.error("Failed to create admin user: ", exit.cause);
        }
        pgService.rollback();
      } else {
        pgService.commit();
        console.log("Created admin user: ", username);
      }
    });
  }
}

app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    NODE_ENV: process.env.NODE_ENV,
    YALTT_HOST: process.env.YALTT_HOST,
  });
});

app.get(
  "/favicon.svg",
  pipe(
    successResponse(
      getIconForApp({ name: "Yaltt" }),
      { "Content-Type": "image/svg+xml" },
      true
    ),
    Effect.succeed,
    effRequestHandler
  )
);

app.get(
  "/api/icon.svg",
  pipe(
    successResponse(
      getIconForApp({ name: "Yaltt" }),
      { "Content-Type": "image/svg+xml" },
      true
    ),
    Effect.succeed,
    effRequestHandler
  )
);

if (process.env.DOCS_ROOT) {
  console.log(`Using DOCS_ROOT: ${process.env.DOCS_ROOT}`);
  app.use("/docs", express.static(process.env.DOCS_ROOT));
}

if (process.env.STATIC_ROOT) {
  console.log(`Using STATIC_ROOT: ${process.env.STATIC_ROOT}`);
  app.use("/assets", express.static(process.env.STATIC_ROOT + "/assets"));
  app.get("*", (req, res) => {
    res.sendFile(process.env.STATIC_ROOT + "/index.html");
  });
}

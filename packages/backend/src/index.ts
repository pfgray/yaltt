import RedisStore from "connect-redis";
import * as cors from "cors";
import { Effect, pipe } from "effect";
import * as express from "express";
import * as session from "express-session";
import * as passport from "passport";
import { createClient } from "redis";
import { adminRouter } from "./admin/adminRouter";
import { authRouter } from "./auth/authRouter";
import { PgService } from "./db/PgService";
import { mkTransactionalPgService } from "./db/TransactionalPgService";
import { pool } from "./db/db";
import { addOrUpdateUserWithLocalPassword } from "./model/users";
import { appRouter } from "./routes/apps/appRouter";
import { launchRouter } from "./routes/registrations/launchRouter";
import { registrationRouter } from "./routes/registrations/registrationsRouter";

const app = express.default();
const port = 3000;

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

app.get("/login", function (req, res, next) {
  res.render("login");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/api", authRouter);
app.use("/api", appRouter);
app.use("/api", registrationRouter);
app.use("/api", launchRouter);
app.use("/api", adminRouter);

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
      Effect.provideService(PgService, pgService.service),
      Effect.runPromiseExit
    ).then((exit) => {
      if (exit._tag === "Failure") {
        console.error("Failed to create admin user: ", exit.cause);
        pgService.rollback();
      } else {
        pgService.commit();
        console.log("Created admin user: ", username);
      }
    });
  }
}

if (process.env.STATIC_ROOT) {
  console.log(`Using STATIC_ROOT: ${process.env.STATIC_ROOT}`);
  app.use("/assets", express.static(process.env.STATIC_ROOT + "/assets"));
  app.get("*", (req, res) => {
    res.sendFile(process.env.STATIC_ROOT + "/index.html");
  });
}

app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    NODE_ENV: process.env.NODE_ENV,
  });
});

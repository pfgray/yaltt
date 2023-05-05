import * as express from "express";
import { pool } from "./db/db";
import * as passport from "passport";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as cors from "cors";
import { authRouter } from "./auth/authRouter";
import { appRouter } from "./routes/apps/appRouter";
import {
  effRequestHandler,
  successResponse,
} from "./express/effRequestHandler";
import { addUserWithLocalPassword } from "./model/users";
import * as connect_pg_simple_ from "connect-pg-simple";
import { registrationRouter } from "./routes/registrations/registrationsRouter";
import { pipe, Effect, Option, Either } from "effect";
import { launchRouter } from "./routes/registrations/launchRouter";
import RedisStore from "connect-redis";
import { createClient } from "redis";

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

app.use(
  session.default({
    store: redisStore,
    secret: "keyboard cat",
    resave: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    saveUninitialized: false,
  })
);

app.use(((passport as any).default as typeof passport).authenticate("session"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", function (req, res, next) {
  res.render("login");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get(
  "/insert",
  effRequestHandler(
    Effect.map(addUserWithLocalPassword("peegee", "password"), successResponse)
  )
);

app.use("/api", authRouter);
app.use("/api", appRouter);
app.use("/api", registrationRouter);
app.use("/api", launchRouter);

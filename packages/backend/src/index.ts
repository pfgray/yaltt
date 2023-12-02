import * as express from "express";
import { pool } from "./db/db";
import * as passport from "passport";
import * as session from "express-session";
import * as cors from "cors";
import { authRouter } from "./auth/authRouter";
import { appRouter } from "./routes/apps/appRouter";
import {
  effRequestHandler,
  successResponse,
} from "./express/effRequestHandler";
import { addOrUpdateUserWithLocalPassword, addUserWithLocalPassword } from "./model/users";
import { registrationRouter } from "./routes/registrations/registrationsRouter";
import { pipe, Effect, Option, Either } from "effect";
import { launchRouter } from "./routes/registrations/launchRouter";
import RedisStore from "connect-redis";
import { createClient } from "redis";
import { PgService } from "./db/PgService";
import { mkTransactionalPgService } from "./db/TransactionalPgService";
import { adminRouter } from "./admin/adminRouter";

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

app.use("/api", authRouter);
app.use("/api", appRouter);
app.use("/api", registrationRouter);
app.use("/api", launchRouter);
app.use("/api", adminRouter)

if(process.env.ADMIN_USER && process.env.ADMIN_PASSWORD) {
  const username = process.env.ADMIN_USER.trim();
  if(username.length > 0) {
    const pgService = mkTransactionalPgService(pool);
    pipe(
      addOrUpdateUserWithLocalPassword(username, process.env.ADMIN_PASSWORD, 'admin'),
      Effect.provideService(PgService, pgService.service),
      Effect.runPromiseExit
    ).then(exit => {
      if(exit._tag === 'Failure') {
        console.error('Failed to create admin user: ', exit.cause)
        pgService.rollback();
      } else {
        pgService.commit();
        console.log('Created admin user: ', username)
      }
    })
  }
}
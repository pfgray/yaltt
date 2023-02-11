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
  succcessResponse,
} from "./express/effRequestHandler";
import { addUserWithLocalPassword } from "./model/users";
import * as connect_pg_simple_ from "connect-pg-simple";
import { registrationRouter } from "./routes/registrations/registrationsRouter";
import * as Eff from "@effect/io/Effect";

const app = express.default();
const port = 3000;

app.use(
  cors.default({
    origin: function (origin, callback) {
      callback(null, origin);
    },
  })
);

app.use(
  session.default({
    store: new (connect_pg_simple_.default(session.default))({
      pool,
      createTableIfMissing: true,
    }),
    secret: "keyboard cat",
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser.default());
app.use(((passport as any).default as typeof passport).authenticate("session"));
app.use(function (req: any, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
});

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
    Eff.map(addUserWithLocalPassword("peegee", "password"), succcessResponse)
  )
);

app.use("/api", authRouter);
app.use("/api", appRouter);
app.use("/api", registrationRouter);

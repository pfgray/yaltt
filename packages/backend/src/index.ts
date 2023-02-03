import * as express from "express";
import { pool } from "./db/db";
import * as passport from "passport";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as cors from "cors";
import { authRouter } from "./auth/authRouter";
import { appRouter } from "./routes/apps/appRouter";
import { effRequestHandler } from "./express/effRequestHandler";
import { addUserWithLocalPassword } from "./model/users";

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
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
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
  effRequestHandler(addUserWithLocalPassword("peegee", "password"))
);

app.use("/api", authRouter);
app.use("/api", appRouter);

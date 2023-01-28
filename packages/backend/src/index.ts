import * as express from "express";
import { pool } from "./db/db";
import { addUserWithLocalPassword, getLoginByUsername } from "./model/users";
import * as Eff from "@effect/io/Effect";
import * as Cause from "@effect/io/Cause";
import { pipe } from "@fp-ts/data/Function";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", function (req, res, next) {
  res.render("login");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/foo", function (request, response, next) {
  pool.query("select * from users;", [], (err, res) => {
    if (err) {
      console.error(err);
      response.json({ error: err });
    } else {
      response.json(res.rows);
    }
  });
});

app.get("/bar", function (request, response) {
  Eff.unsafeRun(getLoginByUsername("paul"), (status) => {
    if (status._tag === "Failure") {
      console.error(status.cause._tag);
      if (Cause.isAnnotatedType(status.cause)) {
        console.error(JSON.stringify(status.cause.cause, null, 2));
      }
      response.json({ error: status.cause });
    } else {
      response.json(status.value);
    }
  });
});

app.get("/insert", function (request, response) {
  Eff.unsafeRun(addUserWithLocalPassword("paul", "password"), (status) => {
    console.log("done?");
    if (status._tag === "Failure") {
      console.error(status.cause._tag);
      if (Cause.isAnnotatedType(status.cause)) {
        console.error(JSON.stringify(status.cause.cause, null, 2));
      }
      response.json({ error: status.cause });
    } else {
      response.json(status.value);
    }
  });
});

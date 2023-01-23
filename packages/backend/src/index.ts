import * as express from "express";
import { pool } from './db/db'
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/login', function(req, res, next) {
  res.render('login');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get('/foo', function(request, response, next) {

  pool.query('select * from users;', [], (err, res) => {
    if(err) {
      console.error(err)
      response.json({error: err})
    } else {
      response.json(res.rows)
    }
  })
});

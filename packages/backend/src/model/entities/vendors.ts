import { User } from "@yaltt/model";
import * as S from "@fp-ts/schema/Schema";
import { query, query1 } from "../../db/db";
import { pipe } from "@fp-ts/data/Function";
import * as Eff from "@effect/io/Effect";

const VendorRow = S.struct({
  id: S.number,
  name: S.string,
  user_id: S.number,
});

export const getVendorsForUser = (u: User) =>
  pipe(
    query(VendorRow)(
      "select id, name, user_id from vendors where user_id = $1",
      [u.id]
    ),
    Eff.mapError((err) => {
      console.log("waaaaat", JSON.stringify(err, null, 2));
      return err;
    })
  );

export const createVendorForUser = (name: string, u: User) =>
  query1(VendorRow)(
    "insert into vendors (name, user_id) values ($1, $2) returning *",
    [name, u.id]
  );

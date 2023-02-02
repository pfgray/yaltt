import { pipe } from "@fp-ts/data/Function";
import * as S from "@fp-ts/schema/Schema";
import { Vendor } from "@yaltt/model";
import { getDecode, jsonBody, post } from "../../../lib/api/request";
import { provideRequestService } from "../../../lib/api/requestServiceImpl";
import * as F from "../../../lib/forms/form";
import { List } from "../List";

const columns = ["Id", "Name"];
const newVendorForm = F.mkForm({
  name: F.string("Name"),
})((fields) =>
  pipe(provideRequestService(post("/api/vendors", jsonBody(fields))))
);

export const Vendors = () => {
  return (
    <List
      newForm={newVendorForm}
      editForm={newVendorForm}
      entityName="Vendor"
      fetchValues={getDecode(S.array(Vendor))("/api/vendors")}
      renderValues={(vendors) => ({
        columns,
        rows: vendors.map((v) => [v.id, v.name]),
      })}
    ></List>
  );
};

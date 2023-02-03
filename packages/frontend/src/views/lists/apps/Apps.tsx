import { pipe } from "@fp-ts/data/Function";
import * as S from "@fp-ts/schema/Schema";
import { App } from "@yaltt/model";
import { getDecode, jsonBody, post } from "../../../lib/api/request";
import { provideRequestService } from "../../../lib/api/requestServiceImpl";
import * as F from "../../../lib/forms/form";
import { List } from "../List";

const columns = ["Id", "Name"];
const newAppForm = F.mkForm({
  name: F.string("Name"),
})((fields) =>
  pipe(provideRequestService(post("/api/apps", jsonBody(fields))))
);

export const Apps = () => {
  return (
    <List
      newForm={newAppForm}
      editForm={newAppForm}
      entityName="App"
      fetchValues={getDecode(S.array(App))("/api/apps")}
      renderValues={(apps) => ({
        columns,
        rows: apps.map((v) => [v.id, v.name]),
      })}
    ></List>
  );
};

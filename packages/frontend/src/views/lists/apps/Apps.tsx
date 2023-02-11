import { pipe } from "@fp-ts/core/Function";
import * as S from "@fp-ts/schema";
import { Link } from "@mui/material";
import { App } from "@yaltt/model";
import { getDecode, jsonBody, post } from "../../../lib/api/request";
import { provideRequestService } from "../../../lib/api/requestServiceImpl";
import * as F from "../../../lib/forms/form";
import { List } from "../List";
import { Link as RouterLink } from "react-router-dom";

const columns = [
  "Id",
  {
    name: "Name",
    options: {
      filter: true,
      customBodyRender: (value: App) => {
        return (
          <Link component={RouterLink} to={`/apps/${value.id}/registrations`}>
            {value.name}
          </Link>
        );
      },
    },
  },
  {
    name: "JWKS Url",
    options: {
      filter: true,
      customBodyRender: (value: App) => {
        return (
          <Link
            href={`/api/apps/${value.id}/jwks`}
          >{`/api/apps/${value.id}/jwks`}</Link>
        );
      },
    },
  },
];

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
        rows: apps.map((v) => [v.id, v as any, v as any]),
      })}
    ></List>
  );
};

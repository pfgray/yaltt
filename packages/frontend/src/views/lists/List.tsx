import * as React from "react";
import * as F from "../../lib/forms/form";

import * as Eff from "@effect/io/Effect";
import {
  getDecode,
  jsonBody,
  post,
  RequestService,
} from "../../lib/api/request";
import { Typography, Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { Vendor } from "@yaltt/model";
import MUIDataTable from "mui-datatables";
import { provideRequestService } from "../../lib/api/requestServiceImpl";
import { WithRequest } from "../../lib/api/WithRequest";
import { renderForm } from "../../lib/forms/renderForm";
import AddIcon from "@mui/icons-material/Add";
import * as S from "@fp-ts/schema/Schema";
import { pipe } from "@fp-ts/data/Function";

type ListProps<
  K extends string,
  R extends Record<K, F.FormField<any, any>>,
  K2 extends string,
  R2 extends Record<K2, F.FormField<any, any>>,
  A
> = {
  entityName: string;
  newForm: F.Form<K, R>;
  editForm: F.Form<K2, R2>;
  fetchValues: Eff.Effect<RequestService, unknown, readonly A[]>;
  renderValues: (as: readonly A[]) => {
    columns: string[];
    rows: (string | number)[][];
  };
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const List = <
  K extends string,
  R extends Record<K, F.FormField<any, any>>,
  K2 extends string,
  R2 extends Record<K2, F.FormField<any, any>>,
  A
>(
  props: ListProps<K, R, K2, R2, A>
) => {
  const [open, setOpen] = React.useState(false);
  return (
    <WithRequest eff={props.fetchValues}>
      {(values) => {
        const { columns, rows } = props.renderValues(values);
        return (
          <>
            <MUIDataTable
              title={
                <>
                  <Typography variant="h6" noWrap component="h6">
                    Vendors
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpen(true)}
                  >
                    New
                  </Button>
                </>
              }
              data={rows}
              columns={columns}
              options={{
                download: false,
                print: false,
                filter: false,
                search: false,
                viewColumns: false,
                pagination: false,
                elevation: 0,
              }}
            />
            <Modal
              open={open}
              onClose={() => {
                setOpen(false);
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <NewEntityForm
                  setOpen={setOpen}
                  form={props.newForm}
                  entityName={props.entityName}
                />
              </Box>
            </Modal>
          </>
        );
      }}
    </WithRequest>
  );
};

type NewEntityFormProps<
  K extends string,
  R extends Record<K, F.FormField<any, any>>
> = {
  form: F.Form<K, R>;
  setOpen: (b: boolean) => void;
  entityName: string;
};
const NewEntityForm = <
  K extends string,
  R extends Record<K, F.FormField<any, any>>
>(
  props: NewEntityFormProps<K, R>
) => {
  const entityForm = React.useMemo(
    () =>
      F.mkForm<K, R>(props.form.fields)((fields) =>
        pipe(
          props.form.onSubmit(fields),
          Eff.flatMap(() =>
            Eff.sync(() => {
              props.setOpen(false);
            })
          )
        )
      ),
    [props.setOpen]
  );
  return (
    <>
      <Typography variant="h6" noWrap component="h6">
        New {props.entityName}
      </Typography>
      {renderForm(entityForm)}
    </>
  );
};

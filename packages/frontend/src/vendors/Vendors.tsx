import { Vendor } from "@yaltt/model";
import * as React from "react";
import { get, getDecode, jsonBody, post } from "../api/request";
import { WithRequest } from "../api/WithRequest";
import * as S from "@fp-ts/schema/Schema";
import { pipe } from "@fp-ts/data/Function";
import * as RA from "@fp-ts/data/ReadonlyArray";
import MUIDataTable from "mui-datatables";
import { Box, Button, Modal, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as F from "../forms/form";
import * as Eff from "@effect/io/Effect";
import { provideRequestService } from "../api/requestServiceImpl";
import { renderForm } from "../forms/renderForm";

const columns = ["Id", "Name"];

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
export const Vendors = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <WithRequest eff={getDecode(S.array(Vendor))("/api/vendors")}>
      {(vendors) => (
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
            data={vendors.map((v) => [v.id, v.name])}
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
              <NewVendorForm setOpen={setOpen} />
            </Box>
          </Modal>
        </>
      )}
    </WithRequest>
  );
};

type NewVendorFormProps = {
  setOpen: (b: boolean) => void;
};
const NewVendorForm = (props: NewVendorFormProps) => {
  const vendorForm = React.useMemo(
    () =>
      F.mkForm({
        name: F.string("Name"),
      })((fields) => {
        console.log("submitting: ", fields);
        Eff.unsafeRun(
          provideRequestService(post("/api/vendors", jsonBody(fields))),
          (exit) => {
            props.setOpen(false);
            console.log("done with req:", exit);
          }
        );
      }),
    [props.setOpen]
  );
  return (
    <>
      <Typography variant="h6" noWrap component="h6">
        New Vendor
      </Typography>
      {renderForm(vendorForm)}
    </>
  );
};

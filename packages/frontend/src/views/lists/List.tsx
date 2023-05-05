import * as React from "react";
import * as F from "../../lib/forms/form";

import * as Eff from "@effect/io/Effect";
import { pipe } from "effect";
import { RequestService } from "../../lib/api/request";
import { WithRequest } from "../../lib/api/WithRequest";
import { renderManagedForm } from "../../lib/forms/renderManagedForm";

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
  columns: string[];
  renderRow: (a: A) => Array<JSX.Element | string | number>;
  width?: string | number;
  onEmpty?: (openNewModal: () => void) => JSX.Element;
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
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  return (
    <WithRequest eff={props.fetchValues}>
      {(values) => {
        // const { columns, rows } = props.renderValues(values);
        return (
          <>
            <div className="container mx-auto px-4">
              <div className="overflow-x-auto h-full">
                {props.onEmpty && values.length === 0 ? (
                  props.onEmpty(() => {
                    dialogRef.current?.showModal();
                  })
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        {props.columns.map((c) => (
                          <th>{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      {values.map(props.renderRow).map((row) => (
                        <tr>
                          {row.map((r) => (
                            <td>{r}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <dialog ref={dialogRef} className="modal">
              <div className="modal-box">
                <NewEntityForm
                  close={() => {
                    dialogRef.current?.close();
                  }}
                  form={props.newForm}
                  entityName={props.entityName}
                />
              </div>
            </dialog>
          </>
        );
      }}
    </WithRequest>
  );
};

export type NewEntityFormProps<
  R extends Record<string, F.FormField<any, any>>
> = {
  form: F.Form<F.KeyOf<keyof R>, R>;
  close: () => void;
  entityName: string;
  renderExtra?: () => JSX.Element;
};

export const NewEntityForm = <R extends Record<string, F.FormField<any, any>>>(
  props: NewEntityFormProps<R>
) => {
  const entityForm = React.useMemo(
    () =>
      F.mkForm(props.form.fields)((fields) =>
        pipe(
          props.form.onSubmit(fields),
          Eff.flatMap(() =>
            Eff.sync(() => {
              props.close();
            })
          )
        )
      ),
    [props.close]
  );
  return (
    <>
      <h3 className="font-bold text-lg mb-4">New {props.entityName}</h3>
      {renderManagedForm(entityForm, () => (
        <div className="modal-action">
          <button className="btn">Create</button>
        </div>
      ))}
    </>
  );
};

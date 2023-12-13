import * as React from "react";
import * as F from "../../lib/forms/form";

import * as Eff from "@effect/io/Effect";
import { pipe } from "effect";
import { RequestError, RequestService } from "../../lib/api/request";
import { WithRequest } from "../../lib/api/WithRequest";
import { renderManagedForm } from "../../lib/forms/renderManagedForm";

export type NewEntityFormProps<
  R extends Record<string, F.FormField<any, any>>
> = {
  form: F.Form<F.KeyOf<keyof R>, R>;
  close: () => void;
  entityName: string;
  renderExtra?: () => JSX.Element;
  afterSubmit?: Eff.Effect<never, unknown, void>;
  extraUnderHeader?: () => JSX.Element;
};

export const NewEntityForm = <R extends Record<string, F.FormField<any, any>>>(
  props: NewEntityFormProps<R>
) => {
  const entityForm = React.useMemo(
    () =>
      F.mkForm(props.form.fields)((fields) =>
        pipe(
          props.form.onSubmit(fields),
          Eff.flatMap(() => (props.afterSubmit ? props.afterSubmit : Eff.unit)),
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
      {props.extraUnderHeader && props.extraUnderHeader()}
      {renderManagedForm(entityForm, () => (
        <div className="modal-action">
          <button className="btn">Create</button>
        </div>
      ))}
    </>
  );
};
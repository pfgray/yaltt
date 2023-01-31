import * as S from "@fp-ts/schema/Schema";
import * as E from "@fp-ts/data/Either";
import * as Eff from "@effect/io/Effect";
import * as React from "react";
import { pipe } from "@fp-ts/data/Function";
import * as HM from "@fp-ts/data/HashMap";
import { Form, FormField } from "./form";
import * as RA from "@fp-ts/data/ReadonlyArray";
import * as O from "@fp-ts/data/Option";
import { Button, TextField } from "@mui/material";

export const renderForm = <
  K extends string,
  R extends Record<K, FormField<any, any>>
>(
  form: Form<K, R>
) => {
  const initialValues = React.useMemo(
    () =>
      pipe(
        form.fields,
        HM.struct,
        HM.mapWithIndex((value, key) => value.initialValue)
      ),
    [form]
  );

  const [fields, setFields] = React.useState(initialValues);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fieldObj = Array.from(HM.keys(fields)).reduce(
          (prev, next) => ({
            [next]: pipe(HM.get(next)(fields), O.getOrNull),
            ...prev,
          }),
          {}
        );
        // todo: validate?
        form.onSubmit(fieldObj as any);
      }}
    >
      {pipe(
        form.fields,
        HM.struct,
        HM.mapWithIndex((value, key) => {
          if (value.tag === "string") {
            return (
              <TextField
                margin="normal"
                label={value.label}
                key={key as string | number}
                name={key as string}
                fullWidth
                value={pipe(
                  fields,
                  HM.get(key),
                  O.getOrElse(() => "")
                )}
                type="text"
                onChange={(e) => setFields(HM.set(key, e.target.value))}
              />
            );
          } else if (value.tag === "password") {
            return (
              <TextField
                label={value.label}
                key={key as string | number}
                name={key as string}
                fullWidth
                margin="normal"
                value={pipe(
                  fields,
                  HM.get(key),
                  O.getOrElse(() => "")
                )}
                type="password"
                onChange={(e) => setFields(HM.set(key, e.target.value))}
              />
            );
          } else {
            return <></>;
          }
        }),
        (hashMap) =>
          pipe(
            hashMap,
            HM.keys,
            RA.fromIterable,
            RA.filterMap((k) => HM.get(k)(hashMap))
          )
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
      >
        Submit
      </Button>
    </form>
  );
};

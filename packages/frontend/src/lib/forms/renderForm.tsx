import * as S from "@fp-ts/schema";
import * as E from "@fp-ts/core/Either";
import * as Eff from "@effect/io/Effect";
import * as React from "react";
import { pipe } from "@fp-ts/core/Function";
import * as RR from "@fp-ts/core/ReadonlyRecord";
import * as HM from "@fp-ts/data/HashMap";
import { Form, FormField } from "./form";
import * as RA from "@fp-ts/core/ReadonlyArray";
import * as O from "@fp-ts/core/Option";
import { Button, TextField } from "@mui/material";

export const renderForm = <
  K extends string,
  R extends Record<K, FormField<any, any>>
>(
  form: Form<K, R>
) => {
  const fieldsHm = React.useMemo(
    () =>
      pipe(
        Object.keys(form.fields) as unknown as readonly K[],
        (keys: readonly K[]) => keys,
        RA.filterMap((k) =>
          pipe(
            form.fields,
            RR.get(k),
            O.map((value: FormField<any, any>) => [k, value] as const)
          )
        ),
        HM.fromIterable
      ),
    [form]
  );
  const initialValues = React.useMemo(
    () =>
      pipe(
        fieldsHm,
        HM.mapWithIndex((value, key) => value.initialValue)
      ),
    [fieldsHm]
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
        Eff.runCallback(form.onSubmit(fieldObj as any));
      }}
    >
      {pipe(
        fieldsHm,
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
          } else if (value.tag === "textarea") {
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
                inputProps={{
                  style: {
                    fontFamily:
                      '"Fantasque Sans Mono","ui-monospace","Cascadia Mono","Segoe UI Mono","Liberation Mono",Menlo,Monaco,Consolas,monospace',
                  },
                }}
                multiline
                rows={4}
                maxRows={4}
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

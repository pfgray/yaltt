import * as S from "@effect/schema/Schema";
import * as Eff from "@effect/io/Effect";
import * as React from "react";
import {
  pipe,
  Either,
  Option,
  ReadonlyArray,
  Effect,
  HashMap,
  ReadonlyRecord,
} from "effect";
import { Form, FormField, ValidationError } from "./form";
import { Button, TextField } from "@mui/material";

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const capitalizeWords = (s: string) => s.split(" ").map(capitalize).join(" ");

export const renderManagedForm = <
  K extends string,
  R extends Record<K, FormField<any, any>>
>(
  form: Form<K, R>,
  renderExtra?: () => JSX.Element
) => {
  const fieldsHm = React.useMemo(
    () =>
      pipe(
        Object.keys(form.fields) as unknown as readonly K[],
        (keys: readonly K[]) => keys,
        ReadonlyArray.filterMap((k) =>
          pipe(
            form.fields,
            ReadonlyRecord.get(k),
            Option.map((value: FormField<any, any>) => [k, value] as const)
          )
        ),
        HashMap.fromIterable
      ),
    [form]
  );
  const initialValues = React.useMemo(
    () =>
      pipe(
        fieldsHm,
        HashMap.map((value, key) => value.initialValue)
      ),
    [fieldsHm]
  );

  const [fields, setFields] = React.useState(initialValues);
  return (
    <form
      className="mb-0"
      onSubmit={(e) => {
        e.preventDefault();
        pipe(
          Array.from(HashMap.keys(fields)),
          ReadonlyArray.fromIterable,

          ReadonlyArray.map((key) =>
            pipe(
              Option.Do,
              Option.bind("value", () => HashMap.get(key)(fields)),
              Option.bind("fieldDef", () => HashMap.get(key)(fieldsHm)),
              Option.map(({ value, fieldDef }) => fieldDef.validate(value)),
              Either.fromOption(
                (): ValidationError => ({ message: `cant find key: ${key}` })
              ),
              Either.flatMap((a) => a),
              Either.mapRight((v) => [key, v] as const)
            )
          ),
          Either.all,
          (a) => a,
          Either.mapRight(toObj),
          Either.mapRight((values) => {
            Eff.runCallback(form.onSubmit(values as any));
          })
        );
      }}
    >
      {pipe(
        fieldsHm,
        HashMap.map((value, key) => {
          if (value.tag === "string") {
            return (
              <div className="form-control w-full" key={key}>
                <input
                  type="text"
                  name={key}
                  className="input input-bordered w-full"
                  placeholder={capitalizeWords(key)}
                  value={pipe(
                    fields,
                    HashMap.get(key),
                    Option.getOrElse(() => "")
                  )}
                  onChange={(e) => setFields(HashMap.set(key, e.target.value))}
                />
              </div>
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
                  HashMap.get(key),
                  Option.getOrElse(() => "")
                )}
                onChange={(e) => setFields(HashMap.set(key, e.target.value))}
              />
            );
          } else if (value.tag === "textarea") {
            return (
              <textarea
                name={key}
                key={key}
                className="textarea textarea-bordered w-full h-60 font-mono whitespace-nowrap"
                placeholder={capitalizeWords(key)}
                value={pipe(
                  fields,
                  HashMap.get(key),
                  Option.getOrElse(() => "")
                )}
                onChange={(e) => setFields(HashMap.set(key, e.target.value))}
              ></textarea>
            );
          } else {
            return <></>;
          }
        }),
        (hashMap) =>
          pipe(
            hashMap,
            HashMap.keys,
            ReadonlyArray.fromIterable,
            ReadonlyArray.filterMap((k) => HashMap.get(k)(hashMap))
          )
      )}

      {/* <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">What is your name?</span>
    <span className="label-text-alt">Top Right label</span>
  </label>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  <label className="label">
    <span className="label-text-alt">Bottom Left label</span>
    <span className="label-text-alt">Bottom Right label</span>
  </label>
</div> */}

      {renderExtra ? (
        renderExtra()
      ) : (
        <button className="btn" type="submit">
          Submit
        </button>
      )}
    </form>
  );
};

const toObj = <K extends string, V>(as: (readonly [K, V])[]): Record<K, V> =>
  as.reduce(
    (prev, next) => ({
      ...prev,
      [next[0]]: next[1],
    }),
    {} as Record<K, V>
  );

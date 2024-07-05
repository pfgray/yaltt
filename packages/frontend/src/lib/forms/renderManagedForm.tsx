import {
  Either,
  HashMap,
  Option,
  ReadonlyArray,
  ReadonlyRecord,
  pipe,
  Effect,
} from "effect";
import * as React from "react";
import { Form, FormField, ValidationError } from "./form";

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const capitalizeWords = (s: string) => s.split(" ").map(capitalize).join(" ");

export const renderManagedForm = <
  K extends string,
  R extends Record<K, FormField<any, any>>
>(
  form: Form<K, R>,
  renderExtra?: (options: {
    submitForm: () => void;
    submitting: boolean;
  }) => JSX.Element
) => {
  const formFields = form.fields as Record<string, FormField<any, any>>;
  const initialValues = React.useMemo(
    () =>
      pipe(
        Object.entries(formFields),
        ReadonlyArray.map((a) => [a[0], a[1].initialValue] as const),
        Object.fromEntries
      ),
    [formFields]
  );

  const [fields, setFields] = React.useState(initialValues);

  const [submitting, setSubmitting] = React.useState(false);

  const setField = (key: string, value: any) => {
    setFields((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submitForm = () => {
    pipe(
      Array.from(Object.keys(fields)),
      ReadonlyArray.fromIterable,
      ReadonlyArray.map((key) =>
        pipe(
          Option.Do,
          Option.bind("value", () => Option.fromNullable(fields[key])),
          Option.bind("fieldDef", () => Option.fromNullable(formFields[key])),
          Option.map(({ value, fieldDef }) => fieldDef.validate(value)),
          Either.fromOption(
            (): ValidationError => ({ message: `cant find key: ${key}` })
          ),
          Either.flatMap((a) => a),
          Either.map((v) => [key, v] as const)
        )
      ),
      Either.all,
      Either.map(toObj),
      Either.map((a) => {
        setSubmitting(true);
        return a;
      }),
      Either.map((values) => {
        Effect.runCallback(form.onSubmit(values as any));
      }),
      Either.map((a) => {
        setSubmitting(false);
        setFields(initialValues);
        return a;
      })
    );
  };

  return (
    <form
      className="mb-0"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }}
    >
      {pipe(
        formFields,
        Object.entries,
        ReadonlyArray.map(([key, value]: [string, FormField<any, any>]) => {
          value;
          if (value._tag === "string") {
            return (
              <div className="form-control w-full mb-2" key={key}>
                <input
                  type="text"
                  name={key}
                  className="input input-bordered w-full"
                  placeholder={capitalizeWords(value.label)}
                  value={pipe(
                    fields[key],
                    Option.fromNullable,
                    Option.getOrElse(() => "")
                  )}
                  onChange={(e) => setField(key, e.target.value)}
                />
              </div>
            );
          } else if (value._tag === "password") {
            return (
              <div className="form-control w-full mb-2" key={key}>
                <input
                  type="password"
                  name={key}
                  className="input input-bordered w-full"
                  placeholder={capitalizeWords(value.label)}
                  typeof="password"
                  value={pipe(
                    fields[key],
                    Option.fromNullable,
                    Option.getOrElse(() => "")
                  )}
                  onChange={(e) => setField(key, e.target.value)}
                />
              </div>
            );
          } else if (value._tag === "textarea") {
            return (
              <textarea
                name={key}
                key={key}
                className="textarea textarea-bordered w-full h-60 font-mono whitespace-nowrap mb-2"
                placeholder={capitalizeWords(key)}
                value={pipe(
                  fields[key],
                  Option.fromNullable,
                  Option.getOrElse(() => "")
                )}
                onChange={(e) => setField(key, e.target.value)}
              ></textarea>
            );
          } else if (value._tag === "select") {
            return (
              <select
                name={key}
                key={key}
                className="select select-bordered w-full mb-2"
                value={pipe(
                  fields[key],
                  Option.fromNullable,
                  Option.getOrElse(() => "")
                )}
                onChange={(e) => setField(key, e.target.value)}
              >
                {pipe(
                  value.options,
                  ReadonlyArray.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))
                )}
              </select>
            );
          } else if (value._tag === "number") {
            return (
              <div className="form-control w-full mb-2" key={key}>
                <input
                  type="number"
                  name={key}
                  className="input input-bordered w-full"
                  placeholder={capitalizeWords(value.label)}
                  value={pipe(
                    fields[key],
                    Option.fromNullable,
                    Option.getOrElse(() => "")
                  )}
                  onChange={(e) => setField(key, e.target.value)}
                />
              </div>
            );
          } else {
            return <></>;
          }
        })
      )}

      {renderExtra ? (
        renderExtra({ submitForm, submitting })
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

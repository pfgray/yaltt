import * as Eff from "@effect/io/Effect";
import { Either } from "effect";

export interface ValidationError {}

export interface FormField<T, A> {
  _tag: "string" | "password" | "textarea";
  initialValue: T;
  label: string;
  validate: (t: T) => Either.Either<ValidationError, A>;
}

export const string = (
  label: string,
  initialValue?: string
): FormField<string, string> => ({
  _tag: "string",
  initialValue: initialValue || "",
  label,
  validate: Either.right,
});

export const password = (
  label: string,
  initialValue?: string
): FormField<string, string> => ({
  _tag: "password",
  label,
  initialValue: initialValue || "",
  validate: Either.right,
});

export const textarea = (
  label: string,
  initialValue: string
): FormField<string, string> => ({
  _tag: "textarea",
  label,
  initialValue: initialValue,
  validate: Either.right,
});

export const checkbox = (
  label: string,
  initialValue: boolean
): FormField<boolean, boolean> => ({
  _tag: "textarea",
  label,
  initialValue: initialValue,
  validate: Either.right,
});

export const json = (
  label: string,
  initialValue?: string
): FormField<string, {}> => ({
  _tag: "textarea",
  label,
  initialValue: initialValue || "",
  validate: (v) => Either.right(JSON.parse(v)), // todo: actually validate
});

export type Form<K extends string, R extends Record<K, FormField<any, any>>> = {
  fields: R;
  onSubmit: (fields: ValidatedFields<K, R>) => Eff.Effect<never, unknown, any>;
};

export type ValidatedField<T> = T extends FormField<any, infer Z> ? Z : never;

export type ValidatedFields<
  K extends string,
  R extends Record<K, FormField<any, any>>
> = { [L in keyof R]: ValidatedField<R[L]> };

export type KeyOf<K> = K extends string ? K : never;

export const mkForm =
  <R extends Record<string, FormField<any, any>>>(fields: R) =>
  (
    onSubmit: (
      fields: ValidatedFields<KeyOf<keyof R>, R>
    ) => Eff.Effect<never, unknown, any>
  ): Form<KeyOf<keyof R>, R> => ({
    fields,
    onSubmit,
  });

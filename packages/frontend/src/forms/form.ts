import * as S from "@fp-ts/schema/Schema";
import * as E from "@fp-ts/data/Either";
import * as Eff from "@effect/io/Effect";
import * as React from "react";
import { pipe } from "@fp-ts/data/Function";
import * as HM from "@fp-ts/data/HashMap";

export interface ValidationError {}

export interface FormField<T, A> {
  tag: "string" | "password";
  initialValue: T;
  label: string;
  validate: (t: T) => E.Either<ValidationError, A>;
}

export const string = (
  label: string,
  initialValue?: string
): FormField<string, string> => ({
  tag: "string",
  initialValue: initialValue || "",
  label,
  validate: E.right,
});

export const password = (
  label: string,
  initialValue?: string
): FormField<string, string> => ({
  tag: "password",
  label,
  initialValue: initialValue || "",
  validate: E.right,
});

export type Form<K extends string, R extends Record<K, FormField<any, any>>> = {
  fields: R;
  onSubmit: (fields: ValidatedFields<K, R>) => void;
};

export type ValidatedField<T> = T extends FormField<any, infer Z> ? Z : never;

export type ValidatedFields<
  K extends string,
  R extends Record<K, FormField<any, any>>
> = { [L in keyof R]: ValidatedField<R[L]> };

export const mkForm =
  <K extends string, R extends Record<K, FormField<any, any>>>(fields: R) =>
  (onSubmit: (fields: ValidatedFields<K, R>) => void): Form<K, R> => ({
    fields,
    onSubmit,
  });

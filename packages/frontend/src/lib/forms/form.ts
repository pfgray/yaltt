import * as S from "@fp-ts/schema";
import * as E from "@fp-ts/core/Either";
import * as Eff from "@effect/io/Effect";
import * as React from "react";
import { pipe } from "@fp-ts/core/Function";
import * as HM from "@fp-ts/data/HashMap";

export interface ValidationError {}

export interface FormField<T, A> {
  tag: "string" | "password" | "textarea";
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

export const textarea = (
  label: string,
  initialValue?: string
): FormField<string, string> => ({
  tag: "textarea",
  label,
  initialValue: initialValue || "",
  validate: E.right,
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

export const mkForm =
  <K extends string, R extends Record<K, FormField<any, any>>>(fields: R) =>
  (
    onSubmit: (fields: ValidatedFields<K, R>) => Eff.Effect<never, unknown, any>
  ): Form<K, R> => ({
    fields,
    onSubmit,
  });

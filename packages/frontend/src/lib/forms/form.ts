import { Effect, Either, Option } from "effect";

export interface ValidationError {}

export type FormField<T, A> =
  | {
      _tag: "string" | "password" | "textarea" | "number";
      initialValue: T;
      label: string;
      validate: (t: T) => Either.Either<A, ValidationError>;
    }
  | {
      _tag: "select";
      initialValue: T;
      label: string;
      options: readonly T[];
      validate: (t: T) => Either.Either<A, ValidationError>;
    };

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

export const number = (
  label: string,
  initialValue?: string,
  validate?: (
    num: string
  ) => Either.Either<Option.Option<number>, ValidationError>
): FormField<string, Option.Option<number>> => ({
  _tag: "password",
  label,
  initialValue: initialValue || "",
  validate: validate || (() => Either.right(Option.none())),
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

export const select = <K extends string>(
  label: string,
  options: readonly K[],
  initialValue?: K
): FormField<K, K> => ({
  _tag: "select",
  label,
  options,
  initialValue: initialValue || options[0],
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
  onSubmit: (
    fields: ValidatedFields<K, R>
  ) => Effect.Effect<any, unknown, never>;
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
    ) => Effect.Effect<any, unknown, never>
  ): Form<KeyOf<keyof R>, R> => ({
    fields,
    onSubmit,
  });

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

const mkFormUseState = <K extends string, R extends Record<K, any>>(
  initial: R
) => {
  const [fields, setFields] = React.useState(initial);
  return [fields, setFields] as const;
};

const updateRecord =
  <K extends string, V>(k: K) =>
  (v: V) =>
  <R extends Record<K, V>>(record: Record<K, V>): R =>
    ({
      ...record,
      [k]: v,
    } as R);

// export const renderForm = <
//   K extends string,
//   R extends Record<K, FormField<any, any>>
// >(
//   form: Form<K, R>,
//   fieldState: Record<K, unknown>,
//   setFieldState: React.Dispatch<React.SetStateAction<R>>,
//   renderExtra?: () => JSX.Element
// ) => {
//   return (
//     <form
//       className="mb-0"
//       onSubmit={(e) => {
//         e.preventDefault();
//         pipe(
//           Array.from(HashMap.keys(fields)),
//           ReadonlyArray.fromIterable,

//           ReadonlyArray.map((key) =>
//             pipe(
//               Option.Do,
//               Option.bind("value", () => HashMap.get(key)(fields)),
//               Option.bind("fieldDef", () => HashMap.get(key)(fieldsHm)),
//               Option.map(({ value, fieldDef }) => fieldDef.validate(value)),
//               Either.fromOption(
//                 (): ValidationError => ({ message: `cant find key: ${key}` })
//               ),
//               Either.flatMap((a) => a),
//               Either.mapRight((v) => [key, v] as const)
//             )
//           ),
//           Either.all,
//           (a) => a,
//           Either.mapRight(toObj),
//           Either.mapRight((values) => {
//             Eff.runCallback(form.onSubmit(values as any));
//           })
//         );
//       }}
//     >
//       {pipe(
//         form.fields,
//         (a) => a,
//         ReadonlyRecord.map((value: FormField<any, any>, key) => {
//           if (value.tag === "string") {
//             return (
//               <div className="form-control w-full">
//                 <input
//                   type="text"
//                   className="input input-bordered w-full"
//                   placeholder={capitalizeWords(key)}
//                   value={pipe(
//                     fieldState,
//                     ReadonlyRecord.get(key),
//                     Option.map((a) => (a as any).toString()),
//                     Option.getOrElse(() => "")
//                   )}
//                   onChange={(e) =>
//                     setFieldState(updateRecord(key)(e.target.value))
//                   }
//                 />
//               </div>
//             );
//           } else if (value.tag === "password") {
//             return (
//               <></>
//               // <TextField
//               //   label={value.label}
//               //   key={key as string | number}
//               //   name={key as string}
//               //   fullWidth
//               //   margin="normal"
//               //   value={pipe(
//               //     fields,
//               //     HashMap.get(key),
//               //     Option.getOrElse(() => "")
//               //   )}
//               //   onChange={(e) => setFields(HashMap.set(key, e.target.value))}
//               // />
//             );
//           } else if (value.tag === "textarea") {
//             return (
//               <></>
//               // <textarea
//               //   name={key}
//               //   className="textarea textarea-bordered w-full h-60 font-mono whitespace-nowrap"
//               //   placeholder={capitalizeWords(key)}
//               //   value={pipe(
//               //     fields,
//               //     HashMap.get(key),
//               //     Option.getOrElse(() => "")
//               //   )}
//               //   onChange={(e) => setFields(HashMap.set(key, e.target.value))}
//               // ></textarea>
//             );
//           } else {
//             return <></>;
//           }
//         }),
//         (hashMap) =>
//           pipe(
//             hashMap,
//             ReadonlyRecord.toEntries,
//             ReadonlyArray.map(([k, rn]) => rn)
//           )
//       )}

//       {/* <div className="form-control w-full max-w-xs">
//   <label className="label">
//     <span className="label-text">What is your name?</span>
//     <span className="label-text-alt">Top Right label</span>
//   </label>
//   <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
//   <label className="label">
//     <span className="label-text-alt">Bottom Left label</span>
//     <span className="label-text-alt">Bottom Right label</span>
//   </label>
// </div> */}

//       {renderExtra ? (
//         renderExtra()
//       ) : (
//         <button className="btn" type="submit">
//           Submit
//         </button>
//       )}
//     </form>
//   );
// };

const toObj = <K extends string, V>(as: (readonly [K, V])[]): Record<K, V> =>
  as.reduce(
    (prev, next) => ({
      ...prev,
      [next[0]]: next[1],
    }),
    {} as Record<K, V>
  );

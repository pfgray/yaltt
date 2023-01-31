import { ADT } from "ts-adt";

export type Logins = ADT<{
  local: {
    salt: string;
    hashed_password: string;
    username: string;
  };
}>;

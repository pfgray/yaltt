import { ADT } from "ts-adt";


// {_ type: 'local'}

export type Logins = ADT<{
  local: {
    salt: string
    hashed_password: string,
    username: string
  }
}>
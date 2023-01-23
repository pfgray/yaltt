
import * as crypto from 'crypto';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';

export const pbkdf2 = TE.taskify(crypto.pbkdf2) // (password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {

export const validate = (input: string, salt: string, hashed: Buffer) => 
  pipe(
    pbkdf2(input, salt, 310000, 32, 'sha256'),
    TE.chainW(_hashed => {
      if(!crypto.timingSafeEqual(hashed, _hashed)) {
        return TE.left({error: 'invalid_password'})
      } else {
        return TE.right({})
      }
    })
  )
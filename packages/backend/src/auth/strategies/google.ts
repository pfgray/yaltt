import { Effect, pipe } from "effect";
import * as passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { PgService } from "../../db/PgService";
import { mkTransactionalPgService } from "../../db/TransactionalPgService";
import { pool } from "../../db/db";
import { addOrUpdateUserWithGoogleProfile } from "../../model/users";
import * as S from "@effect/schema/Schema";
import { GoogleProfile } from "@yaltt/model";

console.log("Initializing Google OAuth2 strategy");

const clientID = process.env["GOOGLE_CLIENT_ID"];
const clientSecret = process.env["GOOGLE_CLIENT_SECRET"];

console.log("yaltt host is: ", process.env.YALTT_HOST);

if (typeof clientID === "string" && typeof clientSecret === "string") {
  const pgService = mkTransactionalPgService(pool);
  (passport as any).default.use(
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL: `${process.env.YALTT_HOST}/api/oauth2/redirect/google`,
        passReqToCallback: true,
      },
      function (
        request: unknown,
        accessToken: unknown,
        refreshToken: unknown,
        profile: unknown,
        done: Function
      ) {
        console.log("Got new login request from Google: ", profile);

        const eff = pipe(
          profile,
          S.parse(GoogleProfile),
          Effect.flatMap((prof) =>
            addOrUpdateUserWithGoogleProfile(prof.id, prof)
          ),
          Effect.tap((user) =>
            Effect.sync(() => {
              done(null, user);
            })
          ),
          Effect.provideService(PgService, pgService.service)
        );

        Effect.runCallback(eff, (status) => {
          if (status._tag === "Failure") {
            console.log("Failed to login user ", profile, status.cause);
            pgService.rollback();
            done(status.cause);
          } else {
            pgService.commit();
            console.log("Logged in user ", status.value.login);
          }
        });
      } as any
    )
  );
}

import { pipe } from "@fp-ts/data/Function";
import { User } from "@yaltt/model";
import { match } from "../matchers/match";

type UserAvatarProps = {
  user: User;
};
export const UserAvatar = (props: UserAvatarProps) => {
  return (
    <div>
      {pipe(
        props.user.login,
        match({
          password_login: (pwl) => pwl.username,
        })
      )}
    </div>
  );
};

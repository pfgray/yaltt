import { pipe } from "@fp-ts/core/Function";
import { User } from "@yaltt/model";
import { match } from "@yaltt/model";

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

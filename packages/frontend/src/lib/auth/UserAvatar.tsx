import { pipe, Either, Option, ReadonlyArray, Effect } from "effect";
import { YalttUser } from "@yaltt/model";
import { match } from "@yaltt/model";

type UserAvatarProps = {
  user: YalttUser;
  tabIndex?: number;
};
export const UserAvatar = (props: UserAvatarProps) => {
  return (
    <div>
      {pipe(
        props.user.login,
        match({
          password: (pwl) => (
            <label
              tabIndex={props.tabIndex}
              className="btn btn-ghost btn-circle avatar placeholder"
            >
              <div className="bg-base-300 rounded-full w-10">
                <span className="text-xs">{pwl.username.charAt(0)}</span>
              </div>
            </label>
          ),
          google: (gl) =>
            pipe(
              gl.picture,
              Option.fromNullable,
              Option.match({
                onNone: () => (
                  <label
                    tabIndex={props.tabIndex}
                    className="btn btn-ghost btn-circle avatar placeholder"
                  >
                    <div className="bg-base-300 rounded-full w-10">
                      <span className="text-xs">
                        {gl.displayName.charAt(0)}
                      </span>
                    </div>
                  </label>
                ),
                onSome: (picture) => (
                  <label
                    tabIndex={props.tabIndex}
                    className="btn btn-ghost btn-circle avatar placeholder"
                  >
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={picture} />
                      </div>
                    </div>
                  </label>
                ),
              })
            ),
        })
      )}
    </div>
  );
};

import * as React from "react";
import { WithAuth } from "./lib/auth/WithAuth";
import { UserAvatar } from "./lib/auth/UserAvatar";
import { useDisplayMode } from "./lib/ui/useDisplayMode";
import { Link, Outlet } from "react-router-dom";
import { User } from "@yaltt/model";
import { post } from "./lib/api/request";
import { Effect, pipe } from "effect";
import { provideRequestService } from "./lib/api/requestServiceImpl";

export const YalttRouterLayout = () => {
  return <YalttLayout children={<Outlet />} />;
};

export type YalttLayoutProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
};
export const YalttLayout = (props: YalttLayoutProps) => {
  return (
    <WithAuth>
      {(user) => (
        <PlainYalttLayout user={user} header={() => props.header}>
          {() => props.children}
        </PlainYalttLayout>
      )}
    </WithAuth>
  );
};

type PlainYalttLayoutProps = {
  user: User;
  header: (user: User) => React.ReactNode;
  children: (user: User) => React.ReactNode;
};
export const PlainYalttLayout = (props: PlainYalttLayoutProps) => {
  const displayMode = useDisplayMode();
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-none navbar bg-base-100" data-theme={displayMode}>
        <div className="flex-none">
          <a className="btn btn-ghost normal-case text-xl">yaltt</a>
          <div className="divider divider-horizontal"></div>
        </div>
        {props.header ? (
          <div className="flex-1">{props.header(props.user)}</div>
        ) : null}
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <UserAvatar user={props.user} tabIndex={0} />
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              {/* <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              */}
              {props.user.role === 'admin' ? (
                <li>
                  <Link to="/admin">
                    Admin
                  </Link>
                </li>
              ) : null}
              <li>
                <Link to="/">
                  Apps
                </Link>
              </li>
              <li>
                <a role="button" onClick={() => {
                  pipe(
                    post("/api/logout", undefined),
                    provideRequestService,
                    Effect.flatMap(() => Effect.sync(() => {
                      window.location.href = '/';
                    })),
                    Effect.runPromise
                  )
                }}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-stretch">
        {props.children(props.user)}
      </div>
    </div>
  );
};

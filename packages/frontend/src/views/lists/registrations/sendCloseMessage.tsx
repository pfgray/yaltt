import { Effect } from "effect";

export const sendCloseMessage = Effect.sync(() => {
  (window.opener || window.parent).postMessage(
    {
      subject: "org.imsglobal.lti.close",
    },
    "*"
  );
});

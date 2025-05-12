import { useState } from "react";
import { Form, Textarea } from "react-daisyui";
import { Launch } from "./Launch";
import { LaunchCollapsible } from "./LaunchCollapsible";

export type PostMessageFormProps = {
  launch: Launch;
};

export const PostMessageForm = (props: PostMessageFormProps) => {
  const { launch } = props;

  const [message, setMessage] = useState(
    JSON.stringify(
      {
        subject: "lti.close",
      },
      null,
      2
    )
  );

  const json = parseJson(message);

  return (
    <LaunchCollapsible title="Post Message">
      <div className="flex flex-col">
        <Form className="shadow bg-base-200 rounded-lg p-4">
          <Textarea
            rows={5}
            className={`font-mono leading ${
              json.tag === "error" ? "textarea-error" : ""
            }`}
            onChange={(e) => {
              setMessage(e.currentTarget.value);
            }}
          >
            {message}
          </Textarea>
        </Form>
        <button
          className="btn btn-neutral"
          disabled={json.tag === "error"}
          onClick={() => {
            // send it?
            if (json.tag === "success") {
              window.parent.postMessage(json.json, "*");
            }
          }}
        >
          Send Message
        </button>
      </div>
    </LaunchCollapsible>
  );
};

const parseJson = (json: string) => {
  try {
    return {
      tag: "success",
      json: JSON.parse(json),
    } as const;
  } catch (e) {
    return {
      tag: "error",
      error: e,
    } as const;
  }
};

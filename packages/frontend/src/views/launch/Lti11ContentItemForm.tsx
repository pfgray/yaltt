import { AppId, RegistrationId, match, signLti11ContentItems } from "@yaltt/model";
import { Effect, Either, pipe } from "effect";
import { Lti11ContentItemType } from "lti-model";
import React from "react";
import { provideRequestService } from "../../lib/api/requestServiceImpl";
import { fetchBodyFromEndpoint } from "endpoint-ts-fetch";
import { formatError } from "@effect/schema/TreeFormatter";

const sendContentItems = (
  contentItems: Lti11ContentItemType[],
  appId: AppId,
  registrationId: RegistrationId,
  contentItemReturnUrl: string,
  data?: string
) =>
  pipe(
    fetchBodyFromEndpoint(signLti11ContentItems)({
      appId,
      registrationId,
    })({
      contentItems,
      content_item_return_url: contentItemReturnUrl,
      data,
    }),
    Effect.tap(({ html }) =>
      Effect.sync(() => {
        submitContentItemForm(html);
      })
    )
  );

const submitContentItemForm = (html: string) => {
  // Create a temporary container for the HTML
  const container = document.createElement("div");
  container.innerHTML = html;
  const form = container.querySelector("form");
  if (form) {
    document.body.appendChild(form);
    form.submit();
  } else {
    console.error("No form found in HTML response");
  }
};

type Lti11ContentItemFormProps = {
  appId: AppId;
  registrationId: RegistrationId;
  contentItemReturnUrl: string;
  data?: string;
  isCanvasExtension?: boolean;
};

const submitCanvasContentItem = (
  url: string,
  title: string,
  text: string,
  returnUrl: string,
  returnType: string = "lti_launch_url"
) => {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = returnUrl;

  const fields = {
    return_type: returnType,
    url: url,
    title: title,
    text: text,
  };

  Object.entries(fields).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};

export const Lti11ContentItemForm = (props: Lti11ContentItemFormProps) => {
  const [contentItemType, setContentItemType] = React.useState<
    "LtiLinkItem" | "ContentItem"
  >("LtiLinkItem");
  const [url, setUrl] = React.useState(
    `${window.location.protocol}//${window.location.host}/api/registrations/${props.registrationId}/lti11/launch`
  );
  const [title, setTitle] = React.useState("Yaltt Resource");
  const [text, setText] = React.useState("This is a resource from Yaltt");
  const [identifier, setIdentifier] = React.useState("");
  const [presentationDocumentTarget, setPresentationDocumentTarget] =
    React.useState("");
  const [displayWidth, setDisplayWidth] = React.useState("");
  const [displayHeight, setDisplayHeight] = React.useState("");

  const buildContentItem = (): Lti11ContentItemType => {
    const placementAdvice =
      presentationDocumentTarget || displayWidth || displayHeight
        ? {
            ...(presentationDocumentTarget && { presentationDocumentTarget }),
            ...(displayWidth && { displayWidth }),
            ...(displayHeight && { displayHeight }),
          }
        : undefined;

    if (contentItemType === "LtiLinkItem") {
      return {
        "@type": "LtiLinkItem",
        mediaType: "application/vnd.ims.lti.v1.ltilink",
        ...(identifier && { "@id": identifier }),
        ...(url && { url }),
        ...(title && { title }),
        ...(text && { text }),
        ...(placementAdvice && { placementAdvice }),
      };
    } else {
      return {
        "@type": "ContentItem",
        url,
        ...(identifier && { "@id": identifier }),
        mediaType: "text/html",
        ...(title && { title }),
        ...(text && { text }),
        ...(placementAdvice && { placementAdvice }),
      };
    }
  };

  return (
    <div className="prose flex flex-col gap-4">
      <h4>Create Content Item</h4>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Content Item Type</span>
        </div>
        <select
          className="select select-bordered w-full max-w-xs"
          value={contentItemType}
          onChange={(e) =>
            setContentItemType(e.currentTarget.value as "LtiLinkItem" | "ContentItem")
          }
        >
          <option value="LtiLinkItem">LtiLinkItem (LTI Launch)</option>
          <option value="ContentItem">ContentItem (Simple Link)</option>
        </select>
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">URL</span>
        </div>
        <input
          type="text"
          placeholder="URL"
          className="input input-bordered w-full max-w-xs"
          value={url}
          onChange={(e) => setUrl(e.currentTarget.value)}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Title</span>
        </div>
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full max-w-xs"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Description</span>
        </div>
        <textarea
          placeholder="Description"
          className="textarea textarea-bordered w-full max-w-xs"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Identifier (optional)</span>
        </div>
        <input
          type="text"
          placeholder="Unique identifier"
          className="input input-bordered w-full max-w-xs"
          value={identifier}
          onChange={(e) => setIdentifier(e.currentTarget.value)}
        />
      </label>

      <div className="divider">Placement Advice (Optional)</div>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Presentation Target</span>
        </div>
        <select
          className="select select-bordered w-full max-w-xs"
          value={presentationDocumentTarget}
          onChange={(e) => setPresentationDocumentTarget(e.currentTarget.value)}
        >
          <option value="">None</option>
          <option value="iframe">iframe</option>
          <option value="frame">frame</option>
          <option value="window">window</option>
          <option value="popup">popup</option>
          <option value="overlay">overlay</option>
          <option value="embed">embed</option>
        </select>
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Display Width</span>
        </div>
        <input
          type="text"
          placeholder="e.g., 800 or 100%"
          className="input input-bordered w-full max-w-xs"
          value={displayWidth}
          onChange={(e) => setDisplayWidth(e.currentTarget.value)}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Display Height</span>
        </div>
        <input
          type="text"
          placeholder="e.g., 600 or 100%"
          className="input input-bordered w-full max-w-xs"
          value={displayHeight}
          onChange={(e) => setDisplayHeight(e.currentTarget.value)}
        />
      </label>

      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            // Check if this is Canvas extension format (simpler, no OAuth)
            if (props.isCanvasExtension) {
              // Canvas extension: simple form POST with return_type, url, title, text
              const returnType =
                contentItemType === "LtiLinkItem" ? "lti_launch_url" : "url";
              submitCanvasContentItem(
                url,
                title,
                text,
                props.contentItemReturnUrl,
                returnType
              );
            } else {
              // Standard Content-Item Message: OAuth-signed JSON-LD
              const contentItem = buildContentItem();
              pipe(
                sendContentItems(
                  [contentItem],
                  props.appId,
                  props.registrationId,
                  props.contentItemReturnUrl,
                  props.data
                ),
                provideRequestService,
                Effect.either,
                Effect.runPromise
              ).then(
                Either.match({
                  onLeft: match({
                    fetch_exception: (e) => console.error("fetch exception", e),
                    fetch_parse_error: (err) => {
                      console.error("error parsing response:", err);
                    },
                    fetch_parse_json_error: (err) => {
                      console.error("error parsing json response:", err);
                    },
                    encode_error: (err) => {
                      console.error(
                        "error encoding request",
                        formatError(err.error)
                      );
                    },
                  }),
                  onRight: (res) =>
                    console.log("Content item sent successfully", res),
                })
              );
            }
          }}
        >
          Return Content Item
        </button>
      </div>
    </div>
  );
};

import {
  AppId,
  RegistrationId,
  isContentItemType,
  match,
  signDeepLinkingContentItems,
} from "@yaltt/model";
import { Effect, Either, Option, ReadonlyArray, pipe } from "effect";
import { ContentItem, DeepLinkingSettings } from "lti-model";
import React from "react";
import { makeMatchers } from "ts-adt/MakeADT";
import { provideRequestService } from "../../lib/api/requestServiceImpl";
import { fetchBodyFromEndpoint } from "../../lib/endpoint-ts/fetchFromEndpoint";
import { formatError } from "@effect/schema/TreeFormatter";

const sendContentItems = (
  contentItems: ContentItem[],
  appId: AppId,
  registrationId: RegistrationId,
  deploymentId: string,
  deepLinkReturnUrl: string
) =>
  pipe(
    fetchBodyFromEndpoint(signDeepLinkingContentItems)({
      appId,
      registrationId,
    })({
      contentItems,
      deploymentId,
    }),
    Effect.tap(({ signedJwt }) =>
      Effect.sync(() => {
        submitDeepLinking(signedJwt, deepLinkReturnUrl);
      })
    )
  );

const submitDeepLinking = (signedJwt: string, deepLinkReturnUrl: string) => {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = deepLinkReturnUrl;
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = "JWT";
  input.value = signedJwt;
  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
};

type DeepLinkingFormProps = {
  deepLinkingSettings: DeepLinkingSettings;
  appId: AppId;
  registrationId: RegistrationId;
  deploymentId: string;
};

export const DeepLinkingForm = (props: DeepLinkingFormProps) => {
  const firstType = pipe(
    props.deepLinkingSettings.accept_types,
    ReadonlyArray.filter(isContentItemType),
    ReadonlyArray.head,
    Option.getOrElse(() => "file" as const)
  );
  const [contentItems, setContentItems] = React.useState<ContentItem[]>([
    {
      type: firstType,
      url: `${window.location.protocol}//${window.location.host}/api/registrations/${props.registrationId}/launch`,
      title: "Yaltt Resource",
      text: "This is a resource from Yaltt",
    } as ContentItem,
  ]);
  return (
    <div className="prose flex flex-col gap-4">
      {/* <pre>{JSON.stringify(contentItems)}</pre> */}
      {contentItems.map((contentItem, i) => {
        return (
          <div>
            <ContentItemForm
              deepLinkingSettings={props.deepLinkingSettings}
              contentItem={contentItem}
              update={(newContentItem) => {
                const newContentItems = [...contentItems];
                newContentItems[i] = newContentItem;
                setContentItems(newContentItems);
              }}
            />
          </div>
        );
      })}
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            pipe(
              sendContentItems(
                contentItems,
                props.appId,
                props.registrationId,
                props.deploymentId,
                props.deepLinkingSettings.deep_link_return_url
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
                onRight: (res) => console.log(JSON.stringify(res)),
              })
            );
          }}
        >
          Return Content Item
        </button>
      </div>
    </div>
  );
};

type ContentItemFormProps = {
  deepLinkingSettings: DeepLinkingSettings;
  contentItem: ContentItem;
  update: (contentItem: ContentItem) => void;
};

const [matchType] = makeMatchers("type");

const ContentItemForm = (props: ContentItemFormProps) => {
  const [includeLineItem, setIncludeLineItem] = React.useState(false);
  const updateField =
    (key: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      props.update({ ...props.contentItem, [key]: e.currentTarget.value });
    };
  const updateLineItemField =
    (key: string, isNumber?: boolean) =>
    (e: { currentTarget: { value: string | number | boolean } }) => {
      const lineItem =
        "lineItem" in props.contentItem &&
        typeof props.contentItem.lineItem !== "undefined"
          ? props.contentItem.lineItem
          : { scoreMaximum: 100 };
      const value = e.currentTarget.value;
      const parsed =
        isNumber && typeof value === "string"
          ? parseInt(value, 10)
          : e.currentTarget.value;
      props.update({
        ...props.contentItem,
        ...{ lineItem: { ...lineItem, [key]: parsed } },
      });
    };
  return (
    <div className="flex flex-col gap-4 max-w-xs">
      <h4>Content Item to Return</h4>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Content Item Type</span>
        </div>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => {
            updateField("type")(e);
          }}
        >
          {ContentItemTypeOptions.filter((op) => {
            return props.deepLinkingSettings.accept_types.includes(op.value);
          }).map((option) => (
            <option
              value={option.value}
              selected={props.contentItem.type === option.value}
            >
              {option.display}
            </option>
          ))}
        </select>
      </label>
      {pipe(
        props.contentItem,
        matchType({
          file: (file) => (
            <>
              <input
                type="text"
                placeholder="URL"
                className="input input-bordered w-full max-w-xs"
                value={file.url}
                onChange={updateField("url")}
              />
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full max-w-xs"
                value={file.title}
                onChange={updateField("title")}
              />
              <input
                type="text"
                placeholder="Text"
                className="input input-bordered w-full max-w-xs"
                value={file.text}
                onChange={updateField("text")}
              />
            </>
          ),
          link: (item) => (
            <>
              <input
                type="text"
                placeholder="URL"
                className="input input-bordered w-full max-w-xs"
                value={item.url}
                onChange={updateField("url")}
              />
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full max-w-xs"
                value={item.title}
                onChange={updateField("title")}
              />
              <input
                type="text"
                placeholder="Text"
                className="input input-bordered w-full max-w-xs"
                value={item.text}
                onChange={updateField("text")}
              />
            </>
          ),
          html: (item) => (
            <>
              <textarea
                className="textarea textarea-bordered font-mono"
                value={item.html}
                onChange={updateField("html")}
                placeholder="HTML"
              ></textarea>
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full max-w-xs"
                value={item.title}
                onChange={updateField("title")}
              />
              <input
                type="text"
                placeholder="Text"
                className="input input-bordered w-full max-w-xs"
                value={item.text}
                onChange={updateField("text")}
              />
            </>
          ),
          ltiResourceLink: (item) => (
            <>
              <input
                type="text"
                placeholder="URL"
                className="input input-bordered w-full max-w-xs"
                value={item.url}
                onChange={updateField("url")}
              />
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full max-w-xs"
                value={item.title}
                onChange={updateField("title")}
              />
              <input
                type="text"
                placeholder="Text"
                className="input input-bordered w-full max-w-xs"
                value={item.text}
                onChange={updateField("text")}
              />
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">
                    Include Lineitem (Gradebook Column)
                  </span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => setIncludeLineItem(!includeLineItem)}
                    checked={includeLineItem}
                  />
                </label>
              </div>
              {includeLineItem && (
                <>
                  <input
                    type="text"
                    placeholder="Label"
                    className="input input-bordered w-full"
                    value={item.lineItem?.label}
                    onChange={updateLineItemField("label")}
                  />
                  <div className="label">
                    <span className="label-text">Maximum Score</span>
                  </div>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={item.lineItem?.scoreMaximum}
                    onChange={updateLineItemField("scoreMaximum", true)}
                  />
                  <input
                    placeholder="Resource Id"
                    className="input input-bordered w-full"
                    value={item.lineItem?.resourceId}
                    onChange={updateLineItemField("resourceId")}
                  />
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Grades Released</span>
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={() =>
                          updateLineItemField("gradesReleased")({
                            currentTarget: {
                              value: !item.lineItem?.gradesReleased,
                            },
                          })
                        }
                        checked={!item.lineItem?.gradesReleased}
                      />
                    </label>
                  </div>
                  {/* S.struct({
      label: S.optional(S.string),
      scoreMaximum: S.number,
      resourceId: S.optional(S.string),
      _tag: S.optional(S.string),
      gradesReleased: S.optional(S.boolean),
    }) */}
                </>
              )}
            </>
          ),
          image: (item) => (
            <>
              <input
                type="text"
                placeholder="URL"
                className="input input-bordered w-full max-w-xs"
                value={item.url}
                onChange={updateField("url")}
              />
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full max-w-xs"
                value={item.title}
                onChange={updateField("title")}
              />
              <input
                type="text"
                placeholder="Text"
                className="input input-bordered w-full max-w-xs"
                value={item.text}
                onChange={updateField("text")}
              />
            </>
          ),
        })
      )}
    </div>
  );
};

const ContentItemTypeOptions = [
  {
    value: "file",
    display: "File",
  },
  {
    value: "link",
    display: "Link",
  },
  {
    value: "html",
    display: "HTML",
  },
  {
    value: "ltiResourceLink",
    display: "LTI Resource Link",
  },
  {
    value: "image",
    display: "Image",
  },
];

// const ContentItemTypeOptions = () => {

// }

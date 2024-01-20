import { Effect, Either, Option, ReadonlyArray, pipe } from "effect";
import { useParsedParamsQuery } from "../../lib/react-router/useParsedParamsQuery";
import * as S from "@effect/schema/Schema";
import { WithRequest } from "../../lib/api/WithRequest";
import { getDecode, postDecode } from "../../lib/api/request";
import {
  ContentItem,
  DeepLinkingSettings,
  DeepLinkingSettingsClaim,
  extractDeepLinkingSettingsClaim,
} from "lti-model";
import React from "react";
import { makeMatchers } from "ts-adt/MakeADT";
import { provideRequestService } from "../../lib/api/requestServiceImpl";
import { isContentItemType, match } from "@yaltt/model";
import { formatErrors } from "@effect/schema/TreeFormatter";

const sendContentItems = (
  contentItems: ContentItem[],
  appId: number,
  registrationId: number,
  deploymentId: string,
  deepLinkReturnUrl: string
) =>
  pipe(
    postDecode(S.struct({ signedJwt: S.string }))(
      `/api/apps/${appId}/registrations/${registrationId}/signDeepLinkingContentItems`,
      {
        body: { contentItems, deploymentId },
        tag: "json_post_data",
      }
    ),
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
  appId: number;
  registrationId: number;
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
      url: "",
      title: "",
      text: "",
    },
  ]);
  return (
    <div className="prose flex flex-col gap-4">
      <h1 className="text-lg">Deep Linking</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
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
                  decode_error: (err) => {
                    console.error(
                      "error decoding response:",
                      formatErrors(err.errors.errors)
                    );
                  },
                  req_client_error: (err) => console.log(err),
                  req_server_error: (err) => console.log(err),
                }),
                onRight: (res) => console.log(JSON.stringify(res)),
              })
            );
          }}
        >
          Send Content Items
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
  const updateField =
    (key: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      props.update({ ...props.contentItem, [key]: e.currentTarget.value });
    };
  return (
    <div className="flex flex-col gap-4 w-full">
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

export const ContentItemTypes = {
  File: "file",
  Link: "link",
  Html: "html",
  Image: "image",
  LtiResourceLink: "ltiResourceLink",
} as const;

export type ContentItemType =
  (typeof ContentItemTypes)[keyof typeof ContentItemTypes];

export const isContentItemType = (x: unknown): x is ContentItemType => {
  return (
    typeof x === "string" &&
    Object.values(ContentItemTypes).includes(x as ContentItemType)
  );
};

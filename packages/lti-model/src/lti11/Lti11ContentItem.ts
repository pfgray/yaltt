import * as S from "@effect/schema/Schema";

/**
 * LTI 1.1 Content-Item Placement Advice
 *
 * Provides hints about how the content should be displayed in the platform.
 * All fields are optional.
 */
export const Lti11PlacementAdvice = S.struct({
  // How the content should be presented (e.g., "frame", "iframe", "window", "popup", "overlay", "embed")
  presentationDocumentTarget: S.optional(S.string),
  // Display width in pixels or as a percentage
  displayWidth: S.optional(S.string),
  // Display height in pixels or as a percentage
  displayHeight: S.optional(S.string),
  // Window features for popup windows
  windowTarget: S.optional(S.string),
});

export interface Lti11PlacementAdvice
  extends S.Schema.To<typeof Lti11PlacementAdvice> {}

/**
 * LTI 1.1 LtiLinkItem
 *
 * Represents an LTI launch link that can be embedded in the platform.
 * This is the primary content item type for tool integrations.
 *
 * Required fields:
 * - @type: "LtiLinkItem"
 * - mediaType: "application/vnd.ims.lti.v1.ltilink"
 *
 * Optional fields:
 * - @id: Unique identifier for the content item
 * - url: The launch URL for the LTI link
 * - title: Title of the content
 * - text: Description of the content
 * - placementAdvice: Display hints
 * - icon: Icon for the content item (object with @id and optional width/height)
 * - thumbnail: Thumbnail image (object with @id and optional width/height)
 */
export const Lti11LtiLinkItem = S.struct({
  "@type": S.literal("LtiLinkItem"),
  mediaType: S.literal("application/vnd.ims.lti.v1.ltilink"),
  "@id": S.optional(S.string),
  url: S.optional(S.string),
  title: S.optional(S.string),
  text: S.optional(S.string),
  placementAdvice: S.optional(Lti11PlacementAdvice),
  icon: S.optional(
    S.struct({
      "@id": S.string,
      width: S.optional(S.number),
      height: S.optional(S.number),
    })
  ),
  thumbnail: S.optional(
    S.struct({
      "@id": S.string,
      width: S.optional(S.number),
      height: S.optional(S.number),
    })
  ),
});

export interface Lti11LtiLinkItem
  extends S.Schema.To<typeof Lti11LtiLinkItem> {}

/**
 * LTI 1.1 ContentItem (simple link)
 *
 * Represents a simple URL that can be linked in the platform.
 * This is used for non-LTI content like external web pages.
 *
 * Required fields:
 * - @type: "ContentItem"
 * - url: The URL of the content
 *
 * Optional fields:
 * - @id: Unique identifier for the content item
 * - mediaType: MIME type of the content (e.g., "text/html")
 * - title: Title of the content
 * - text: Description of the content
 * - placementAdvice: Display hints
 * - icon: Icon for the content item (object with @id and optional width/height)
 * - thumbnail: Thumbnail image (object with @id and optional width/height)
 */
export const Lti11ContentItem = S.struct({
  "@type": S.literal("ContentItem"),
  url: S.string,
  "@id": S.optional(S.string),
  mediaType: S.optional(S.string),
  title: S.optional(S.string),
  text: S.optional(S.string),
  placementAdvice: S.optional(Lti11PlacementAdvice),
  icon: S.optional(
    S.struct({
      "@id": S.string,
      width: S.optional(S.number),
      height: S.optional(S.number),
    })
  ),
  thumbnail: S.optional(
    S.struct({
      "@id": S.string,
      width: S.optional(S.number),
      height: S.optional(S.number),
    })
  ),
});

export interface Lti11ContentItem
  extends S.Schema.To<typeof Lti11ContentItem> {}

/**
 * Union of all supported LTI 1.1 content item types
 */
export const Lti11ContentItemType = S.union(
  Lti11LtiLinkItem,
  Lti11ContentItem
);

export type Lti11ContentItemType = S.Schema.To<typeof Lti11ContentItemType>;

/**
 * LTI 1.1 Content-Item Selection Response
 *
 * The JSON structure returned to the platform in the content_items parameter.
 * Uses JSON-LD format with @context and @graph.
 *
 * Required fields:
 * - @context: "http://purl.imsglobal.org/ctx/lti/v1/ContentItem"
 * - @graph: Array of content items
 */
export const Lti11ContentItemSelection = S.struct({
  "@context": S.literal("http://purl.imsglobal.org/ctx/lti/v1/ContentItem"),
  "@graph": S.array(Lti11ContentItemType),
});

export interface Lti11ContentItemSelection
  extends S.Schema.To<typeof Lti11ContentItemSelection> {}

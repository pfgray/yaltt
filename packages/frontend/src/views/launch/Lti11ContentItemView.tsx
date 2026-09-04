import { Launch } from "@yaltt/model/src/registration/Launch";
import { LaunchCollapsible } from "./LaunchCollapsible";
import { Lti11ContentItemForm } from "./Lti11ContentItemForm";

type Lti11ContentItemViewProps = {
  launch: Launch;
};

export const Lti11ContentItemView = ({ launch }: Lti11ContentItemViewProps) => {
  // Only render for LTI 1.1 registrations
  if (launch.registration.type !== "lti11") {
    return null;
  }

  if (!launch.id_token || typeof launch.id_token !== "object") {
    return null;
  }

  // Check if this is a content selection request
  // Canvas uses selection_directive=embed_content and ext_content_return_url
  // Standard LTI 1.1 uses lti_message_type=ContentItemSelectionRequest
  const isCanvasContentSelection =
    ("selection_directive" in launch.id_token &&
      launch.id_token.selection_directive === "embed_content") ||
    "ext_content_return_url" in launch.id_token;

  const isStandardContentItem =
    "lti_message_type" in launch.id_token &&
    launch.id_token.lti_message_type === "ContentItemSelectionRequest";

  if (!isCanvasContentSelection && !isStandardContentItem) {
    return null;
  }

  // Extract return URL - try Canvas extension first, then standard
  const contentItemReturnUrl =
    ("ext_content_return_url" in launch.id_token &&
      typeof launch.id_token.ext_content_return_url === "string"
      ? launch.id_token.ext_content_return_url
      : "") ||
    ("content_item_return_url" in launch.id_token &&
    typeof launch.id_token.content_item_return_url === "string"
      ? launch.id_token.content_item_return_url
      : "");

  const data =
    "data" in launch.id_token && typeof launch.id_token.data === "string"
      ? launch.id_token.data
      : undefined;

  if (!contentItemReturnUrl) {
    return (
      <LaunchCollapsible title="LTI 1.1 Content-Item Selection" initialOpen={true}>
        <div className="alert alert-error">
          <p>Missing content_item_return_url in launch request</p>
        </div>
      </LaunchCollapsible>
    );
  }

  return (
    <LaunchCollapsible title="LTI 1.1 Content-Item Selection" initialOpen={true}>
      <Lti11ContentItemForm
        registrationId={launch.registration.id}
        appId={launch.app.id}
        contentItemReturnUrl={contentItemReturnUrl}
        data={data}
        isCanvasExtension={isCanvasContentSelection}
      />
    </LaunchCollapsible>
  );
};

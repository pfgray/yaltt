import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { App, Registration } from "@yaltt/model";
import { pipe, ReadonlyRecord, Option } from "effect";
import {
  PlatformConfiguration,
  CreatedToolConfiguration,
  LtiPlacements,
} from "lti-model";
import React from "react";
import { usePlacementsStore, Placements } from "../usePlacementsStore";
import { create } from "zustand";
import { CanvasPlacementTypes } from "canvas-lti-model";
import { Pre } from "../../../../lib/ui/Pre";

const known = <K extends keyof typeof CanvasPlacementTypes>(
  k: K,
  v: string
) => ({ type: CanvasPlacementTypes[k], description: v });

const PlacementConfig = (props: {
  placement: {
    type: string;
    message_types: string[];
    description: string;
  };
}) => {
  const placement = props.placement;

  const {
    placements,
    togglePlacement,
    setPlacements,
    updateCustomParameters,
    updateIconUri,
    updateLabel,
    updateMessageType,
    updateRoles,
  } = usePlacementsStore((state) => state);

  return (
    <div className="form-control" key={placement.type}>
      <label className="label cursor-pointer justify-normal">
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => togglePlacement(placement.type)}
          checked={
            typeof placements[placement.type] !== "undefined" &&
            placements[placement.type].enabled === true
          }
        />
        <span className="label-text ml-2">{placement.description}</span>
      </label>
      {typeof placements[placement.type] !== "undefined" &&
        placements[placement.type].enabled === true && (
          <div className="ml-10 grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Label"
              className="input input-bordered w-full max-w-xs"
              onChange={updateLabel(placement.type)}
              value={placements[placement.type].label}
            />
            <select
              className="select select-bordered w-full max-w-xs"
              disabled={placement.message_types.length === 1}
              onChange={updateMessageType(placement.type)}
            >
              {placement.message_types.map((mt) => (
                <option
                  selected={
                    mt === placements[placement.type].message_type
                      ? true
                      : false
                  }
                  key={mt}
                >
                  {mt}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Roles"
              className="input input-bordered w-full max-w-xs"
              onChange={updateRoles(placement.type)}
              value={placements[placement.type].roles}
            />
            <input
              type="text"
              placeholder="Icon Url"
              className="input input-bordered w-full max-w-xs"
              onChange={updateIconUri(placement.type)}
              value={placements[placement.type].icon_uri}
            />
            <textarea
              className="textarea textarea-bordered"
              placeholder="Custom Parameters (key=value format)"
              onChange={updateCustomParameters(placement.type)}
              value={placements[placement.type].custom_parameters}
            ></textarea>
            {/* <Pre>{JSON.stringify(placements[placement.type], null, 2)}</Pre> */}
          </div>
        )}
    </div>
  );
};

const KnownPlacements = [
  known("AnalyticsHub", "Analytics Hub"),
  known("GlobalNavigation", "Global Navigation"),
  known("CourseNavigation", "Course Navigation"),
  known("AccountNavigation", "Account Navigation"),
  known("UserNavigation", "User Navigation"),
  known("HomeworkSubmission", "Homework Submission"),
  known("DiscussionTopicMenu", "Discussion Topic Menu"),
  known("DiscussionTopicIndexMenu", "Discussion Topic Index Menu"),
  known("AssignmentMenu", "Assignment Menu"),
  known("AssignmentSelection", "Assignment Selection"),
  known("AssignmentEdit", "Assignment Edit"),
  known("AssignmentView", "Assignment View"),
  known("AssignmentGroupMenu", "Assignment Group Menu"),
  known("AssignmentIndexMenu", "Assignment Index Menu"),
  known("CourseAssignmentsMenu", "Course Assignments Menu"),
  known("CourseHomeSubNavigation", "Course Home Sub-Navigation"),
  known("CourseSettingsSubNavigation", "Course Settings Sub-Navigation"),
  known("EditorButton", "Editor Button"),
  known("ModuleMenu", "Module Menu"),
  known("ModuleIndexMenu", "Module Index Menu"),
  known("ModuleIndexMenuModal", "Module Index Menu Modal"),
  known("ModuleGroupMenu", "Module Group Menu"),
  known("ModuleMenuModal", "Module Menu Modal"),
  known("FileMenu", "File Menu"),
  known("FileIndexMenu", "File Index Menu"),
  known("WikiPageMenu", "Wiki Page Menu"),
  known("WikiIndexMenu", "Wiki Index Menu"),
  known("QuizMenu", "Quiz Menu"),
  known("QuizIndexMenu", "Quiz Index Menu"),
  known("ConferenceSelection", "Conference Selection"),
  known("Collaboration", "Collaboration"),
  known("MigrationSelection", "Migration Selection"),
  known("PostGrades", "Post Grades"),
  known("SimilarityDetection", "Similarity Detection"),
  known("StudentContextCard", "Student Context Card"),
  known("SubmissionTypeSelection", "Submission Type Selection"),
  known("ToolConfiguration", "Tool Configuration"),
  known("TopNavigation", "Top Navigation"),
  known("UserNavigation", "User Navigation"),
  known("LinkSelection", "Link Selection"),
] as const;

type ExpandedPlacementsState = {
  expanded: boolean;
  toggleExpanded: () => void;
};

const useExpandedPlacementsStore = create<ExpandedPlacementsState>()((set) => ({
  expanded: false,
  toggleExpanded: () => set((state) => ({ expanded: !state.expanded })),
}));

export const MessageTypes = (props: {
  platformConfiguration: PlatformConfiguration;
  app: App;
  editingToolConfiguration?: CreatedToolConfiguration;
}) => {
  const { editingToolConfiguration } = props;

  const ltiPlatformConfig =
    props.platformConfiguration[
      "https://purl.imsglobal.org/spec/lti-platform-configuration"
    ];

  const { expanded, toggleExpanded } = useExpandedPlacementsStore(
    (state) => state
  );

  const advertisedPlacements = ltiPlatformConfig.messages_supported
    .flatMap((m) => m.placements || [])
    .filter((p) => p !== "resource_selection")
    .filter((item, i, ar) => ar.indexOf(item) === i)
    .map((p) => ({
      type: p,
      message_types: ltiPlatformConfig.messages_supported
        .filter((m) => (m.placements || []).includes(p))
        .map((m) => m.type),
      description:
        KnownPlacements.find((kp) => kp.type === p)?.description || p,
    }))
    .sort((a, b) => {
      const aIndex = KnownPlacements.findIndex((kp) => kp.type === a.type);
      const bIndex = KnownPlacements.findIndex((kp) => kp.type === b.type);
      return aIndex - bIndex;
    });

  const { setPlacements, initializePlacements } = usePlacementsStore(
    (state) => state
  );

  const unAdvertisedPlacements = pipe(
    LtiPlacements,
    ReadonlyRecord.filter(
      (p) => !advertisedPlacements.find((ap) => ap.type === p)
    ),
    ReadonlyRecord.map((a, b) => {
      if (a === "ContentArea") {
        return {
          type: "ContentArea",
          message_types: ["LtiResourceLinkRequest"],
          description: "Content Area",
        };
      } else if (a === "RichTextEditor") {
        return {
          type: "RichTextEditor",
          message_types: ["LtiDeepLinkingRequest"],
          description: "Rich Text Editor",
        };
      } else {
        const hmm: never = a;
        return hmm;
      }
    }),
    ReadonlyRecord.values
  );

  React.useEffect(() => {
    setPlacements({
      ...advertisedPlacements.reduce((acc: Placements, placement) => {
        return {
          ...acc,
          [placement.type]: {
            enabled: false,
            message_type:
              // Prefer LtiDeepLinkingRequest if it's available
              placement.message_types.includes("LtiDeepLinkingRequest")
                ? "LtiDeepLinkingRequest"
                : placement.message_types[0],
            custom_parameters: "foo=bar\ncontext_id=$Context.id",
            icon_uri: `${window.location.origin}/api/apps/${props.app.id}/icon.svg`,
            roles: "",
            label: `${props.app.name} (${placement.description})`,
          },
        };
      }, {}),

      ...unAdvertisedPlacements.reduce((acc: Placements, placement) => {
        return {
          ...acc,
          [placement.type]: {
            enabled: false,
            message_type: placement.message_types[0],
            custom_parameters: "foo=bar\ncontext_id=$Context.id",
            icon_uri: `${window.location.origin}/api/apps/${props.app.id}/icon.svg`,
            roles: "",
            label: `${props.app.name} (${placement.description})`,
          },
        };
      }, {}),
    });
    if (editingToolConfiguration) {
      initializePlacements(editingToolConfiguration);
    }
  }, [editingToolConfiguration, setPlacements, initializePlacements]);

  /**
   * Determines the number of placements to display by default
   * hiding the rest behind a "show more" button
   */
  const DefaultPlacementDisplayCount = 5;

  // if the number of all placements is less than 6, show all
  // and don't show the "show more" button

  // if the number of all placements is more than 6, show the first 5

  // if we are expanded, or the number of placements is less than 6, show all

  return (
    <div>
      <h3>Placements</h3>
      {advertisedPlacements.length > 0 ? (
        <>
          {advertisedPlacements.map((placement, i) =>
            !expanded && i > DefaultPlacementDisplayCount ? null : (
              <>
                {/* <Pre>{JSON.stringify(placement, null, 2)}</Pre> */}
                <PlacementConfig placement={placement} />
              </>
            )
          )}
        </>
      ) : null}
      {unAdvertisedPlacements.length > 0 &&
      (expanded ||
        unAdvertisedPlacements.length + advertisedPlacements.length <=
          DefaultPlacementDisplayCount) ? (
        <>
          <h6>Standard placements not advertised as supported</h6>
          {unAdvertisedPlacements.length > 0 && (
            <>
              {unAdvertisedPlacements.map((placement, i) =>
                !expanded && i > DefaultPlacementDisplayCount ? null : (
                  // <Pre>{JSON.stringify(placement, null, 2)}</Pre>
                  <PlacementConfig placement={placement} />
                )
              )}
            </>
          )}
        </>
      ) : null}

      <div
        className="w-full items-center justify-center flex flex-row cursor-pointer"
        onClick={() => {
          toggleExpanded();
        }}
      >
        {expanded ? (
          <>
            Show Less <ChevronUpIcon className="ml-2 w-5 h-5" />
          </>
        ) : (
          <>
            Show More <ChevronDownIcon className="ml-2 w-5 h-5" />
          </>
        )}
      </div>
    </div>
  );
};

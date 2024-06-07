export const LtiPlacements = {
  ContentArea: "ContentArea",
  RichTextEditor: "RichTextEditor",

  // TODO: these aren't standardized yet
  // CourseNavigation: "CourseNavigation",
  // AdminPage: "AdminPage",
  // UserProfile: "UserProfile",
} as const;

export type LtiPlacement = (typeof LtiPlacements)[keyof typeof LtiPlacements];

export const NonPrefixedCanvasPlacementTypes = {
  AccountNavigation: "account_navigation",
  SimilarityDetection: "similarity_detection",
  AssignmentEdit: "assignment_edit",
  AssignmentGroupMenu: "assignment_group_menu",
  AssignmentIndexMenu: "assignment_index_menu",
  AssignmentMenu: "assignment_menu",
  AssignmentSelection: "assignment_selection",
  AssignmentView: "assignment_view",
  Collaboration: "collaboration",
  ConferenceSelection: "conference_selection",
  CourseAssignmentsMenu: "course_assignments_menu",
  CourseHomeSubNavigation: "course_home_sub_navigation",
  CourseNavigation: "course_navigation",
  CourseSettingsSubNavigation: "course_settings_sub_navigation",
  DiscussionTopicMenu: "discussion_topic_menu",
  DiscussionTopicIndexMenu: "discussion_topic_index_menu",
  EditorButton: "editor_button",
  FileMenu: "file_menu",
  FileIndexMenu: "file_index_menu",
  GlobalNavigation: "global_navigation",
  HomeworkSubmission: "homework_submission",
  LinkSelection: "link_selection",
  MigrationSelection: "migration_selection",
  ModuleGroupMenu: "module_group_menu",
  ModuleIndexMenu: "module_index_menu",
  ModuleIndexMenuModal: "module_index_menu_modal",
  ModuleMenu: "module_menu",
  ModuleMenuModal: "module_menu_modal",
  PostGrades: "post_grades",
  QuizIndexMenu: "quiz_index_menu",
  QuizMenu: "quiz_menu",
  SubmissionTypeSelection: "submission_type_selection",
  StudentContextCard: "student_context_card",
  ToolConfiguration: "tool_configuration",
  TopNavigation: "top_navigation",
  UserNavigation: "user_navigation",
  WikiIndexMenu: "wiki_index_menu",
  WikiPageMenu: "wiki_page_menu",
} as const;

export type NonPrefixedCanvasPlacementType =
  (typeof NonPrefixedCanvasPlacementTypes)[keyof typeof NonPrefixedCanvasPlacementTypes];
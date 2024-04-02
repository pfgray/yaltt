export enum ActivityProgress {
  /**
   * The user has not started the activity,
   * or the activity has been reset for that student.
   */
  Initialized = "Initialized",
  /**
   * The activity associated with the line item has
   * been started by the user to which the result relates.
   */
  Started = "Started",
  /**
   * The activity is being drafted and is available for comment
   */
  InProgress = "InProgress",
  /**
   * The activity has been submitted at least once by the user
   * but the user is still able make further submissions.
   */
  Submitted = "Submitted",
  /**
   * The user has completed the activity associated with the line item.
   */
  Completed = "Completed",
}

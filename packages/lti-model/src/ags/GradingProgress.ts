export enum GradingProgress {
  /**
   * The grading process is completed; the score value, if any, represents the current Final Grade; the gradebook may display the grade to the learner
   */
  FullyGraded = "FullyGraded",
  /**
   * Final Grade is pending, but does not require manual intervention; if a Score value is present, it indicates the current value is partial and may be updated.
   */
  Pending = "Pending",
  /**
   * Final Grade is pending, and it does require human intervention; if a Score value is present, it indicates the current value is partial and may be updated during the manual grading.
   */
  PendingManual = "PendingManual",
  /**
   * The grading could not complete.
   */
  Failed = "Failed",
  /**
   * There is no grading process occurring; for example, the student has not yet made any submission.
   */
  NotReady = "NotReady",
}

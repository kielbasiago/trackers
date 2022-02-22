export enum ObjectiveTrackerState {
    /** User has just enetered the app, no action taken */
    IDLE = "IDLE",
    /** User prompted to select a file */
    SELECT_FILE = "SELECT_FILE",
    /** User prompted to begin auto tracking (remove?) */
    FILE_SELECTED = "FILE_SELECTED",
    /** User has initiated tracking */
    START_TRACKING = "START_TRACKING",
    /** Tracking has began and is doing so actively */
    TRACKING = "TRACKING",
    /** Error */
    ERROR = "ERROR",
}

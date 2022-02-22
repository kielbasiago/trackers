import React, { ReactNode } from "react";
import { ObjectiveTrackerState } from "./constants";
import { Button, Typography } from "@mui/material";

type Props = {
    message: string;
    state: ObjectiveTrackerState;
    onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBeginTracking: () => void;
};

/*
    1) user select file
    2) user begins tracking
    3) Show log
    4) Show instructions if disconnected from QUsb2Snes
*/
export function ObjectiveTrackerHeader(props: Props): JSX.Element {
    const { message, state, onBeginTracking, onFileSelect } = props;
    let Action: ReactNode = <></>;
    const isError = state === ObjectiveTrackerState.ERROR;
    switch (state) {
        case ObjectiveTrackerState.IDLE:
            break;
        case ObjectiveTrackerState.SELECT_FILE:
            Action = (
                <>
                    <Button variant="outlined" component="label">
                        Select File
                        <input type="file" onChange={onFileSelect} hidden />
                    </Button>
                </>
            );
            break;
        case ObjectiveTrackerState.FILE_SELECTED:
            Action = (
                <>
                    <Button onClick={onBeginTracking} variant="outlined">
                        Start Tracking
                    </Button>
                </>
            );
            break;
        case ObjectiveTrackerState.START_TRACKING:
            Action = <>START TRACKING...</>;
            break;
        case ObjectiveTrackerState.TRACKING:
            break;
        case ObjectiveTrackerState.ERROR:
            Action = null;
            break;

        default:
            Action = <>UNKNOWN STATE: {state}</>;
            break;
    }

    return (
        <>
            <span
                style={{
                    paddingLeft: 16,
                    paddingTop: 16,
                    paddingRight: 16,
                    display: "block",
                }}
            >
                <Typography
                    color={isError ? "error" : undefined}
                    fontSize={"1.5rem"}
                    variant="overline"
                >
                    {message ?? null}
                </Typography>
            </span>
            <span
                style={{
                    paddingLeft: 16,
                    paddingBottom: 16,
                    paddingRight: 16,
                    display: "block",
                }}
            >
                {Action}
            </span>
        </>
    );
}

export default ObjectiveTrackerHeader;

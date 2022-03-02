import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import startCase from "lodash/startCase";
import Button from "@mui/material/Button";
import { useTrackerContext } from "./TrackerProvider";

type Props = Record<string, unknown>;

export function TrackerHeader(props: Props): JSX.Element {
    const {} = props;
    const { data, mode, onClick } = useTrackerContext();
    const modeDisplay = <Typography color="inherit">Current Mode: {startCase(mode)}</Typography>;
    return (
        <>
            {modeDisplay} <Button onClick={() => onClick("celes", 1)}>Click me</Button>
        </>
    );
}

export default TrackerHeader;

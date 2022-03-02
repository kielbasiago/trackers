import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { TrackerContext } from "./TrackerProvider";
import startCase from "lodash/startCase";
type Props = Record<string, unknown>;

export function TrackerHeader(props: Props): JSX.Element {
    const {} = props;
    const data = React.useContext(TrackerContext);
    const mode = <Typography color="inherit">Current Mode: {startCase(data?.mode)}</Typography>;
    return <>{mode}</>;
}

export default TrackerHeader;

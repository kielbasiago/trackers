import { Tooltip, Typography } from "@mui/material";
import React from "react";
import urljoin from "url-join";
import { checkToAsset } from "../../types/ff6-types";
import { LayoutCell, LayoutNumberCell } from "../layout";
import { GetSaveDataResponse } from "../types";
import { useTrackerContext } from "./TrackerProvider";
import clsx from "clsx";
import padStart from "lodash/padStart";

type Props = Record<string, unknown>;
const url = (str: string) => urljoin("https://kielbasa.s3.us-east-2.amazonaws.com/autotracker/images", `${str}.png`);

function render(key: string, displayName: string, className: string) {
    return (
        <Tooltip title={displayName}>
            <img
                id={`cell-${key}`}
                style={{ marginLeft: 2 }}
                src={url(checkToAsset[key])}
                alt={key}
                className={className}
            />
        </Tooltip>
    );
}

function secondsToHms(d: number) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = padStart(h.toString(), 2, "0");
    var mDisplay = padStart(m.toString(), 2, "0");
    var sDisplay = padStart(s.toString(), 2, "0");
    return `${hDisplay}:${mDisplay}:${sDisplay}`;
}

export function TrackerCounts(props: Props): JSX.Element {
    const allData = useTrackerContext();
    const { data } = allData;
    const time = data?.gameTime ?? 0;

    const t = secondsToHms(time);
    return (
        <div style={{ paddingLeft: 16 }}>
            {/* <Typography color="inherit">Time: {t}</Typography> */}
            <Typography color="inherit">{data?.characterCount} Characters</Typography>
            <Typography>{data?.esperCount} Espers</Typography>
            <Typography>{data?.dragonCount} Dragons</Typography>
            <Typography>{data?.checkCount} Checks</Typography>
            <Typography>{data?.bossCount} Bosses</Typography>
        </div>
    );
}

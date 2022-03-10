import Tooltip from "@mui/material/Tooltip";
import startCase from "lodash/startCase";
import React, { useEffect, useState } from "react";
import urljoin from "url-join";
import { useTrackerSettings } from "../../settings/settings";
import { checkToAsset } from "../../types/ff6-types";
import { TrackerMode } from "../types";
import { useTrackerContext } from "./TrackerProvider";

// const url = (str: string) => urljoin("https://kielbasa.s3.us-east-2.amazonaws.com/autotracker/images", `${str}.png`);
const url = (str: string) => urljoin(window.location.origin, "images", `${str}.png`);

export function RenderCell(
    key: string | null,
    displayName: string,
    className: string,
    containerClassName: string,
    adornment: React.ReactNode
): JSX.Element {
    const { onClick, onRightClick } = useTrackerContext();
    const { mode } = useTrackerSettings();

    const [mouseDownTarget, setMouseDownTarget] = useState<EventTarget | null>(null);

    if (!key) {
        return <></>;
    }

    const onMouseDown: React.MouseEventHandler = (e) => {
        setMouseDownTarget(e.target);
    };
    const onMouseUp: React.MouseEventHandler = (e) => {
        if (mouseDownTarget && e.target && e.target === mouseDownTarget) {
            onClick(key);
        }
        setMouseDownTarget(null);
    };

    return (
        <Tooltip title={startCase(displayName)}>
            <span
                onMouseUp={onMouseUp}
                onMouseDown={onMouseDown}
                className={containerClassName}
                style={{ position: "relative", cursor: (mode === TrackerMode.MANUAL && "pointer") || undefined }}
            >
                <img
                    id={`cell-${key}`}
                    src={url(checkToAsset[key])}
                    alt={key}
                    className={`${className} user-select-none`}
                    width={64}
                    height={64}
                    draggable={false}
                />
                {adornment ? adornment : null}
            </span>
        </Tooltip>
    );
}

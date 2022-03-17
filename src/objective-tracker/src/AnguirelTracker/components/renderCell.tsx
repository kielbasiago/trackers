import Tooltip from "@mui/material/Tooltip";
import startCase from "lodash/startCase";
import React, { useEffect, useRef, useState } from "react";
import urljoin from "url-join";
import { useTrackerSettings } from "../../settings/settings";
import { checkToAsset } from "../../types/ff6-types";
import { TrackerMode } from "../types";
import { useTrackerContext } from "./TrackerProvider";

// const url = (str: string) => urljoin("https://kielbasa.s3.us-east-2.amazonaws.com/autotracker/images", `${str}.png`);
export const getAssetUrl = (str: string) => urljoin(window.location.origin, "images", `${str}.png`);

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

    const containerRef = useRef<HTMLSpanElement | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const id = `cell-${key}`;

    const targetId = `${id}-target`;

    useEffect(() => {
        const callback = (e: MouseEvent) => {
            if (document.getElementById(targetId) === e.target) {
                e.preventDefault();
            }
        };
        document.addEventListener("contextmenu", callback);
    }, [targetId]);

    if (!key) {
        return <></>;
    }

    const onMouseDown: React.MouseEventHandler = (e) => {
        setMouseDownTarget(e.target);
    };
    const onMouseUp: React.MouseEventHandler = (e) => {
        if (mouseDownTarget && e.target && e.target === mouseDownTarget) {
            // value sdescribed here: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#value
            if (e.button === 0) {
                onClick(key);
            } else if (e.button === 2) {
                onRightClick(key);
                e.preventDefault();
            }
        }
        setMouseDownTarget(null);
    };

    return (
        <Tooltip title={startCase(displayName)}>
            <>
                <span
                    ref={containerRef}
                    onMouseUp={onMouseUp}
                    onMouseDown={onMouseDown}
                    className={containerClassName}
                    style={{
                        position: "relative",
                        cursor: (mode === TrackerMode.MANUAL && "pointer") || undefined,
                    }}
                >
                    <img
                        ref={imgRef}
                        id={id}
                        src={getAssetUrl(checkToAsset[key])}
                        alt={key}
                        className={`${className} user-select-none`}
                        width={64}
                        height={64}
                        draggable={false}
                    />
                    {adornment ? adornment : null}
                    <div className="overlay" id={targetId}></div>
                </span>
            </>
        </Tooltip>
    );
}

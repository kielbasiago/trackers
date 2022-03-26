import Tooltip from "@mui/material/Tooltip";
import startCase from "lodash/startCase";
import React, { useEffect, useRef, useState } from "react";
import { useTrackerSettings } from "../../settings/settings";
import { TrackerMode } from "../types";
import { useTrackerContext } from "./TrackerProvider";

// const url = (str: string) => urljoin("https://kielbasa.s3.us-east-2.amazonaws.com/autotracker/images", `${str}.png`);

export function RenderCell(
    key: string,
    renderable: React.ReactNode,
    displayName: string,
    className: string,
    containerClassName: string,
    adornment: React.ReactNode,
    opts?: {
        min?: number;
        max?: number;
        value?: number;
    }
): JSX.Element {
    const { onClick, onRightClick } = useTrackerContext();
    const { mode } = useTrackerSettings();

    const [mouseDownTarget, setMouseDownTarget] = useState<EventTarget | null>(null);

    const containerRef = useRef<HTMLSpanElement | null>(null);
    const id = `cell-${key}`;

    const targetId = `${id}-target`;

    useEffect(() => {
        const callback = (e: MouseEvent) => {
            if (document.getElementById(targetId) === e.target) {
                e.preventDefault?.();
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
        if ((!mouseDownTarget && e.target) || e.target === mouseDownTarget) {
            // value sdescribed here: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#value
            if (e.button === 0) {
                onClick(key);
            } else if (e.button === 2) {
                onRightClick(key);
                e.preventDefault?.();
            }
            setMouseDownTarget(null);
        }
    };

    const onWheel: React.WheelEventHandler = (e) => {
        const isUp = e.deltaY < 0;
        const isDown = e.deltaY > 0;
        if (opts && opts?.value === opts?.max && isUp) {
            return;
        }
        if (opts && opts.value === opts?.min && isDown) {
            return;
        }
        const event: React.MouseEvent = {
            ...e,
            button: e.deltaY < 0 ? 0 : 2,
            target: e.target as EventTarget,
        };

        onMouseUp(event);
    };

    return (
        <Tooltip title={startCase(displayName)}>
            <>
                <span
                    ref={containerRef}
                    onMouseUp={onMouseUp}
                    onMouseDown={onMouseDown}
                    onWheel={onWheel}
                    className={containerClassName}
                    style={{
                        position: "relative",
                        cursor: (mode === TrackerMode.MANUAL && "pointer") || undefined,
                    }}
                >
                    {renderable}
                    {adornment ? adornment : null}
                    <div className="overlay" id={targetId}></div>
                </span>
            </>
        </Tooltip>
    );
}

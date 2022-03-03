import Tooltip from "@mui/material/Tooltip";
import { useEffect } from "react";
import urljoin from "url-join";
import { useTrackerSettings } from "../../settings/settings";
import { checkToAsset } from "../../types/ff6-types";
import { TrackerMode } from "../types";
import { useTrackerContext } from "./TrackerProvider";

const url = (str: string) => urljoin("https://kielbasa.s3.us-east-2.amazonaws.com/autotracker/images", `${str}.png`);

export function RenderCell(
    key: string | null,
    displayName: string,
    className: string,
    containerClassName: string,
    adornment: React.ReactNode
): JSX.Element {
    const { onClick, onRightClick } = useTrackerContext();
    const { mode } = useTrackerSettings();

    useEffect(() => {}, []);

    if (!key) {
        return <></>;
    }

    const clickHandler = mode === TrackerMode.AUTO ? () => {} : onClick;
    const rightClickHander = mode === TrackerMode.AUTO ? () => {} : onRightClick;
    return (
        <Tooltip title={displayName}>
            <>
                <span
                    onClick={() => onClick(key)}
                    className={containerClassName}
                    style={{ position: "relative", userSelect: "none" }}
                >
                    <img id={`cell-${key}`} src={url(checkToAsset[key])} alt={key} className={className} />
                    {adornment ? adornment : null}
                </span>
            </>
        </Tooltip>
    );
}

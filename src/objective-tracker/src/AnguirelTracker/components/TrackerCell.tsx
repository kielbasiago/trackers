import { Tooltip, Typography } from "@mui/material";
import React from "react";
import urljoin from "url-join";
import { checkToAsset, FF6Character, FF6Event } from "../../types/ff6-types";
import { DummyCell, LayoutCell, LayoutNumberCell } from "../layout";
import { characterChecks, GetSaveDataResponse } from "../types";
import { TrackerContext } from "./TrackerProvider";
import clsx from "clsx";

type Props = {
    cell: LayoutCell | LayoutNumberCell | DummyCell;
};
const url = (str: string) => urljoin("https://kielbasa.s3.us-east-2.amazonaws.com/autotracker/images", `${str}.png`);

function render(
    key: string | null,
    displayName: string,
    className: string,
    containerClassName: string,
    adornment: React.ReactNode
) {
    if (!key) {
        return <></>;
    }
    return (
        <Tooltip title={displayName}>
            <>
                <span className={containerClassName} style={{ position: "relative", userSelect: "none" }}>
                    <img
                        id={`cell-${key}`}
                        // style={{ marginLeft: 3, zIndex: 10 }}
                        src={url(checkToAsset[key])}
                        alt={key}
                        className={className}
                    />
                </span>
                <span className="adornment">{adornment}</span>
            </>
        </Tooltip>
    );
}

export function TrackerCell(props: Props): JSX.Element {
    const { cell } = props;
    const data = React.useContext(TrackerContext);

    if (!data) {
        return <></>;
    }

    const [key] = cell.value();

    const cc = characterChecks;
    const group = Object.keys(cc).find((character) => {
        return key === character || cc[character as FF6Character].includes(key as FF6Event);
    });
    // const groupClass = `group-${group ?? "none"}`;

    if (cell instanceof LayoutCell) {
        const [key, displayName, callback, gated] = cell.args;

        if (callback == null) {
            return <></>;
        }

        const value = callback(data as GetSaveDataResponse);
        const completed = value as boolean;

        const isAvailable = gated ? gated(data as GetSaveDataResponse) : true;

        return render(
            key,
            displayName,
            clsx(isAvailable || "gated-cell", completed || "inactive-cell", completed && "active-cell"),
            "",
            null
        );
    } else if (cell instanceof LayoutNumberCell) {
        const [key, displayName, callback, gated, options = { min: undefined, max: undefined }] = cell.args;
        const { max, min = 0 } = options;
        const value = callback(data as GetSaveDataResponse) as number;
        const active = Math.max(min, Math.min(max ?? 3, value)) > 0;
        const isAvailable = gated ? gated(data as GetSaveDataResponse) : true;

        const className = clsx(isAvailable || "gated-cell", active || "inactive-cell", active && "active-cell");

        const adornment =
            value === 0 ? null : (
                <div className={"overlay"}>
                    <div className={clsx("overlay-content", `group-${group ?? "none"}`)}>
                        <Typography variant="h6" className={className} style={{ fontSize: "2.2rem" }}>
                            {value}
                        </Typography>
                    </div>
                </div>
            );

        return render(key, displayName, className, "", adornment);
    }

    return <></>;
}

export default TrackerCell;

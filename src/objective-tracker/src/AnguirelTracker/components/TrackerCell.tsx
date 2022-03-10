import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import clsx from "clsx";
import React from "react";
import { useTrackerSettings } from "../../settings/settings";
import { CharacterCell as CharCellType, LayoutCell, LayoutNumberCell } from "../layout";
import { GetSaveDataResponse } from "../types";
import CharacterCell from "./cells/CharacterCell";
import { RenderCell } from "./renderCell";
import { useTrackerContext } from "./TrackerProvider";

type Props = {
    cell: LayoutCell | LayoutNumberCell;
};

const OverlayContainer = styled.div`
    top: 0;
`;

/*
    THREE CELL TYPES:
    Character
    Check
    MultiCheck
*/

export function TrackerCell(props: Props): JSX.Element {
    const { cell } = props;
    const { data } = useTrackerContext();

    if (!data) {
        return <></>;
    }

    if (cell instanceof CharCellType) {
        return <CharacterCell cell={cell} />;
    } else if (cell instanceof LayoutCell) {
        const [key, displayName, callback, gated] = cell.args;

        if (callback == null) {
            return <></>;
        }

        const value = callback(data as GetSaveDataResponse);
        const completed = value as boolean;

        const isAvailable = gated ? gated(data as GetSaveDataResponse) : true;

        return RenderCell(
            key,
            displayName,
            clsx(isAvailable || "gated-cell", completed || "inactive-cell", completed && "complete-cell"),
            "",
            null
        );
    } else if (cell instanceof LayoutNumberCell) {
        const [key, displayName, callback, gated, options = { min: undefined, max: undefined }] = cell.args;

        const { max, min = 0 } = options;
        const value = callback(data as GetSaveDataResponse) as number;
        const active = Math.max(min, Math.min(max ?? 3, value)) > 0;
        const isAvailable = gated ? gated(data as GetSaveDataResponse) : true;

        const className = clsx(isAvailable || "gated-cell", active || "inactive-cell", active && "complete-cell");

        const adornmentValue = value;
        const adornment =
            value === 0 ? null : (
                <OverlayContainer className={"overlay"}>
                    <div className={clsx("overlay-content", "multicheck-cell-flex-end")}>
                        <Typography variant="h6" className={className} style={{ lineHeight: "22px" }}>
                            {adornmentValue}
                        </Typography>
                    </div>
                </OverlayContainer>
            );

        return RenderCell(key, displayName, className, "", adornment);
    }

    return <></>;
}

export default TrackerCell;

import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import clsx from "clsx";
import React from "react";
import { CharacterCell as CharCellType, LayoutCell, LayoutNumberCell } from "../layout";
import { GetSaveDataResponse } from "../types";
import CharacterCell from "./cells/CharacterCell";
import { RenderCell } from "./renderCell";
import { useTrackerContext } from "./TrackerProvider";
import { checkToAsset } from "../../types/ff6-types";
import { getAssetUrl } from "../../utils/getAssetUrl";

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

        const id = `cell-${key}`;

        const isAvailable = gated ? gated(data as GetSaveDataResponse) : true;
        const isComplete = !!value;

        const className = clsx(
            isAvailable || "gated-cell",
            isComplete || "inactive-cell",
            isComplete && "complete-cell"
        );

        const render = (
            <img
                id={id}
                src={getAssetUrl(checkToAsset[key])}
                alt={key}
                className={`${className} user-select-none`}
                width={64}
                height={64}
                draggable={false}
            />
        );

        return RenderCell(
            key,
            render,
            displayName,
            clsx(isAvailable || "gated-cell", completed || "inactive-cell", completed && "complete-cell"),
            "",
            null,
            { min: 0, max: 1, value: value as number }
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

        const id = `cell-${key}`;

        const render = (
            <img
                id={id}
                src={getAssetUrl(checkToAsset[key])}
                alt={key}
                className={`${className} user-select-none`}
                width={64}
                height={64}
                draggable={false}
            />
        );
        return RenderCell(key, render, displayName, className, "", adornment, { min, max, value });
    }

    return <></>;
}

export default TrackerCell;

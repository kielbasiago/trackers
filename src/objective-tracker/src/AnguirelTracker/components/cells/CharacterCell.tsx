import React from "react";
import styled from "@emotion/styled";
import { CharacterCell as CellType } from "../../layout";
import { useTrackerContext } from "../TrackerProvider";
import { characterChecks, GetSaveDataResponse } from "../../types";
import Typography from "@mui/material/Typography";
import { FF6Character } from "../../../types/ff6-types";
import clsx from "clsx";
import { RenderCell } from "../renderCell";
import { useTrackerSettings } from "../../../settings/settings";

type Props = {
    cell: CellType;
};

const charOrder = [
    "terra",
    "setzer",
    "sabin",
    "gau",
    "celes",
    "edgar",
    "shadow",
    "locke",
    "cyan",
    "strago",
    "relm",
    "umaro",
    "mog",
    "gogo",
];

export function CharacterCell(props: Props): JSX.Element {
    const { cell } = props;
    const { data } = useTrackerContext();
    const { characterTag } = useTrackerSettings();

    if (!data) {
        return <></>;
    }

    const [k, displayName, callback, gated, options = { min: undefined, max: undefined }] = cell.args;
    const key = k as FF6Character;
    const { max, min = 0 } = options;
    const value = callback(data) as number;
    const active = Math.max(min, Math.min(max ?? 3, value)) > 0;
    const isAvailable = gated ? gated(data) : true;

    const charData = characterChecks[key];
    const checkCount = charData.length ?? null;
    const completedCheckCount = charData.filter((z) => data.allFlags[z]).length;

    const className = clsx(isAvailable || "gated-cell", active || "inactive-cell", active && "active-cell");
    const fontSize = "1.2rem";
    const showAdornment = characterTag;
    const idx = charOrder.indexOf(key);

    let isRight = !!(idx % 2);

    const complete = completedCheckCount / checkCount === 1;
    // ✅
    const adornmentValue = complete ? (
        <></>
    ) : active ? (
        <>
            {completedCheckCount} / {checkCount}
        </>
    ) : null;

    const adornment =
        !isAvailable || value === 0 ? null : (
            <div className={"overlay"}>
                <div
                    className={clsx(
                        "overlay-content",
                        isRight ? "multicheck-cell-flex-end" : "multicheck-cell-flex-start",
                        !complete && "multicheck-cell-incomplete"
                    )}
                >
                    <Typography
                        color="inherit"
                        variant="h6"
                        className={className}
                        style={{ fontSize: fontSize, lineHeight: "normal" }}
                    >
                        {adornmentValue}
                    </Typography>
                </div>
            </div>
        );

    return RenderCell(key, displayName, className, "", showAdornment ? adornment : null);
}

export default CharacterCell;

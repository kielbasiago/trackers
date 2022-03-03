import React from "react";
import styled from "@emotion/styled";
import { LayoutNumberCell as CellType } from "../../layout";
import { RenderCell } from "../renderCell";
import { useTrackerContext } from "../TrackerProvider";

type Props = {
    cell: CellType;
};

export function MulticheckCell(props: Props): JSX.Element {
    const { cell } = props;
    const data = useTrackerContext();

    if (!data) {
        return <></>;
    }

    const [key] = cell.value();
    return <>{key}</>;
}

export default MulticheckCell;

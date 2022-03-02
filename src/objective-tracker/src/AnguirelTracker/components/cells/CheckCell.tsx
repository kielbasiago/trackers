import React from "react";
import styled from "@emotion/styled";
import { LayoutCell as CellType } from "../../layout";
import { useTrackerContext } from "../TrackerProvider";

type Props = {
    cell: CellType;
};

export function CheckCell(props: Props): JSX.Element {
    const { cell } = props;
    const data = useTrackerContext();
    if (!data) {
        return <></>;
    }

    const [key] = cell.value();
    return <></>;
}

export default CheckCell;

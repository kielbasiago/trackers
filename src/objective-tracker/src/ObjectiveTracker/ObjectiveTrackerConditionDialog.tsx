import React from "react";
import styled from "@emotion/styled";
import { ConditionBitResult, ConditionResponseData } from "../types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Divider from "@mui/material/Divider";

type Props = {
    condition?: ConditionResponseData;
    result?: ConditionBitResult;
    onClose: () => void;
};

const RowContainer = styled.span`
    display: block;
`;

export function ObjectiveTrackerConditionDialog(props: Props) {
    const { condition, result, onClose } = props;
    const open = !!(condition && result);

    if (!open) {
        return null;
    }

    return (
        <Dialog open={open}>
            <DialogTitle></DialogTitle>
            <DialogContent>
                <RowContainer>NAME: {condition.name}</RowContainer>
                <RowContainer>
                    KEY: {condition.conditionDescription}
                </RowContainer>
                <RowContainer>RAW BIT: {condition.bitValue}</RowContainer>
                <RowContainer>TYPE: {condition.conditionType}</RowContainer>
                <Divider />
                <RowContainer>CURRENT VALUE: {result.value}</RowContainer>
                <RowContainer>REQUIRED: {condition.contextValue}</RowContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ObjectiveTrackerConditionDialog;

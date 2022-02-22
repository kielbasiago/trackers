import Typography from "@mui/material/Typography";
import React from "react";
import styled from "@emotion/styled";
// import { styled as muiStyled } from '@mui/styles'
import {
    ConditionBitResult,
    ConditionResponseData,
    CONDITION_BIT_TYPES,
    ObjectiveResponseData,
} from "../types";
import padStart from "lodash/padStart";
import { useTheme } from "@mui/system";
import { createStyles, makeStyles, Theme } from "@mui/material";

type Props = {
    objective: ObjectiveResponseData;
    condition: ConditionResponseData;
    conditionBitResult: ConditionBitResult;
    onClick?: () => void;
    debug?: boolean;
};

const RowContainer = styled.span`
    display: block;
`;
const Complete = styled(Typography)``;

const Incomplete = styled(Typography)``;

const Subtitle = styled(Typography)``;

export function ObjectiveCondition(props: Props) {
    const { condition, conditionBitResult, onClick, debug = false } = props;

    const isEventWord = !CONDITION_BIT_TYPES.includes(condition.conditionType);
    const isComplete = Boolean(
        isEventWord
            ? conditionBitResult?.value >= (condition?.contextValue || 0)
            : conditionBitResult?.value
    );

    const Container = isComplete ? Complete : Incomplete;

    const SubText =
        isEventWord && conditionBitResult ? (
            <>({conditionBitResult.value})</>
        ) : null;

    return (
        <Container
            variant="h6"
            display={isComplete ? "none" : undefined}
            color={(theme) =>
                isComplete ? theme.palette.grey[500] : undefined
            }
        >
            <RowContainer onClick={onClick}>
                &nbsp;&nbsp;&nbsp;&nbsp;{padStart(condition.name)} {SubText}
            </RowContainer>
            {debug ? (
                <RowContainer
                    style={{ textDecoration: "line" }}
                    onClick={onClick}
                >
                    {conditionBitResult?.key}---
                    {conditionBitResult?.value?.toString()}
                </RowContainer>
            ) : null}
            {debug ? (
                <RowContainer>
                    0x{condition.memoryAddr.toString(16)}
                </RowContainer>
            ) : null}
        </Container>
    );
}

export default ObjectiveCondition;

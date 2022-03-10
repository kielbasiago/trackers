import React from "react";
import styled from "@emotion/styled";

import Typography from "@mui/material/Typography";

const STARTING_LETTER_CHAR_CODE = 65;

type Props = {
    index: number;
    name: string;
    totalConditions: number;
    requiredConditions: number;
    completedConditions: number;
};

const Complete = styled(Typography)`
    color: ;
`;

const Incomplete = styled(Typography)``;

export function ObjectiveTitle(props: Props): JSX.Element {
    const { completedConditions, name, requiredConditions, index } = props;

    const letter = <span style={{ marginRight: 4 }}>{String.fromCharCode(STARTING_LETTER_CHAR_CODE + index)}</span>;

    const isComplete = completedConditions / requiredConditions >= 1;

    const Container = isComplete ? Complete : Incomplete;

    return (
        <Container color={(theme) => (isComplete ? theme.palette.grey[500] : undefined)}>
            {letter} {name} {completedConditions}/{requiredConditions}
        </Container>
    );
}

export default ObjectiveTitle;

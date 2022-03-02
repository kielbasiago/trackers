import styled from "@emotion/styled";
import React from "react";

type Props = Record<string, unknown>;

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

export const TrackerRow: React.FC<Props> = (props) => {
    const { children } = props;
    return <Container>{children}</Container>;
};

export default TrackerRow;

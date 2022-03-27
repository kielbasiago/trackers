import styled from "@emotion/styled";
import React from "react";

type Props = {
    col?: boolean;
};
const Container = styled.div<Props>`
    display: flex;
    justify-content: center;
    ${({ col }) => (col ? "flex-direction: column;" : "")}
    ${({ col }) => (col ? "padding-left: 8px;" : "")}
`;

export const TrackerRow: React.FC<Props> = (props) => {
    const { children, ...rest } = props;
    return <Container {...rest}>{children}</Container>;
};

export default TrackerRow;

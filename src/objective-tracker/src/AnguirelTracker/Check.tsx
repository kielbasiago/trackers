import React from "react";
import styled from "@emotion/styled";
const Cell = styled.span`
    display: inline-block;
    min-width: 64px;
    min-height: 64px;
    max-width: 64px;
    max-height: 64px;
    width: 64px;
    border: 1px solid pink;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
`;

type Props = {
    name: string;
    imageUri: string;
    isChecked: boolean;
};

export function Check(props: Props): JSX.Element {
    const { imageUri, isChecked, name } = props;
    return (
        <Cell>
            <img src={imageUri} alt={name} title={name} width={64} height={64} />
            <span>
                {name} {imageUri} {isChecked.toString()}
            </span>
        </Cell>
    );
}

export default Check;

import React from "react";
import styled from "@emotion/styled";
import { getAssetUrl } from "../../../utils/getAssetUrl";

type Props = Record<string, unknown>;

const Container = styled.span``;
// wip, unsure how i want to implement adornments yet
const AdornmentNarsheWeaponShop: React.FC<Props> = (props: Props) => {
    return (
        <Container className={"overlay"}>
            <img src={getAssetUrl("Illumina")} alt="illumina" />
        </Container>
    );
};

export default AdornmentNarsheWeaponShop;

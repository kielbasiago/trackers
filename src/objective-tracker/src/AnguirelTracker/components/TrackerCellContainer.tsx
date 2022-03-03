import React from "react";
import styled from "@emotion/styled";

const characterBackgrounds: Record<string, string> = {
    terra: "#006000",
    setzer: "#703505",
    sabin: "#000060",
    gau: "#807000",
    celes: "#600060",
    edgar: "#000095",
    shadow: "#500000",
    locke: "#003535",
    cyan: "#404535",
    strago: "#706075",
    mog: "#206520",
    relm: "#900080",
    umaro: "#005565",
    gogo: "#403515",
    dragons: "#630000",
    none: "#000000",
};

const CellContainer = styled.span`
    ${Object.keys(characterBackgrounds).map((c) => {
        const retVal = `.group-${c} {
        }
        `;
        return retVal;
    })}
`;

const TrackerCellContainer: React.FC<React.ComponentProps<"div">> = (props) => {
    return <CellContainer {...props} />;
};

export default React.memo(TrackerCellContainer);

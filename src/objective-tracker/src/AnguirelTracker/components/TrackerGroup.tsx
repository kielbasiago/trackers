import React from "react";
import styled from "@emotion/styled";
import { LayoutGroup } from "../layout";
import clsx from "clsx";
import { TrackerMode, TrackerBackground } from "../types";
import { useTrackerSettings } from "../../settings/settings";

type Props = {
    group: LayoutGroup;
};

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
const BaseContainer = styled.div`
    display: flex;
    flex: 1;
    padding-left: 2px;
    padding-right: 2px;
    position: relative;
    ${Object.keys(characterBackgrounds).map((c) => {
        const retVal = `
        &.group-${c}-${TrackerBackground.ANGUIREL} {
            background: ${characterBackgrounds[c]};
        }

        &.group-${c}-${TrackerBackground.TRANSPARENT} {
        }
    `;
        return retVal;
    })};
`;

const OuterContainer = styled(BaseContainer)``;

export const TrackerGroup: React.FC<Props> = (props) => {
    const { children, group } = props;
    const [groupName, justify] = group.args;
    const { background: theme } = useTrackerSettings();

    return (
        <OuterContainer
            className={clsx(`TrackerGroup`, `group-${groupName}`, `group-${groupName}-${theme}`)}
            style={{ justifyContent: justify }}
        >
            {children}
        </OuterContainer>
    );
};

export default TrackerGroup;

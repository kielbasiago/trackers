import { LayoutGroup } from "./layout";
import flatten from "lodash/flatten";
import TrackerCell from "./components/TrackerCell";
import TrackerGroup from "./components/TrackerGroup";
import TrackerRow from "./components/TrackerRow";

export function renderLayout(layout: Array<Array<LayoutGroup>>) {
    return flatten(
        layout.map((layout, layoutIndex) => {
            const $groups = layout.map((group) => {
                const [groupName, _, cells] = group.args;
                const $cells = cells.map((cell) => {
                    return <TrackerCell key={cell.args[0]} cell={cell} />;
                });

                return (
                    <TrackerGroup key={groupName} group={group}>
                        {$cells}
                    </TrackerGroup>
                );
            });

            return <TrackerRow key={layoutIndex}>{$groups}</TrackerRow>;
        })
    );
}

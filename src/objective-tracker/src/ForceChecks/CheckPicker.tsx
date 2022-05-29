import TransferList from "../TransferList/TransferList";
import { all_checks, GROUPS } from "./checks";
import { checkPresets } from "./checkPresets";

export function CheckPicker() {
    return (
        <TransferList
            items={all_checks}
            groups={GROUPS}
            title={"Esper/Item"}
            category={"Checks"}
            presets={checkPresets}
        />
    );
}

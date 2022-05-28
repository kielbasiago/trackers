import TransferList from "../TransferList/TransferList";
import { GROUPS, SPELLS } from "./spells";

export function SpellPicker() {
    return <TransferList items={SPELLS} groups={GROUPS} title={"Spells"} category={"Spells"} />;
}

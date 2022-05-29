import TransferList from "../TransferList/TransferList";
import { spellPresets } from "./spellPreset";
import { GROUPS, SPELLS } from "./spells";

export function SpellPicker() {
    return <TransferList items={SPELLS} groups={GROUPS} title={"Spells"} category={"Spells"} presets={spellPresets} />;
}

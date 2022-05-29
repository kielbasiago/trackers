import { TransferListPreset } from "../TransferList/types";
import { BOLT3, CURE, CURE2, CURE3, FIRE3, ICE3, LIFE, LIFE2, LIFE3, MERTON, ULTIMA } from "./spells";

export const spellPresets: TransferListPreset[] = [
    {
        name: "Top Black Magic",
        description: "All top tier black magic. Includes tier 3 spells, merton, ultima.",
        value: [FIRE3, ICE3, BOLT3, MERTON, ULTIMA],
    },
    {
        name: "Cure Magic",
        description: "All cure magic",
        value: [CURE, CURE2, CURE3],
    },
    {
        name: "Life Magic",
        description: "All life magic",
        value: [LIFE, LIFE2, LIFE3],
    },
];

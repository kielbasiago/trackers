import { NameBit } from "../ForceChecks/NameBit";

export class Spell extends NameBit {
    // constructor(name: string, value: number) {
    //     super(name, value);
    // }
}

const spells = {
    0: "Fire",
    1: "Ice",
    2: "Bolt",
    3: "Poison",
    4: "Drain",
    5: "Fire 2",
    6: "Ice 2",
    7: "Bolt 2",
    8: "Bio",
    9: "Fire 3",
    10: "Ice 3",
    11: "Bolt 3",
    12: "Break",
    13: "Doom",
    14: "Pearl",
    15: "Flare",
    16: "Demi",
    17: "Quartr",
    18: "X-Zone",
    19: "Meteor",
    20: "Ultima",
    21: "Quake",
    22: "W Wind",
    23: "Merton",
    24: "Scan",
    25: "Slow",
    26: "Rasp",
    27: "Mute",
    28: "Safe",
    29: "Sleep",
    30: "Muddle",
    31: "Haste",
    32: "Stop",
    33: "Bserk",
    34: "Float",
    35: "Imp",
    36: "Rflect",
    37: "Shell",
    38: "Vanish",
    39: "Haste2",
    40: "Slow 2",
    41: "Osmose",
    42: "Warp",
    43: "Quick",
    44: "Dispel",
    45: "Cure",
    46: "Cure 2",
    47: "Cure 3",
    48: "Life",
    49: "Life 2",
    50: "Antdot",
    51: "Remedy",
    52: "Regen",
    53: "Life 3",
};

export const SPELLS = Object.entries(spells).map(([key, value]) => {
    return new Spell(value, Number.parseInt(key));
});

export const GROUPS = {
    Black: SPELLS.slice(0, 23),
    Gray: SPELLS.slice(24, 44),
    White: SPELLS.slice(45, 53),
};

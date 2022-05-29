import { NameBit } from "../ForceChecks/NameBit";

export class Spell extends NameBit {}

const spells = {
    0: "Fire",
    5: "Fire 2",
    9: "Fire 3",
    1: "Ice",
    6: "Ice 2",
    10: "Ice 3",
    2: "Bolt",
    7: "Bolt 2",
    11: "Bolt 3",
    3: "Poison",
    8: "Bio",
    4: "Drain",
    14: "Pearl",
    15: "Flare",
    16: "Demi",
    17: "Quartr",
    12: "Break",
    13: "Doom",
    22: "W Wind",
    18: "X-Zone",
    21: "Quake",
    19: "Meteor",
    23: "Merton",
    20: "Ultima",
    24: "Scan",
    26: "Rasp",
    27: "Mute",
    28: "Safe",
    29: "Sleep",
    30: "Muddle",
    31: "Haste",
    39: "Haste2",
    25: "Slow",
    40: "Slow 2",
    32: "Stop",
    33: "Bserk",
    34: "Float",
    35: "Imp",
    36: "Rflect",
    37: "Shell",
    38: "Vanish",
    41: "Osmose",
    42: "Warp",
    43: "Quick",
    44: "Dispel",
    45: "Cure",
    46: "Cure 2",
    47: "Cure 3",
    48: "Life",
    49: "Life 2",
    53: "Life 3",
    50: "Antdot",
    51: "Remedy",
    52: "Regen",
};

export const SPELLS = Object.entries(spells).map(([key, value]) => {
    return new Spell(value, Number.parseInt(key));
});

export const SPELLS_BY_ID = SPELLS.reduce<Record<string, Spell>>((acc, spell) => {
    acc[spell.value] = spell;
    return acc;
}, {});

export const GROUPS = {
    Black: SPELLS.slice(0, 24),
    Gray: SPELLS.slice(24, 45),
    White: SPELLS.slice(45, 54),
};

export const FIRE = SPELLS_BY_ID["0"];
export const FIRE2 = SPELLS_BY_ID["5"];
export const FIRE3 = SPELLS_BY_ID["9"];
export const ICE = SPELLS_BY_ID["1"];
export const ICE2 = SPELLS_BY_ID["6"];
export const ICE3 = SPELLS_BY_ID["10"];
export const BOLT = SPELLS_BY_ID["2"];
export const BOLT2 = SPELLS_BY_ID["7"];
export const BOLT3 = SPELLS_BY_ID["11"];
export const POISON = SPELLS_BY_ID["3"];
export const BIO = SPELLS_BY_ID["8"];
export const DRAIN = SPELLS_BY_ID["4"];
export const PEARL = SPELLS_BY_ID["14"];
export const FLARE = SPELLS_BY_ID["15"];
export const DEMI = SPELLS_BY_ID["16"];
export const QUARTR = SPELLS_BY_ID["17"];
export const BREAK = SPELLS_BY_ID["12"];
export const DOOM = SPELLS_BY_ID["13"];
export const W_WIND = SPELLS_BY_ID["22"];
export const X_Zone = SPELLS_BY_ID["18"];
export const QUAKE = SPELLS_BY_ID["21"];
export const METEOR = SPELLS_BY_ID["19"];
export const MERTON = SPELLS_BY_ID["23"];
export const ULTIMA = SPELLS_BY_ID["20"];
export const SCAN = SPELLS_BY_ID["24"];
export const RASP = SPELLS_BY_ID["26"];
export const MUTE = SPELLS_BY_ID["27"];
export const SAFE = SPELLS_BY_ID["28"];
export const SLEEP = SPELLS_BY_ID["29"];
export const MUDDLE = SPELLS_BY_ID["30"];
export const HASTE = SPELLS_BY_ID["31"];
export const HASTE2 = SPELLS_BY_ID["39"];
export const SLOW = SPELLS_BY_ID["25"];
export const SLOW2 = SPELLS_BY_ID["40"];
export const STOP = SPELLS_BY_ID["32"];
export const BSERK = SPELLS_BY_ID["33"];
export const FLOAT = SPELLS_BY_ID["34"];
export const IMP = SPELLS_BY_ID["35"];
export const RFLECT = SPELLS_BY_ID["36"];
export const SHELL = SPELLS_BY_ID["37"];
export const VANISH = SPELLS_BY_ID["38"];
export const OSMOSE = SPELLS_BY_ID["41"];
export const WARP = SPELLS_BY_ID["42"];
export const QUICK = SPELLS_BY_ID["43"];
export const DISPEL = SPELLS_BY_ID["44"];
export const CURE = SPELLS_BY_ID["45"];
export const CURE2 = SPELLS_BY_ID["46"];
export const CURE3 = SPELLS_BY_ID["47"];
export const LIFE = SPELLS_BY_ID["48"];
export const LIFE2 = SPELLS_BY_ID["49"];
export const LIFE3 = SPELLS_BY_ID["53"];
export const ANTDOT = SPELLS_BY_ID["50"];
export const REMEDY = SPELLS_BY_ID["51"];
export const REGEN = SPELLS_BY_ID["52"];

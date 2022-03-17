import {
    FF6Character,
    FF6Esper,
    FF6EventFlags,
    FF6Event,
    FF6Dragon,
    FF6CharacterFlags,
    FF6DragonFlags,
} from "../types/ff6-types";

export type GetSaveDataResponse = {
    /** set of char ids. If in set, char acquired*/
    characters: FF6CharacterFlags;
    /** count of characters */
    characterCount: number;
    /** count of espers */
    esperCount: number;
    /** set of esper ids. If in set, esper acquired*/
    // espers: FF6Esper;
    /** set of dragon name to if dragon killed */
    dragons: FF6DragonFlags;
    /** count of dragons */
    dragonCount: number;
    /** count of bosses */
    bossCount: number;
    /** count of checks */
    checkCount: number;
    /** count of chests */
    chestCount: number;
    /** game time that has passed */
    gameTime: number;
    events: FF6EventFlags;
    allFlags: FF6EventFlags & FF6CharacterFlags & FF6DragonFlags;
};

export const characterChecks: Record<FF6Character, Array<FF6Event>> = {
    terra: ["leteRiver", "sealedGate", "whelk", "ramuh", "mobliz"],
    locke: ["tunnelArmor", "narsheWeaponShop1", "phoenixCave"],
    cyan: ["doma", "nightmare1", "nightmare2", "nightmare3", "mtZozo"],
    shadow: ["gauManor", "floatingContinent1", "floatingContinent2", "floatingContinent3", "veldtCave"],
    edgar: ["figaroCastleEngineRoom", "ancientCastle", "figaroThrone"],
    sabin: ["barenFalls", "imperialCamp", "mtKoltz", "phantomTrain", "collapsingHouse"],
    celes: ["operaHouse", "chainedCeles", "magitek1", "magitek2", "magitek3"],
    strago: ["burningHouse", "ebotsRock", "fanaticsTower1"],
    relm: ["esperMountain", "owzersMansion"],
    setzer: ["darill", "kohligen"],
    mog: ["loneWolf1"],
    gau: ["veldt", "serpentTrench"],
    gogo: ["zoneEater"],
    umaro: ["umarosCave"],
};

export enum TrackerMode {
    AUTO = "AUTO",
    MANUAL = "MANUAL",
}

export enum TrackerBackground {
    ANGUIREL = "ANGUIREL",
    TRANSPARENT = "TRANSPARENT",
    DARK = "DARK",
}

export enum TrackerFont {
    "FF6" = "FF6",
    "DEFAULT" = "DEFAULT",
}

export enum TrackerThemeMode {
    LIGHT = "light",
    DARK = "dark",
}

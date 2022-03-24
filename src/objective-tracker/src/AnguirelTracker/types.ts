import {
    FF6Character,
    FF6Esper,
    FF6EventFlags,
    FF6Event,
    FF6Dragon,
    FF6CharacterFlags,
    FF6DragonFlags,
    ff6Characters,
} from "../types/ff6-types";
import { LayoutCell, LayoutNumberCell } from "./layout";

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

export const characterNames = Object.keys(characterChecks) as Array<FF6Character>;

export const characterPalettesByKey: Record<FF6Character, number> = {
    terra: 2,
    locke: 1,
    cyan: 4,
    shadow: 4,
    edgar: 0,
    sabin: 0,
    celes: 0,
    strago: 3,
    relm: 3,
    setzer: 4,
    mog: 5,
    gau: 4,
    gogo: 1,
    umaro: 5,
};

export const characterPalettes = characterNames.map((z) => characterPalettesByKey[z]);

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

export enum TrackerTab {
    "GATING" = "GATING",
    "OBJECTIVE" = "OBJECTIVE",
}

export type TrackerContextData = {
    data: GetSaveDataResponse;
    onClick: (key: string) => unknown;
    onRightClick: (key: string) => unknown;
    updateCell: (cell: LayoutCell, value: boolean) => GetSaveDataResponse;
    updateNumberCell: (cell: LayoutNumberCell, value: number) => GetSaveDataResponse;
    updateValue: (key: string, value: any) => GetSaveDataResponse;
    updateData: (data: GetSaveDataResponse) => void;
};

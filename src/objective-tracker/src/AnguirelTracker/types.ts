import { FF6Character, FF6Esper, FF6Events } from "../types/ff6-types";

export type GetSaveDataResponse = {
    /** set of char ids. If in set, char acquired*/
    characters: Record<string, boolean>;
    /** count of characters */
    characterCount: number;
    /** count of espers */
    esperCount: number;
    /** set of esper ids. If in set, esper acquired*/
    espers: FF6Esper;
    /** set of dragon name to if dragon killed */
    dragons: Record<string, boolean>;
    /** count of dragons */
    dragonCount: number;
    /** set of monster id. If in set, rage learned */
    rages: Set<number>;
    /** game time that has passed */
    gameTime: number;
    progression: number;
    events: FF6Events;
};

export const characterChecks: Record<
    keyof typeof FF6Character,
    Array<keyof FF6Events>
> = {
    TERRA: ["leteRiver", "sealedGate", "whelk", "ramuh", "mobliz"],
    LOCKE: ["tunnelArmor", "narsheWeaponShop", "phoenixCave"],
    CYAN: ["doma", "nightmare1", "nightmare2", "nightmare3", "mtZozo"],
    SHADOW: [
        "gauManor",
        "floatingContinent1",
        "floatingContinent2",
        "floatingContinent3",
        "veldtCave",
    ],
    EDGAR: ["figaroCastleEngineRoom", "ancientCastle", "figaroThrone"],
    SABIN: [
        "barenFalls",
        "imperialCamp",
        "mountKoltz",
        "phantomTrain",
        "collapsingHouse",
    ],
    CELES: ["operaHouse", "chainedCeles", "magitek1", "magitek2", "magitek3"],
    STRAGO: ["burningHouse", "ebotsRock", "fanaticsTower"],
    RELM: ["esperMountain", "owzersMansion"],
    SETZER: ["darill", "kohligen"],
    MOG: ["loneWolf"],
    GAU: ["veldt", "serpentTrench"],
    GOGO: ["zoneEater"],
    UMARO: ["umarosCave"],
};

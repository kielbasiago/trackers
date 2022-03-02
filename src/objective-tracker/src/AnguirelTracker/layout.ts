import { FF6Character, FF6CharacterFlags, FF6EsperFlags, FF6EventFlags, FF6Event } from "../types/ff6-types";
import { Tuple } from "../utils/Tuple";
import { GetSaveDataResponse } from "./types";

type Callback = (args: GetSaveDataResponse) => boolean | number;
type DisplayName = string;
type Key = string;
type LayoutCellData = [Key, DisplayName, Callback | null, Callback?];

type NumberOptions = {
    /** default 0 */
    min?: number;
    max: number;
};

type LayoutNumberCellData = [Key, DisplayName, Callback, Callback?, NumberOptions?];

export class LayoutCell extends Tuple<LayoutCellData> {}
export class LayoutNumberCell extends Tuple<LayoutNumberCellData> {}

export class LayoutGroup extends Tuple<
    [string, "flex-start" | "center" | "flex-end", Array<LayoutCell | LayoutNumberCell | DummyCell>]
> {}

// number is the size (between 0-1)
// string is the group
export class DummyCell extends Tuple<[number, string]> {}

const layout = [
    /*********************** ROW 1 ***********************/
    [
        new LayoutGroup("terra", "flex-start", [
            new LayoutCell(
                "terra",
                "terra",
                ({ characters }) => characters.terra,
                ({ characters }) => characters.terra
            ),
            new LayoutCell(
                "leteRiver",
                "leteRiver",
                ({ events }) => events.leteRiver,
                ({ characters }) => characters.terra
            ),
            new LayoutCell(
                "sealedGate",
                "sealedGate",
                ({ events }) => events.sealedGate,
                ({ characters }) => characters.terra
            ),
            new LayoutCell(
                "whelk",
                "whelk",
                ({ events }) => events.whelk,
                ({ characters }) => characters.terra
            ),
            new LayoutCell(
                "ramuh",
                "ramuh",
                ({ events }) => events.ramuh,
                ({ characters }) => characters.terra
            ),
            new LayoutCell(
                "mobliz",
                "mobliz",
                ({ events }) => events.mobliz,
                ({ characters }) => characters.terra
            ),
        ]),
        new LayoutGroup("setzer", "flex-end", [
            new DummyCell(0.5, "setzer"),
            new LayoutCell(
                "darill",
                "darill",
                ({ events }) => events.darill,
                ({ characters }) => characters.setzer
            ),
            new LayoutCell(
                "kohligen",
                "kohligen",
                ({ events }) => events.kohligen,
                ({ characters }) => characters.setzer
            ),
            new LayoutCell(
                "setzer",
                "setzer",
                ({ characters }) => characters.setzer,
                ({ characters }) => characters.setzer
            ),
        ]),
    ],
    /*********************** ROW 2 ***********************/
    [
        new LayoutGroup("sabin", "flex-start", [
            new LayoutCell(
                "sabin",
                "sabin",
                ({ characters }) => characters.sabin,
                ({ characters }) => characters.sabin
            ),
            new LayoutCell(
                "barenFalls",
                "barenFalls",
                ({ events }) => events.barenFalls,
                ({ characters }) => characters.sabin
            ),
            new LayoutCell(
                "imperialCamp",
                "imperialCamp",
                ({ events }) => events.imperialCamp,
                ({ characters }) => characters.sabin
            ),
            new LayoutCell(
                "mtKoltz",
                "mtKoltz",
                ({ events }) => events.mtKoltz,
                ({ characters }) => characters.sabin
            ),
            new LayoutCell(
                "phantomTrain",
                "phantomTrain",
                ({ events }) => events.phantomTrain,
                ({ characters }) => characters.sabin
            ),
            new LayoutCell(
                "collapsingHouse",
                "collapsingHouse",
                ({ events }) => events.collapsingHouse,
                ({ characters }) => characters.sabin
            ),
        ]),

        new LayoutGroup("gau", "flex-end", [
            new DummyCell(1, "gau"),
            new LayoutCell(
                "serpentTrench",
                "serpentTrench",
                ({ events }) => events.serpentTrench,
                ({ characters }) => characters.gau
            ),
            new LayoutCell(
                "veldt",
                "veldt",
                ({ events }) => events.veldt,
                ({ characters }) => characters.gau
            ),
            new LayoutCell(
                "gau",
                "gau",
                ({ characters }) => characters.gau,
                ({ characters }) => characters.gau
            ),
        ]),
    ],
    [
        /*********************** ROW 3 ***********************/
        new LayoutGroup("celes", "flex-start", [
            new LayoutCell(
                "celes",
                "celes",
                ({ characters }) => characters.celes,
                ({ characters }) => characters.celes
            ),
            new LayoutCell(
                "operaHouse",
                "operaHouse",
                ({ events }) => events.operaHouse,
                ({ characters }) => characters.celes
            ),
            new LayoutCell(
                "chainedCeles",
                "chainedCeles",
                ({ events }) => events.chainedCeles,
                ({ characters }) => characters.celes
            ),
            new LayoutNumberCell(
                "magitek",
                "magitek",
                ({ events }) => {
                    // return number of checks done at this point
                    return [events.magitek1, events.magitek2, events.magitek3].filter((z) => !!z).length;
                },
                ({ characters }) => characters.celes,
                {
                    max: 3,
                }
            ),
            new DummyCell(1, "celes"),
        ]),

        new LayoutGroup("none", "center", [
            new LayoutNumberCell(
                "charCount",
                "charCount",
                ({ characters }) => {
                    return Object.values(characters).filter((z) => !!z).length;
                },
                undefined,
                {
                    min: 1,
                    max: 14,
                }
            ),
        ]),
        new LayoutGroup("edgar", "flex-end", [
            new DummyCell(1, "edgar"),
            new LayoutCell(
                "figaroThrone",
                "figaroThrone",
                ({ events }) => events.figaroThrone,
                ({ characters }) => characters.edgar
            ),
            new LayoutCell(
                "figaroCastleEngineRoom",
                "figaroCastleEngineRoom",
                ({ events }) => events.figaroCastleEngineRoom,
                ({ characters }) => characters.edgar
            ),
            new LayoutCell(
                "ancientCastle",
                "ancientCastle",
                ({ events }) => events.ancientCastle,
                ({ characters }) => characters.edgar
            ),
            new LayoutCell(
                "edgar",
                "edgar",
                ({ characters }) => characters.edgar,
                ({ characters }) => characters.edgar
            ),
        ]),
    ],
    /*********************** ROW 4 ***********************/
    [
        new LayoutGroup("shadow", "flex-start", [
            new LayoutCell(
                "shadow",
                "shadow",
                ({ characters }) => characters.shadow,
                ({ characters }) => characters.shadow
            ),
            new LayoutCell(
                "gauManor",
                "gauManor",
                ({ events }) => events.gauManor,
                ({ characters }) => characters.shadow
            ),
            new LayoutNumberCell(
                "floatingContinent",
                "floatingContinent",
                ({ events }) => {
                    // return number of checks done at this point
                    return [events.floatingContinent1, events.floatingContinent2, events.floatingContinent3].filter(
                        (z) => !!z
                    ).length;
                },
                ({ characters }) => characters.shadow,
                {
                    max: 3,
                }
            ),
            new LayoutCell(
                "veldtCave",
                "veldtCave",
                ({ events }) => events.veldtCave,
                ({ characters }) => characters.shadow
            ),
        ]),

        new LayoutGroup("none", "center", [
            new DummyCell(1, "none"),
            new LayoutNumberCell(
                "esperCount",
                "esperCount",
                ({ esperCount }) => {
                    return esperCount;
                },
                undefined,
                {
                    max: 27,
                }
            ),
            new DummyCell(1, "none"),
        ]),

        new LayoutGroup("locke", "flex-end", [
            new LayoutCell(
                "tunnelArmor",
                "tunnelArmor",
                ({ events }) => events.tunnelArmor,
                ({ characters }) => characters.locke
            ),
            new LayoutCell(
                "narsheWeaponShop",
                "narsheWeaponShop",
                ({ events }) => events.narsheWeaponShop,
                ({ characters }) => characters.locke
            ),
            new LayoutCell(
                "phoenixCave",
                "phoenixCave",
                ({ events }) => events.phoenixCave,
                ({ characters }) => characters.locke
            ),
            new LayoutCell(
                "locke",
                "locke",
                ({ characters }) => characters.locke,
                ({ characters }) => characters.locke
            ),
        ]),
    ],
    /*********************** ROW 5 ***********************/
    [
        new LayoutGroup("cyan", "flex-start", [
            new LayoutCell(
                "cyan",
                "cyan",
                ({ characters }) => characters.cyan,
                ({ characters }) => characters.cyan
            ),
            new LayoutCell(
                "doma",
                "doma",
                ({ events }) => events.doma,
                ({ characters }) => characters.cyan
            ),
            new LayoutNumberCell(
                "nightmare",
                "nightmare",
                ({ events }) => {
                    // return number of checks done at this point
                    return [events.nightmare1, events.nightmare2, events.nightmare3].filter((z) => !!z).length;
                },
                ({ characters }) => characters.cyan,
                {
                    max: 3,
                }
            ),
            new LayoutCell(
                "mtZozo",
                "mtZozo",
                ({ events }) => events.mtZozo,
                ({ characters }) => characters.cyan
            ),
        ]),
        new LayoutGroup("none", "center", [
            new DummyCell(1, "none"),
            new LayoutCell("atmaWeapon", "atmaWeapon", ({ events }) => events.atmaWeapon),
            new DummyCell(1, "none"),
        ]),
        new LayoutGroup("strago", "flex-end", [
            new LayoutCell(
                "burningHouse",
                "burningHouse",
                ({ events }) => events.burningHouse,
                ({ characters }) => characters.strago
            ),
            new LayoutCell(
                "ebotsRock",
                "ebotsRock",
                ({ events }) => events.ebotsRock,
                ({ characters }) => characters.strago
            ),
            new LayoutCell(
                "fanaticsTower",
                "fanaticsTower",
                ({ events }) => events.fanaticsTower,
                ({ characters }) => characters.strago
            ),
            new LayoutCell(
                "strago",
                "strago",
                ({ characters }) => characters.strago,
                ({ characters }) => characters.strago
            ),
        ]),
    ],
    /*********************** ROW 6 ***********************/
    [
        new LayoutGroup("relm", "flex-start", [
            new LayoutCell(
                "relm",
                "relm",
                ({ characters }) => characters.relm,
                ({ characters }) => characters.relm
            ),
            new LayoutCell(
                "esperMountain",
                "esperMountain",
                ({ events }) => events.esperMountain,
                ({ characters }) => characters.relm
            ),
            new LayoutCell(
                "owzersMansion",
                "owzersMansion",
                ({ events }) => events.owzersMansion,
                ({ characters }) => characters.relm
            ),
        ]),
        new LayoutGroup("none", "center", [
            new DummyCell(1, "none"),
            new LayoutCell("kefkaAtNarshe", "kefkaAtNarshe", ({ events }) => events.kefkaAtNarshe, undefined),
            new LayoutCell("tzenThief", "tzenThief", ({ events }) => events.tzenThief, undefined),
            new DummyCell(1, "none"),
            new DummyCell(1, "none"),
        ]),
        new LayoutGroup("umaro", "flex-end", [
            new LayoutCell(
                "umarosCave",
                "umarosCave",
                ({ events }) => events.umarosCave,
                ({ characters }) => characters.umaro
            ),
            new LayoutCell(
                "umaro",
                "umaro",
                ({ characters }) => characters.umaro,
                ({ characters }) => characters.umaro
            ),
        ]),
    ],
    /*********************** ROW 7 ***********************/
    [
        new LayoutGroup("mog", "flex-start", [
            new LayoutCell(
                "mog",
                "mog",
                ({ characters }) => characters.mog,
                ({ characters }) => characters.mog
            ),
            new LayoutCell(
                "loneWolf",
                "loneWolf",
                ({ events }) => events.loneWolf,
                ({ characters }) => characters.mog
            ),
            new DummyCell(1, "mog"),
            new DummyCell(1, "mog"),
        ]),
        new LayoutGroup("none", "center", [
            new LayoutNumberCell(
                "auctionHouse",
                "auctionHouse",
                ({ events }) => {
                    // return number of checks done at this point
                    return [events.auctionHouse1, events.auctionHouse2].filter((z) => !!z).length;
                },
                undefined,
                {
                    max: 2,
                }
            ),
            new LayoutCell("tritoch", "tritoch", ({ events }) => events.tritoch),
            new LayoutCell("doomGaze", "doomGaze", ({ events }) => events.doomGaze),
        ]),
        new LayoutGroup("gogo", "flex-end", [
            new DummyCell(1, "gogo"),
            new DummyCell(1, "gogo"),
            new LayoutCell(
                "zoneEater",
                "zoneEater",
                ({ events }) => events.zoneEater,
                ({ characters }) => characters.gogo
            ),
            new LayoutCell(
                "gogo",
                "gogo",
                ({ characters }) => characters.gogo,
                ({ characters }) => characters.gogo
            ),
        ]),
    ],
    [
        /*********************** ROW 7 ***********************/
        new LayoutGroup("dragons", "center", [
            new DummyCell(1, "none"),
            new DummyCell(1, "none"),
            new LayoutCell("blueDragon", "blueDragon", ({ dragons }) => dragons.blueDragon),
            new LayoutCell("iceDragon", "iceDragon", ({ dragons }) => dragons.iceDragon),
            new LayoutCell("stormDragon", "stormDragon", ({ dragons }) => dragons.stormDragon),
            new LayoutCell("dirtDragon", "dirtDragon", ({ dragons }) => dragons.dirtDragon),
            new LayoutCell("goldDragon", "goldDragon", ({ dragons }) => dragons.goldDragon),
            new LayoutCell("skullDragon", "skullDragon", ({ dragons }) => dragons.skullDragon),
            new LayoutCell("redDragon", "redDragon", ({ dragons }) => dragons.redDragon),
            new LayoutCell("whiteDragon", "whiteDragon", ({ dragons }) => dragons.whiteDragon),
            new DummyCell(1, "none"),
            new DummyCell(1, "none"),
        ]),
    ],
];

export { layout };

import { TransferListPreset } from "../TransferList/types";
import {
    ANCIENT_CASTLE,
    AUCTION1,
    AUCTION2,
    BURNING_HOUSE,
    COLLAPSING_HOUSE,
    FANATICS_TOWER_FOLLOWER,
    FIGARO_CASTLE_THRONE,
    FLOATING_CONT_ARRIVE,
    FLOATING_CONT_BEAST,
    FLOATING_CONT_ESCAPE,
    GAUS_FATHERS_HOUSE,
    KOHLINGEN_CAFE,
    LETE_RIVER,
    MAGITEK_FACTORY_FINISH,
    MT_ZOZO,
    NARSHE_BATTLE,
    NARSHE_WEAPON_SHOP,
    NARSHE_WEAPON_SHOP_MINES,
    OPERA_HOUSE_DISRUPTION,
    PHANTOM_TRAIN,
    PHOENIX_CAVE,
    SEALED_GATE,
    SOUTH_FIGARO_PRISONER,
    TZEN_THIEF,
} from "./checks";

export const checkPresets: TransferListPreset[] = [
    {
        name: "No Free Progression",
        description:
            "Free checks that can be completed in under 90 seconds and have no other external resource requirements (i.e. Gold)",
        value: [
            SOUTH_FIGARO_PRISONER,
            MT_ZOZO,
            FIGARO_CASTLE_THRONE,
            NARSHE_WEAPON_SHOP,
            NARSHE_WEAPON_SHOP_MINES,
            COLLAPSING_HOUSE,
            KOHLINGEN_CAFE,
            GAUS_FATHERS_HOUSE,
            SEALED_GATE,
        ],
    },
    {
        name: "No Free Progression (Classic)",
        description: "No free progression, but including Auction House and Tzen Thief.",
        value: [
            SOUTH_FIGARO_PRISONER,
            MT_ZOZO,
            FIGARO_CASTLE_THRONE,
            NARSHE_WEAPON_SHOP,
            NARSHE_WEAPON_SHOP_MINES,
            COLLAPSING_HOUSE,
            KOHLINGEN_CAFE,
            GAUS_FATHERS_HOUSE,
            SEALED_GATE,
            AUCTION1,
            AUCTION2,
            TZEN_THIEF,
        ],
    },
    {
        name: "Sedentary Lifestyle (by Xelpher)",
        description: "The longer checks in the game",
        value: [
            OPERA_HOUSE_DISRUPTION,
            MAGITEK_FACTORY_FINISH,
            ANCIENT_CASTLE,
            PHOENIX_CAVE,
            PHANTOM_TRAIN,
            FLOATING_CONT_ARRIVE,
            FLOATING_CONT_BEAST,
            FLOATING_CONT_ESCAPE,
            BURNING_HOUSE,
            FANATICS_TOWER_FOLLOWER,
            LETE_RIVER,
            NARSHE_BATTLE,
        ],
    },
];

console.log(
    [
        AUCTION1,
        AUCTION2,
        TZEN_THIEF,
        SOUTH_FIGARO_PRISONER,
        MT_ZOZO,
        FIGARO_CASTLE_THRONE,
        NARSHE_WEAPON_SHOP,
        NARSHE_WEAPON_SHOP_MINES,
        COLLAPSING_HOUSE,
        KOHLINGEN_CAFE,
        GAUS_FATHERS_HOUSE,
        SEALED_GATE,
    ]
        .map((z) => z.value)
        .join(",")
);

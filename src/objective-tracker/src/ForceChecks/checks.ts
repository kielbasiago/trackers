import * as event_bit from "./event_bit";
import * as npc_bit from "./npc_bit";
import { RewardType } from "./constants";
import { NameBit } from "./NameBit";

export class ForcedCheck extends NameBit {
    private readonly reward: number;

    constructor(name: string, value: number, reward: number) {
        super(name, value);
        this.reward = reward;
    }
}

export const CHAR_ESPER_REWARD = RewardType.CHARACTER | RewardType.ESPER;
export const ANY_REWARD = RewardType.CHARACTER | RewardType.ESPER | RewardType.ITEM;
export const ESPER_ITEM_REWARD = RewardType.ESPER | RewardType.ITEM;
export const ITEM_REWARD = RewardType.ITEM;

export const AUCTION1 = new ForcedCheck("Auction House 1", event_bit.AUCTION_BOUGHT_ESPER1, ESPER_ITEM_REWARD);
export const AUCTION2 = new ForcedCheck("Auction House 2", event_bit.AUCTION_BOUGHT_ESPER2, ESPER_ITEM_REWARD);
export const ANCIENT_CASTLE = new ForcedCheck("Ancient Castle", event_bit.GOT_RAIDEN, ANY_REWARD);
export const BAREN_FALLS = new ForcedCheck("Baren Falls", event_bit.NAMED_GAU, ANY_REWARD);
export const BURNING_HOUSE = new ForcedCheck("Burning House", event_bit.DEFEATED_FLAME_EATER, ANY_REWARD);
export const COLLAPSING_HOUSE = new ForcedCheck("Collapsing House", event_bit.FINISHED_COLLAPSING_HOUSE, ANY_REWARD);
export const DARYLS_TOMB = new ForcedCheck("Daryl's Tomb", event_bit.DEFEATED_DULLAHAN, ANY_REWARD);
export const DOMA_SIEGE = new ForcedCheck("Doma Siege", event_bit.FINISHED_DOMA_WOB, ANY_REWARD);
export const DOMA_DREAM_DOOR = new ForcedCheck("Doma Dream 1 (Door)", event_bit.DEFEATED_STOOGES, ESPER_ITEM_REWARD);
export const DOMA_DREAM_AWAKEN = new ForcedCheck(
    "Doma Dream 2 (Awaken)",
    event_bit.FINISHED_DOMA_WOR,
    CHAR_ESPER_REWARD
);
export const DOMA_DREAM_THRONE = new ForcedCheck("Doma Dream 3 (Throne)", event_bit.GOT_ALEXANDR, ESPER_ITEM_REWARD);
export const EBOTS_ROCK = new ForcedCheck("Ebot's Rock", event_bit.DEFEATED_HIDON, ANY_REWARD);
export const ESPER_MOUNTAIN = new ForcedCheck("Esper Mountain", event_bit.DEFEATED_ULTROS_ESPER_MOUNTAIN, ANY_REWARD);
export const FANATICS_TOWER_LEADER = new ForcedCheck(
    "Fanatic's Tower Leader",
    event_bit.DEFEATED_MAGIMASTER,
    ESPER_ITEM_REWARD
);
export const FANATICS_TOWER_FOLLOWER = new ForcedCheck(
    "Fanatic's Tower Follower",
    event_bit.RECRUITED_STRAGO_FANATICS_TOWER,
    CHAR_ESPER_REWARD
);
export const FIGARO_CASTLE_THRONE = new ForcedCheck("Figaro Castle Throne", event_bit.NAMED_EDGAR, ANY_REWARD);
export const FIGARO_CASTLE_ENGINE = new ForcedCheck(
    "Figaro Castle Engine",
    event_bit.DEFEATED_TENTACLES_FIGARO,
    ANY_REWARD
);
export const FLOATING_CONT_ARRIVE = new ForcedCheck(
    "Floating Continent 1 (Arrival)",
    event_bit.RECRUITED_SHADOW_FLOATING_CONTINENT,
    CHAR_ESPER_REWARD
);
export const FLOATING_CONT_BEAST = new ForcedCheck(
    "Floating Continent 2 (Beast)",
    event_bit.DEFEATED_ATMAWEAPON,
    ESPER_ITEM_REWARD
);
export const FLOATING_CONT_ESCAPE = new ForcedCheck(
    "Floating Continent 3 (Escape)",
    event_bit.FINISHED_FLOATING_CONTINENT,
    CHAR_ESPER_REWARD
);
export const GAUS_FATHERS_HOUSE = new ForcedCheck(
    "Gau's Father's House",
    event_bit.RECRUITED_SHADOW_GAU_FATHER_HOUSE,
    ANY_REWARD
);
export const IMPERIAL_CAMP = new ForcedCheck("Imperial Camp", event_bit.FINISHED_IMPERIAL_CAMP, ANY_REWARD);
export const KEFKAS_TOWER_CELL_BEAST = new ForcedCheck(
    "Kefka's Tower Cell Beast",
    event_bit.DEFEATED_ATMA,
    ITEM_REWARD
);
export const KOHLINGEN_CAFE = new ForcedCheck("Kohlingen Cafe", event_bit.RECRUITED_SHADOW_KOHLINGEN, ANY_REWARD);
export const LETE_RIVER = new ForcedCheck("Lete River", event_bit.RODE_RAFT_LETE_RIVER, ANY_REWARD);
export const LONE_WOLF_CHASE = new ForcedCheck("Lone Wolf Chase", event_bit.CHASING_LONE_WOLF7, ANY_REWARD);
export const LONE_WOLF_MOOGLE_ROOM = new ForcedCheck(
    "Lone Wolf Moogle Room",
    event_bit.GOT_BOTH_REWARDS_LONE_WOLF,
    ESPER_ITEM_REWARD
);
export const MAGITEK_FACTORY_TRASH = new ForcedCheck(
    "Magitek Factory 1 (Trash)",
    event_bit.GOT_IFRIT_SHIVA,
    ESPER_ITEM_REWARD
);
export const MAGITEK_FACTORY_GUARD = new ForcedCheck(
    "Magitek Factory 2 (Guard)",
    event_bit.DEFEATED_NUMBER_024,
    ESPER_ITEM_REWARD
);
export const MAGITEK_FACTORY_FINISH = new ForcedCheck(
    "Magitek Factory 3 (Finish)",
    event_bit.DEFEATED_CRANES,
    CHAR_ESPER_REWARD
);
export const MOBLIZ_ATTACK = new ForcedCheck("Mobliz Attack", event_bit.RECRUITED_TERRA_MOBLIZ, ANY_REWARD);
export const MT_KOLTS = new ForcedCheck("Mt. Kolts", event_bit.DEFEATED_VARGAS, ANY_REWARD);
export const MT_ZOZO = new ForcedCheck("Mt. Zozo", event_bit.FINISHED_MT_ZOZO, ANY_REWARD);
export const NARSHE_BATTLE = new ForcedCheck("Narshe Battle", event_bit.FINISHED_NARSHE_BATTLE, ANY_REWARD);
export const NARSHE_WEAPON_SHOP = new ForcedCheck("Narshe Weapon Shop", event_bit.GOT_RAGNAROK, ESPER_ITEM_REWARD);
export const NARSHE_WEAPON_SHOP_MINES = new ForcedCheck(
    "Narshe Weapon Shop Mines",
    event_bit.GOT_BOTH_REWARDS_WEAPON_SHOP,
    ESPER_ITEM_REWARD
);
export const OPERA_HOUSE_DISRUPTION = new ForcedCheck(
    "Opera House Disruption",
    event_bit.FINISHED_OPERA_DISRUPTION,
    ANY_REWARD
);
export const OWZERS_MANSION = new ForcedCheck("Owzer's Mansion", event_bit.DEFEATED_CHADARNOOK, ANY_REWARD);
export const PHANTOM_TRAIN = new ForcedCheck("Phantom Train", event_bit.GOT_PHANTOM_TRAIN_REWARD, ANY_REWARD);
export const PHOENIX_CAVE = new ForcedCheck("Phoenix Cave", event_bit.RECRUITED_LOCKE_PHOENIX_CAVE, ANY_REWARD);
export const SEALED_GATE = new ForcedCheck("Sealed Gate", npc_bit.BLOCK_SEALED_GATE, ANY_REWARD);
export const SEARCH_THE_SKIES = new ForcedCheck("Search The Skies", event_bit.DEFEATED_DOOM_GAZE, ESPER_ITEM_REWARD);
export const SERPENT_TRENCH = new ForcedCheck("Serpent Trench", event_bit.GOT_SERPENT_TRENCH_REWARD, ANY_REWARD);
export const SOUTH_FIGARO_PRISONER = new ForcedCheck("South Figaro Prisoner", event_bit.FREED_CELES, ANY_REWARD);
export const SOUTH_FIGARO_CAVE = new ForcedCheck("South Figaro Cave", event_bit.DEFEATED_TUNNEL_ARMOR, ANY_REWARD);
export const TRITOCH_CLIFF = new ForcedCheck("Tritoch (Cliff)", event_bit.GOT_TRITOCH, ESPER_ITEM_REWARD);
export const TZEN_THIEF = new ForcedCheck("Tzen Thief", event_bit.BOUGHT_ESPER_TZEN, ESPER_ITEM_REWARD);
export const UMAROS_CAVE = new ForcedCheck("Umaro's Cave", event_bit.RECRUITED_UMARO_WOR, ANY_REWARD);
export const VELDT = new ForcedCheck("Veldt", event_bit.VELDT_REWARD_OBTAINED, ESPER_ITEM_REWARD);
export const VELDT_CAVE = new ForcedCheck("Veldt Cave", event_bit.DEFEATED_SR_BEHEMOTH, ANY_REWARD);
export const WHELK_GATE = new ForcedCheck("Whelk Gate", event_bit.DEFEATED_WHELK, ANY_REWARD);
export const ZONE_EATER = new ForcedCheck("Zone Eater", event_bit.RECRUITED_GOGO_WOR, ANY_REWARD);
export const ZOZO_TOWER = new ForcedCheck("Zozo Tower", event_bit.GOT_ZOZO_REWARD, ANY_REWARD);

export const ANCIENT_CASTLE_DRAGON = new ForcedCheck(
    "Ancient Castle Dragon",
    event_bit.DEFEATED_ANCIENT_CASTLE_DRAGON,
    ITEM_REWARD
);
export const FANATICS_TOWER_DRAGON = new ForcedCheck(
    "Fanatic's Tower Dragon",
    event_bit.DEFEATED_FANATICS_TOWER_DRAGON,
    ITEM_REWARD
);
export const KEFKAS_TOWER_DRAGON_G = new ForcedCheck(
    "Kefka's Tower Dragon G",
    event_bit.DEFEATED_KEFKA_TOWER_DRAGON_G,
    ITEM_REWARD
);
export const KEFKAS_TOWER_DRAGON_S = new ForcedCheck(
    "Kefka's Tower Dragon S",
    event_bit.DEFEATED_KEFKA_TOWER_DRAGON_S,
    ITEM_REWARD
);
export const MT_ZOZO_DRAGON = new ForcedCheck("Mt. Zozo Dragon", event_bit.DEFEATED_MT_ZOZO_DRAGON, ITEM_REWARD);
export const NARSHE_DRAGON = new ForcedCheck("Narshe Dragon", event_bit.DEFEATED_NARSHE_DRAGON, ITEM_REWARD);
export const OPERA_HOUSE_DRAGON = new ForcedCheck(
    "Opera House Dragon",
    event_bit.DEFEATED_OPERA_HOUSE_DRAGON,
    ITEM_REWARD
);
export const PHOENIX_CAVE_DRAGON = new ForcedCheck(
    "Phoenix Cave Dragon",
    event_bit.DEFEATED_PHOENIX_CAVE_DRAGON,
    ITEM_REWARD
);

// Checks
export const all_checks = [
    ANCIENT_CASTLE,
    AUCTION1,
    AUCTION2,
    BAREN_FALLS,
    BURNING_HOUSE,
    COLLAPSING_HOUSE,
    DARYLS_TOMB,
    DOMA_SIEGE,
    DOMA_DREAM_DOOR,
    DOMA_DREAM_AWAKEN,
    DOMA_DREAM_THRONE,
    EBOTS_ROCK,
    ESPER_MOUNTAIN,
    FANATICS_TOWER_FOLLOWER,
    FANATICS_TOWER_LEADER,
    FIGARO_CASTLE_THRONE,
    FIGARO_CASTLE_ENGINE,
    FLOATING_CONT_ARRIVE,
    FLOATING_CONT_BEAST,
    FLOATING_CONT_ESCAPE,
    GAUS_FATHERS_HOUSE,
    IMPERIAL_CAMP,
    KOHLINGEN_CAFE,
    LETE_RIVER,
    LONE_WOLF_CHASE,
    LONE_WOLF_MOOGLE_ROOM,
    MAGITEK_FACTORY_TRASH,
    MAGITEK_FACTORY_GUARD,
    MAGITEK_FACTORY_FINISH,
    MOBLIZ_ATTACK,
    MT_KOLTS,
    MT_ZOZO,
    NARSHE_BATTLE,
    NARSHE_WEAPON_SHOP,
    NARSHE_WEAPON_SHOP_MINES,
    OPERA_HOUSE_DISRUPTION,
    OWZERS_MANSION,
    PHANTOM_TRAIN,
    PHOENIX_CAVE,
    SEALED_GATE,
    SEARCH_THE_SKIES,
    SERPENT_TRENCH,
    SOUTH_FIGARO_PRISONER,
    SOUTH_FIGARO_CAVE,
    TRITOCH_CLIFF,
    TZEN_THIEF,
    UMAROS_CAVE,
    VELDT,
    VELDT_CAVE,
    WHELK_GATE,
    ZONE_EATER,
    ZOZO_TOWER,

    // Dragons
    // ANCIENT_CASTLE_DRAGON,
    // FANATICS_TOWER_DRAGON,
    // KEFKAS_TOWER_DRAGON_G,
    // KEFKAS_TOWER_DRAGON_S,
    // MT_ZOZO_DRAGON,
    // NARSHE_DRAGON,
    // OPERA_HOUSE_DRAGON,
    // PHOENIX_CAVE_DRAGON,

    // // KT
    // KEFKAS_TOWER_CELL_BEAST,
];

export const Celes = [
    OPERA_HOUSE_DISRUPTION,
    SOUTH_FIGARO_PRISONER,
    MAGITEK_FACTORY_TRASH,
    MAGITEK_FACTORY_GUARD,
    MAGITEK_FACTORY_FINISH,
];
export const Cyan = [DOMA_SIEGE, MT_ZOZO, DOMA_DREAM_DOOR, DOMA_DREAM_AWAKEN, DOMA_DREAM_THRONE];
export const Edgar = [ANCIENT_CASTLE, FIGARO_CASTLE_THRONE, FIGARO_CASTLE_ENGINE];
export const Gau = [SERPENT_TRENCH, VELDT];
export const Gogo = [ZONE_EATER];
export const Locke = [NARSHE_WEAPON_SHOP, NARSHE_WEAPON_SHOP_MINES, SOUTH_FIGARO_CAVE, PHOENIX_CAVE];
export const Mog = [LONE_WOLF_CHASE, LONE_WOLF_MOOGLE_ROOM];
export const Relm = [ESPER_MOUNTAIN, OWZERS_MANSION];
export const Sabin = [BAREN_FALLS, COLLAPSING_HOUSE, IMPERIAL_CAMP, MT_KOLTS, PHANTOM_TRAIN];
export const Setzer = [DARYLS_TOMB, KOHLINGEN_CAFE, SEARCH_THE_SKIES];
export const Shadow = [GAUS_FATHERS_HOUSE, VELDT_CAVE, FLOATING_CONT_ARRIVE, FLOATING_CONT_BEAST, FLOATING_CONT_ESCAPE];
export const Strago = [BURNING_HOUSE, EBOTS_ROCK, FANATICS_TOWER_LEADER, FANATICS_TOWER_FOLLOWER];
export const Terra = [LETE_RIVER, MOBLIZ_ATTACK, SEALED_GATE, WHELK_GATE, ZOZO_TOWER];
export const Umaro = [UMAROS_CAVE];

export const Ungated = [AUCTION1, AUCTION2, NARSHE_BATTLE, TRITOCH_CLIFF, TZEN_THIEF];

export const GROUPS = {
    Celes,
    Cyan,
    Edgar,
    Gau,
    Gogo,
    Locke,
    Mog,
    Relm,
    Sabin,
    Setzer,
    Shadow,
    Strago,
    Terra,
    Umaro,
    Ungated,
};

// Dragons
export const DRAGONS = [
    ANCIENT_CASTLE_DRAGON,
    FANATICS_TOWER_DRAGON,
    KEFKAS_TOWER_DRAGON_G,
    KEFKAS_TOWER_DRAGON_S,
    MT_ZOZO_DRAGON,
    NARSHE_DRAGON,
    OPERA_HOUSE_DRAGON,
    PHOENIX_CAVE_DRAGON,
];

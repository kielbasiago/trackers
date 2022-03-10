import { FF6Character, FF6Dragon, FF6Event } from "../types/ff6-types";
import { Tuple } from "../utils/Tuple";
import * as event_bits from "./_eventBits";
import * as npc_bit from "./_npcBits";

export class NameBit extends Tuple<[string, string, number], never> {
    public readonly byte: number;
    public readonly bit: number;
    public readonly key: string;
    public readonly raw_bit: number;
    public readonly name: string;
    constructor(key: string, name: string, bit: number) {
        super(key, name, bit);
        this.key = key;
        this.name = name;
        this.byte = Math.floor(bit / 8);
        this.raw_bit = bit;
        this.bit = bit % 8;
    }
}

const getCharBit = (char_idx: number) => 0x2e0 + char_idx;

export const character_bit: Record<FF6Character, NameBit> = {
    terra: new NameBit("terra", "Terra", getCharBit(0)),
    locke: new NameBit("locke", "Locke", getCharBit(1)),
    cyan: new NameBit("cyan", "Cyan", getCharBit(2)),
    shadow: new NameBit("shadow", "Shadow", getCharBit(3)),
    edgar: new NameBit("edgar", "Edgar", getCharBit(4)),
    sabin: new NameBit("sabin", "Sabin", getCharBit(5)),
    celes: new NameBit("celes", "Celes", getCharBit(6)),
    strago: new NameBit("strago", "Strago", getCharBit(7)),
    relm: new NameBit("relm", "Relm", getCharBit(8)),
    setzer: new NameBit("setzer", "Setzer", getCharBit(9)),
    mog: new NameBit("mog", "Mog", getCharBit(10)),
    gau: new NameBit("gau", "Gau", getCharBit(11)),
    gogo: new NameBit("gogo", "Gogo", getCharBit(12)),
    umaro: new NameBit("umaro", "Umaro", getCharBit(13)),
};

export const event_bit: Record<FF6Event, NameBit> = {
    ancientCastle: new NameBit("ancientCastle", "Ancient Castle", event_bits.GOT_RAIDEN),
    barenFalls: new NameBit("barenFalls", "Baren Falls", event_bits.NAMED_GAU),
    burningHouse: new NameBit("burningHouse", "Burning House", event_bits.DEFEATED_FLAME_EATER),
    collapsingHouse: new NameBit("collapsingHouse", "Collapsing House", event_bits.FINISHED_COLLAPSING_HOUSE),
    darill: new NameBit("darill", "Daryl's Tomb", event_bits.DEFEATED_DULLAHAN),
    doma: new NameBit("doma", "Doma Siege", event_bits.FINISHED_DOMA_WOB),
    nightmare1: new NameBit("nightmare1", "Doma Dream Door", event_bits.DEFEATED_STOOGES),
    nightmare2: new NameBit("nightmare2", "Doma Dream Awaken", event_bits.FINISHED_DOMA_WOR),
    nightmare3: new NameBit("nightmare3", "Doma Dream Throne", event_bits.GOT_ALEXANDR),
    ebotsRock: new NameBit("ebotsRock", "Ebot's Rock", event_bits.DEFEATED_HIDON),
    esperMountain: new NameBit("esperMountain", "Esper Mountain", event_bits.DEFEATED_ULTROS_ESPER_MOUNTAIN),
    fanaticsTower: new NameBit("fanaticsTower", "Fanatic's Tower Follower", event_bits.RECRUITED_STRAGO_FANATICS_TOWER),
    figaroThrone: new NameBit("figaroThrone", "Figaro Castle Throne", event_bits.NAMED_EDGAR),
    figaroCastleEngineRoom: new NameBit(
        "figaroCastleEngineRoom",
        "Figaro Castle Engine",
        event_bits.DEFEATED_TENTACLES_FIGARO
    ),
    floatingContinent1: new NameBit(
        "floatingContinent1",
        "Floating Cont. Arrive",
        event_bits.RECRUITED_SHADOW_FLOATING_CONTINENT
    ),
    floatingContinent2: new NameBit("floatingContinent2", "Floating Cont. Beast", event_bits.DEFEATED_ATMAWEAPON),
    floatingContinent3: new NameBit(
        "floatingContinent3",
        "Floating Cont. Escape",
        event_bits.FINISHED_FLOATING_CONTINENT
    ),
    gauManor: new NameBit("gauManor", "Gau's Father's House", event_bits.RECRUITED_SHADOW_GAU_FATHER_HOUSE),
    imperialCamp: new NameBit("imperialCamp", "Imperial Camp", event_bits.FINISHED_IMPERIAL_CAMP),
    atmaWeapon: new NameBit("atmaWeapon", "Kefka's Tower Cell Beast", event_bits.DEFEATED_ATMA),
    kohligen: new NameBit("kohligen", "Kohlingen Cafe", event_bits.RECRUITED_SHADOW_KOHLINGEN),
    leteRiver: new NameBit("leteRiver", "Lete River", event_bits.RODE_RAFT_LETE_RIVER),
    loneWolf: new NameBit("loneWolf", "Lone Wolf Chase", event_bits.CHASING_LONE_WOLF7),
    magitek1: new NameBit("magitek1", "Magitek Factory Trash", event_bits.GOT_IFRIT_SHIVA),
    magitek2: new NameBit("magitek2", "Magitek Factory Guard", event_bits.DEFEATED_NUMBER_024),
    magitek3: new NameBit("magitek3", "Magitek Factory Finish", event_bits.DEFEATED_CRANES),
    mobliz: new NameBit("mobliz", "Mobliz Attack", event_bits.RECRUITED_TERRA_MOBLIZ),
    mtKoltz: new NameBit("mtKoltz", "Mt. Kolts", event_bits.DEFEATED_VARGAS),
    mtZozo: new NameBit("mtZozo", "Mt. Zozo", event_bits.FINISHED_MT_ZOZO),
    kefkaAtNarshe: new NameBit("kefkaAtNarshe", "Narshe Battle", event_bits.FINISHED_NARSHE_BATTLE),
    narsheWeaponShop: new NameBit("narsheWeaponShop", "Narshe Weapon Shop", event_bits.GOT_RAGNAROK),
    operaHouse: new NameBit("operaHouse", "Opera House Disruption", event_bits.FINISHED_OPERA_DISRUPTION),
    owzersMansion: new NameBit("owzersMansion", "Owzer's Mansion", event_bits.DEFEATED_CHADARNOOK),
    phantomTrain: new NameBit("phantomTrain", "Phantom Train", event_bits.GOT_PHANTOM_TRAIN_REWARD),
    phoenixCave: new NameBit("phoenixCave", "Phoenix Cave", event_bits.RECRUITED_LOCKE_PHOENIX_CAVE),
    sealedGate: new NameBit("sealedGate", "Sealed Gate", npc_bit.BLOCK_SEALED_GATE),
    doomGaze: new NameBit("doomGaze", "Search The Skies", event_bits.DEFEATED_DOOM_GAZE),
    serpentTrench: new NameBit("serpentTrench", "Serpent Trench", event_bits.GOT_SERPENT_TRENCH_REWARD),
    chainedCeles: new NameBit("chainedCeles", "South Figaro Prisoner", event_bits.FREED_CELES),
    tunnelArmor: new NameBit("tunnelArmor", "South Figaro Cave", event_bits.DEFEATED_TUNNEL_ARMOR),
    tritoch: new NameBit("tritoch", "Tritoch Cliff", event_bits.GOT_TRITOCH),
    tzenThief: new NameBit("tzenThief", "Tzen Thief", event_bits.BOUGHT_ESPER_TZEN),
    umarosCave: new NameBit("umarosCave", "Umaro's Cave", event_bits.RECRUITED_UMARO_WOR),
    veldt: new NameBit("veldt", "Veldt", event_bits.VELDT_REWARD_OBTAINED),
    veldtCave: new NameBit("veldtCave", "Veldt Cave", event_bits.DEFEATED_SR_BEHEMOTH),
    whelk: new NameBit("whelk", "Whelk Gate", event_bits.DEFEATED_WHELK),
    zoneEater: new NameBit("zoneEater", "Zone Eater", event_bits.RECRUITED_GOGO_WOR),
    ramuh: new NameBit("ramuh", "Zozo Tower", event_bits.GOT_ZOZO_REWARD),
    // UNUSED
    // "": new NameBit("""", "Fanatic's Tower Leader", event_bits.DEFEATED_MAGIMASTER),
    // "": new NameBit("""", "Lone Wolf Moogle Room", event_bits.GOT_BOTH_REWARDS_LONE_WOLF),
    // "": new NameBit("""", "Narshe Weapon Shop Mines", event_bits.GOT_BOTH_REWARDS_WEAPON_SHOP),
} as Record<FF6Event, NameBit>;

export const dragon_bit: Record<FF6Dragon, NameBit> = {
    // by location
    ancientCastleDragon: new NameBit(
        "ancientCastle",
        "Ancient Castle Dragon",
        event_bits.DEFEATED_ANCIENT_CASTLE_DRAGON
    ),
    fanaticsTowerDragon: new NameBit(
        "fanaticsTower",
        "Fanatic's Tower Dragon",
        event_bits.DEFEATED_FANATICS_TOWER_DRAGON
    ),
    kefkaTowerMidDragon: new NameBit(
        "kefkaTowerMid",
        "Kefka's Tower Dragon G",
        event_bits.DEFEATED_KEFKA_TOWER_DRAGON_G
    ),
    kefkaTowerRightDragon: new NameBit(
        "kefkaTowerRight",
        "Kefka's Tower Dragon S",
        event_bits.DEFEATED_KEFKA_TOWER_DRAGON_S
    ),
    mtZozoDragon: new NameBit("mtZozo", "Mt. Zozo Dragon", event_bits.DEFEATED_MT_ZOZO_DRAGON),
    narsheDragon: new NameBit("narshe", "Narshe Dragon", event_bits.DEFEATED_NARSHE_DRAGON),
    operaHouseDragon: new NameBit("operaHouse", "Opera House Dragon", event_bits.DEFEATED_OPERA_HOUSE_DRAGON),
    phoenixCaveDragon: new NameBit("phoenixCave", "Phoenix Cave Dragon", event_bits.DEFEATED_PHOENIX_CAVE_DRAGON),
    // by monster
    iceDragon: new NameBit("iceDragon", "iceDragon", 143),
    stormDragon: new NameBit("stormDragon", "stormDragon", 144),
    dirtDragon: new NameBit("dirtDragon", "dirtDragon", 145),
    goldDragon: new NameBit("goldDragon", "goldDragon", 146),
    skullDragon: new NameBit("skullDragon", "skullDragon", 147),
    blueDragon: new NameBit("blueDragon", "blueDragon", 148),
    redDragon: new NameBit("redDragon", "redDragon", 149),
    whiteDragon: new NameBit("whiteDragon", "whiteDragon", 150),
} as Record<FF6Dragon, NameBit>;

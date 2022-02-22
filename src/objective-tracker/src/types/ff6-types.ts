export enum FF6Elements {
    Fire = 0x1,
    Ice = 0x2,
    Bolt = 0x4,
    Bio = 0x8,
    Wind = 0x10,
    Pearl = 0x20,
    Earth = 0x40,
    Water = 0x80,
}

export enum FF6StatusOne {
    Dark = 0x01,
    Zombie = 0x02,
    Poison = 0x04,
    EnableMagitek = 0x08,
    Vanish = 0x10,
    Imp = 0x20,
    Petrify = 0x40,
    Death = 0x80,
}

export enum FF6StatusTwo {
    Condemned = 0x01,
    Kneeling = 0x02,
    Blink = 0x04,
    Mute = 0x08,
    Berserk = 0x10,
    Muddle = 0x20,
    HPDrain = 0x40,
    Sleep = 0x80,
}

export enum FF6StatusThree {
    DanceButFloatForEquip = 0x01,
    Regen = 0x02,
    Slow = 0x04,
    Haste = 0x08,
    Stop = 0x10,
    Shell = 0x20,
    Safe = 0x40,
    Reflect = 0x80,
}

export enum FF6StatusFour {
    Rage = 0x01,
    Frozen = 0x02,
    ProtectionfromDeath = 0x04,
    MorphIntoEsper = 0x08,
    CastingSpell = 0x10,
    RemovedfromBattle = 0x20,
    RandomlyDefendedByInterceptor = 0x40,
    Float = 0x80,
}

/** Character flagged enum */
export const FF6CharacterEventIdChunkOne = {
    TERRA: 0x01,
    LOCKE: 0x02,
    CYAN: 0x04,
    SHADOW: 0x08,
    EDGAR: 0x10,
    SABIN: 0x20,
    CELES: 0x40,
    STRAGO: 0x80,
};

export const FF6CharacterEventIdChunkTwo = {
    RELM: 0x01,
    SETZER: 0x02,
    MOG: 0x04,
    GAU: 0x08,
    GOGO: 0x10,
    UMARO: 0x20,
};

export type FF6Events = {
    /** Global checks */
    doomGaze: boolean;
    tritoch: boolean;
    tzenThief: boolean;
    veldt: boolean;
    auctionHouse1: boolean;
    auctionHouse2: boolean;
    kefkaAtNarshe: boolean;

    /** Terra checks */
    whelk: boolean;
    leteRiver: boolean;
    sealedGate: boolean;
    mobliz: boolean;
    ramuh: boolean;

    /** Locke checks */
    narsheWeaponShop: boolean;
    phoenixCave: boolean;
    tunnelArmor: boolean;

    /** Setzer checks */
    kohligen: boolean;
    darill: boolean;

    /** Sabin checks */
    barenFalls: boolean;
    imperialCamp: boolean;
    mountKoltz: boolean;
    phantomTrain: boolean;
    collapsingHouse: boolean;

    /** Celes checks */
    operaHouse: boolean;
    magitek1: boolean;
    magitek2: boolean;
    magitek3: boolean;
    chainedCeles: boolean;

    /** Shadow checks */
    gauManor: boolean;
    veldtCave: boolean;
    floatingContinent1: boolean;
    floatingContinent2: boolean;
    floatingContinent3: boolean;

    /** Cyan checks */
    doma: boolean;
    mtZozo: boolean;
    nightmare1: boolean;
    nightmare2: boolean;
    nightmare3: boolean;

    /** Relm checks */
    esperMountain: boolean;
    owzersMansion: boolean;

    /** Strago checks */
    burningHouse: boolean;
    ebotsRock: boolean;
    fanaticsTower: boolean;

    /** Mog checks */
    loneWolf: boolean;

    /** Edgar checks */
    figaroThrone: boolean;
    figaroCastleEngineRoom: boolean;
    ancientCastle: boolean;

    /** Gogo checks */
    zoneEater: boolean;

    /** Umaro checks */
    umarosCave: boolean;

    /** Gau checks */
    serpentTrench: boolean;

    /** Kefka's Tower */
    atmaWeapon: boolean;
};

export type FF6Esper = {};

export enum FF6Character {
    TERRA = 0x00,
    LOCKE = 0x01,
    CYAN = 0x02,
    SHADOW = 0x03,
    EDGAR = 0x04,
    SABIN = 0x05,
    CELES = 0x06,
    STRAGO = 0x07,
    RELM = 0x08,
    SETZER = 0x09,
    MOG = 0x0a,
    GAU = 0x0b,
    GOGO = 0x0c,
    UMARO = 0x0d,
}

// export const checkToAsset: Record<keyof FF6Events, string> = {
//     atmaWeapon: "AtmaWpn",
//     auctionHouse1: "Auctioneer",
//     auctionHouse2: "Auctioneer",
//     // terra
//     leteRiver: "Ultros",
//     sealedGate: "Maduin",
//     mobliz: "Phunbaba",
//     //sabin
//     barenFalls: "Rizopas",
//     imperialCamp: "MilEnc",
//     mountKoltz: "Vargas",
//     phantomTrain: "GhostTrain",
//     collapsingHouse: "TzenHouse",
//     //celes
//     operaHouse: "Weight",
//     magitek1: "Crane",
//     magitek2: "Crane",
//     magitek3: "Crane",

//     nightmare1: "Wrexsoul",
//     nightmare2: "Wrexsoul",
//     nightmare3: "Wrexsoul",

//         /** Global checks */
//         doomGaze: boolean;
//         tritoch: boolean;
//         tzenThief: boolean;
//         veldt: boolean;
//         auctionHouse1: boolean;
//         auctionHouse2: boolean;
//         kefkaAtNarshe: boolean;

//         /** Terra checks */
//         whelk: boolean;
//         leteRiver: boolean;
//         sealedGate: boolean;
//         mobliz: boolean;
//         ramuh: boolean;

//         /** Locke checks */
//         narsheWeaponShop: boolean;
//         phoenixCave: boolean;
//         tunnelArmor: boolean;

//         /** Setzer checks */
//         kohligen: boolean;
//         darill: boolean;

//         /** Celes checks */
//         operaHouse: boolean;
//         magitek1: boolean;
//         magitek2: boolean;
//         magitek3: boolean;
//         chainedCeles: boolean;

//         /** Shadow checks */
//         gauManor: boolean;
//         veldtCave: boolean;
//         floatingContinent1: boolean;
//         floatingContinent2: boolean;
//         floatingContinent3: boolean;

//         /** Cyan checks */
//         doma: boolean;
//         mtZozo: boolean;
//         nightmare1: boolean;
//         nightmare2: boolean;
//         nightmare3: boolean;

//         /** Relm checks */
//         esperMountain: boolean;
//         owzersMansion: boolean;

//         /** Strago checks */
//         burningHouse: boolean;
//         ebotsRock: boolean;
//         fanaticsTower: boolean;

//         /** Mog checks */
//         loneWolf: boolean;

//         /** Edgar checks */
//         figaroThrone: boolean;
//         figaroCastleEngineRoom: boolean;
//         ancientCastle: boolean;

//         /** Gogo checks */
//         zoneEater: boolean;

//         /** Umaro checks */
//         umarosCave: boolean;

//         /** Gau checks */
//         serpentTrench: boolean;

//         /** Kefka's Tower */
//         atmaWeapon: boolean;
// }

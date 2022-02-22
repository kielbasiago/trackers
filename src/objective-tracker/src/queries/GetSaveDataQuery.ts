import { GetSaveDataResponse } from "../AnguirelTracker/types";
import { Query } from "../tracker/Query";
import { EnumType } from "../tracker/types";
import {
    FF6CharacterEventIdChunkOne,
    FF6CharacterEventIdChunkTwo,
    FF6Events,
} from "../types/ff6-types";

export class GetSaveDataQuery extends Query<GetSaveDataResponse> {
    private ESPER_ADDRESS: number;
    private EVENT_ADDRESS: number;
    private GAME_TIME_ADDRESS: number;
    private SPECIAL_ADDRESS: number;

    constructor() {
        super();
        this.ESPER_ADDRESS = this.IN_WRAM(0x1a69);
        this.EVENT_ADDRESS = this.IN_WRAM(0x1e80);
        this.SPECIAL_ADDRESS = this.IN_WRAM(0x1dd2);
        this.GAME_TIME_ADDRESS = this.IN_WRAM(0x1863);
    }

    public get queryAddress(): Array<number> {
        const addresses = [
            this.ESPER_ADDRESS,
            this.EVENT_ADDRESS,
            this.SPECIAL_ADDRESS,
            this.GAME_TIME_ADDRESS,
        ];
        return addresses;
    }

    public get queryLength(): Array<number> {
        return [0x4, 0xdf, 0x1, 0x3];
    }

    public async onResponse(
        responses: Array<Buffer>
    ): Promise<GetSaveDataResponse> {
        const [ESPER, EVENT, SPECIAL, GAME_TIME] = responses;
        // const getLogMessage = (header: string, message: string) => `\r\n---${header}: ${message}`;
        // this.log(`SaveDataQuery: Received ${responses.length} responses:
        // ${getLogMessage('ESPER', ESPER.length.toString())}
        // ${getLogMessage('EVENT', EVENT.length.toString())}
        // ${getLogMessage('SPECIAL', SPECIAL.length.toString())}
        // ${getLogMessage('GAME_TIME', GAME_TIME.length.toString())}`);

        const value = this.parseAllData(EVENT, ESPER, SPECIAL, GAME_TIME);

        return value;
    }

    private parseAllData(
        eventData: Buffer,
        esperData: Buffer,
        specialData: Buffer,
        gameTimeData: Buffer
    ): GetSaveDataResponse {
        const charByte1 = this.readEventAddress(
            eventData,
            this.IN_WRAM(0x1ede)
        );
        const charByte2 = this.readEventAddress(
            eventData,
            this.IN_WRAM(0x1edf)
        );
        const char1 = this.parseCharacterData(
            FF6CharacterEventIdChunkOne,
            charByte1
        );
        const char2 = this.parseCharacterData(
            FF6CharacterEventIdChunkTwo,
            charByte2
        );
        const characters = { ...char1, ...char2 };
        const characterCount = Object.values(characters).filter(
            (z) => z
        ).length;
        const espers = this.parseEsperData(esperData);
        const dragons = this.parseDragonData(eventData);
        const events = this.parseEventData(eventData, charByte1, charByte2);
        const special = this.parseSpecialData(specialData);
        const [hr, min, sec] = gameTimeData;

        const minutesPassed = hr * 60 + min;

        const value = {
            characters: {
                ...char1,
                ...char2,
            },
            characterCount,
            ...dragons,
            ...espers,

            events: {
                ...special?.events,
                ...events.events,
            },
            gameTime: minutesPassed,
        } as GetSaveDataResponse;
        return value;
    }

    private parseCharacterData(enumVals: EnumType, byte: number) {
        const val = Object.keys(enumVals).reduce((acc, key) => {
            const val = enumVals[key];
            acc[key] = !!(byte & val);
            return acc;
        }, {} as Record<string, boolean>);

        return val;
    }

    private parseDragonData(data: Buffer): Partial<GetSaveDataResponse> {
        const iceDragon = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1ea3)) & 0x04
        );
        const stormDragon = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1ea3)) & 0x08
        );
        const whiteDragon = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1ea4)) & 0x02
        );
        const blueDragon = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1ea3)) & 0x80
        );
        const goldDragon = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1ea3)) & 0x20
        );
        const skullDragon = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1ea3)) & 0x40
        );
        const dirtDragon = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1ea3)) & 0x10
        );

        // The red dragon can't be tracked until the lava room is flooded in Phoenix Cave.
        const redDragon = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1eda)) & 0x01 &&
                Boolean(
                    this.readEventAddress(data, this.IN_WRAM(0x1ea4)) & 0x01
                )
        );

        const dragonCount = [
            blueDragon,
            dirtDragon,
            goldDragon,
            iceDragon,
            skullDragon,
            stormDragon,
            whiteDragon,
            redDragon,
        ].filter((z) => z).length;

        const value = {
            dragons: {
                blueDragon,
                dirtDragon,
                goldDragon,
                iceDragon,
                skullDragon,
                stormDragon,
                whiteDragon,
                redDragon,
            },
            dragonCount,
        } as Partial<GetSaveDataResponse>;

        return value;
    }

    private parseEsperData(data: Buffer): Partial<GetSaveDataResponse> {
        let esperCount = 0;
        data[3] = data[3] & 0x07; // trim off unused bits
        for (let i = 0; i < 4; i++) {
            for (let bit = 0; bit < 8; bit++) {
                if ((data[i] & (1 << bit)) > 0) {
                    esperCount = esperCount + 1;
                }
            }
        }
        return {
            esperCount,
        };
    }

    private parseSpecialData(data: Buffer): Partial<GetSaveDataResponse> {
        const doomGaze = !!(data[0] & 0x01);
        const veldt = !!(data[0] & 0x02);

        return {
            events: {
                doomGaze,
                veldt,
            } as FF6Events,
        };
    }

    private parseEventData(
        data: Buffer,
        charByte1: number,
        charByte2: number
    ): Partial<GetSaveDataResponse> {
        // Some checks (particularly NPC bit checks) turn off, rather than on
        // to signify completion.  For these, check if the user is in game
        // before turning the icon on/off.
        // This is done by checking if any of the character bits are set.
        // If they user has no charactrs, assume they are not in game.
        const inGame = charByte1 !== 0 && charByte2 !== 0;
        const hasTerra = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1ede)) & 0x01
        );
        const hasCeles = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1ede)) & 0x40
        );

        const tritoch = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1ed3)) & 0x40
        );
        const tzenThief = !!(
            this.readEventAddress(data, this.IN_WRAM(0x1ecf)) & 0x10
        );
        const auctionHouse1 = !!(
            this.readEventAddress(data, this.IN_WRAM(0x1ead)) & 0x10
        );
        const auctionHouse2 = !!(
            this.readEventAddress(data, this.IN_WRAM(0x1ead)) & 0x20
        );
        const narsheBattleStarted =
            (this.readEventAddress(data, this.IN_WRAM(0x1f45)) & 0x10) === 0;
        const kefkaAtNarshe = Boolean(
            inGame &&
                narsheBattleStarted &&
                !Boolean(
                    this.readEventAddress(data, this.IN_WRAM(0x1f45)) & 0x01
                )
        );
        const whelk = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1ea6)) & 0x20
        );
        const leteRiver = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1eca)) & 0x80
        );
        const sealedGate = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1f0e)) & 0x02
        );
        const mobliz = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e97)) & 0x80
        );
        /*
         * The Ramuh check has 2 different flags depending on whether the
         * reward is a character or an esper.
         *    this.IN_WRAM(0x1EE3) 0x40
         *    this.IN_WRAM(0x1EE3) 0x80
         *
         * NOTE:
         * The bit is set high when Terra is recruited (or in open world)
         * and set low when Ramuh has been completed.  Because there is no
         * other flag to determine if this check is done, we have to rely on
         * the game mode and characters collected in order to know if it
         * should be checked.
         */
        const ramuh =
            inGame &&
            hasTerra &&
            !Boolean(this.readEventAddress(data, this.IN_WRAM(0x1ee3)) & 0xc0);

        // Locke Checks
        const narsheWeaponShop = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e96)) & 0x40
        );
        const phoenixCave = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e9a)) & 0x80
        );
        const tunnelArmor = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e96)) & 0x02
        );

        // Setzer Checks
        const kohligen = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1eb1)) & 0x40
        );
        const darill = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1ed6)) & 0x04
        );

        // Sabin Checks
        const barenFalls = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e87)) & 0x80
        );
        const imperialCamp = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e86)) & 0x80
        );
        const mountKoltz = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e82)) & 0x01
        );
        const phantomTrain = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e87)) & 0x08
        );
        const collapsingHouse = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1ed1)) & 0x04
        );

        // Celes Checks
        const operaHouse = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e8b)) & 0x08
        );
        // ifrit and shiva fight
        const magitek1 = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e8c)) & 0x01
        );
        // Number 042 fight
        const magitek2 = !Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1f49)) & 0x02
        );
        // Reward before airship boss fight
        const magitek3 = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e8d)) & 0x08
        );
        const chainedCeles =
            hasCeles &&
            inGame &&
            !Boolean(this.readEventAddress(data, this.IN_WRAM(0x1ee2)) & 0x80);

        // shadow
        const gauManor = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1eac)) & 0x04
        );
        const veldtCave = !Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1f2a)) & 0x20
        );

        const floatingContinent1 = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e85)) & 0x04
        );
        const floatingContinent2 = !Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1eeb)) & 0x80
        );
        const floatingContinent3 = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1eef)) & 0x20
        );

        const doma = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e88)) & 0x01
        );
        const mtZozo = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e9a)) & 0x04
        );
        const nightmare1 = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1eaf)) & 0x02
        );
        const nightmare2 = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e9b)) & 0x04
        );
        const nightmare3 = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1f29)) & 0x02
        );

        const esperMountain = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e92)) & 0x20
        );
        const owzersMansion = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1ec8)) & 0x01
        );

        const burningHouse = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e92)) & 0x01
        );
        const ebotsRock = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1eb3)) & 0x10
        );
        const fanaticsTower = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e97)) & 0x04
        );

        const loneWolf = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1ed3)) & 0x80
        );

        const figaroThrone = !Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1ee1)) & 0x01
        );
        const figaroCastleEngineRoom = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e98)) & 0x40
        );
        const ancientCastle = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1edb)) & 0x20
        );

        const zoneEater = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e9a)) & 0x10
        );

        const umarosCave = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e8f)) & 0x40
        );

        const serpentTrench = Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1e8a)) & 0x01
        );

        const atmaWeapon = !Boolean(
            this.readEventAddress(data, this.IN_WRAM(0x1f57)) & 0x20
        );

        return {
            events: {
                // global
                tritoch,
                tzenThief,
                auctionHouse1,
                auctionHouse2,
                kefkaAtNarshe,
                // terra
                whelk,
                leteRiver,
                sealedGate,
                mobliz,
                ramuh,
                narsheWeaponShop,
                phoenixCave,
                tunnelArmor,
                kohligen,
                darill,
                barenFalls,
                imperialCamp,
                mountKoltz,
                phantomTrain,
                collapsingHouse,
                operaHouse,
                magitek1,
                magitek2,
                magitek3,
                chainedCeles,
                gauManor,
                veldtCave,
                floatingContinent1,
                floatingContinent2,
                floatingContinent3,
                doma,
                mtZozo,
                nightmare1,
                nightmare2,
                nightmare3,
                esperMountain,
                owzersMansion,
                burningHouse,
                ebotsRock,
                fanaticsTower,
                loneWolf,
                figaroThrone,
                figaroCastleEngineRoom,
                ancientCastle,
                zoneEater,
                umarosCave,
                serpentTrench,
                atmaWeapon,
            } as FF6Events,
        };
    }

    private readEventAddress(data: Buffer, address: number) {
        return data[address - this.EVENT_ADDRESS];
    }
}

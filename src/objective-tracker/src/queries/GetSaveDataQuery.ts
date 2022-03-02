import { GetSaveDataResponse } from "../AnguirelTracker/types";
import { Query } from "../tracker/Query";
import { EnumType } from "../tracker/types";
import { esperIds, FF6Character, FF6Dragon, FF6Event, FF6EventFlags } from "../types/ff6-types";
import { character_bit, dragon_bit, event_bit } from "./_checkBits";

/* base + event_word * 2 */
const CHARACTERS_AVAILABLE = 2; // custom
const ESPERS_FOUND = 3; // custom
const CHECKS_COMPLETE = 4; // custom
const DRAGONS_DEFEATED = 6; // track defeated instead of remaining

const BOSSES_DEFEATED = 27; // custom
export class GetSaveDataQuery extends Query<GetSaveDataResponse> {
    private EVENT_WORD_ADDRESS: number;
    private EVENT_ADDRESS: number;
    private DRAGON_ADDRESS: number;
    private GAME_TIME_ADDRESS: number;

    constructor() {
        super();
        this.EVENT_WORD_ADDRESS = this.IN_WRAM(0x1fc2);
        this.EVENT_ADDRESS = this.IN_WRAM(0x1e80);
        this.DRAGON_ADDRESS = this.IN_WRAM(0x1dc9);
        this.GAME_TIME_ADDRESS = this.IN_WRAM(0x1863);
    }

    public get queryAddress(): Array<number> {
        const addresses = [this.EVENT_WORD_ADDRESS, this.EVENT_ADDRESS, this.DRAGON_ADDRESS, this.GAME_TIME_ADDRESS];
        return addresses;
    }

    public get queryLength(): Array<number> {
        return [64, 150, 24, 3];
    }

    public async onResponse(responses: Array<Buffer>): Promise<GetSaveDataResponse> {
        const [EVENT_WORDS, EVENTS, DRAGONS, GAME_TIME] = responses;

        const value = this.parseAllData(EVENT_WORDS, EVENTS, DRAGONS, GAME_TIME);

        return value;
    }

    private parseAllData(
        eventWordsData: Buffer,
        eventsData: Buffer,
        dragonData: Buffer,
        gameTimeData: Buffer
    ): GetSaveDataResponse {
        // PARSE EVENT WORD DATA
        const characterCount = eventWordsData[CHARACTERS_AVAILABLE * 2];
        const esperCount = eventWordsData[ESPERS_FOUND * 2];
        const checkCount = eventWordsData[CHECKS_COMPLETE * 2];
        const dragonCount = eventWordsData[DRAGONS_DEFEATED * 2];
        const bossCount = eventWordsData[BOSSES_DEFEATED * 2];

        // PARSE CHARACTERS FOUND
        const characterIds = Object.keys(character_bit);
        const characterBits = characterIds.map((char) => character_bit[char as FF6Character]);
        const characters = characterIds.reduce((acc, charName, idx) => {
            const value = characterBits[idx];
            acc[charName as FF6Character] = !!(eventsData[value.byte] & Math.pow(2, value.bit));
            return acc;
        }, {} as Record<FF6Character, boolean>);

        // PARSE EVENTS COMPLETE
        const eventIds = Object.keys(event_bit);
        const eventBits = eventIds.map((event) => event_bit[event as FF6Event]);
        const events = eventIds.reduce((acc, charName, idx) => {
            const value = eventBits[idx];
            acc[charName as FF6Event] = !!(eventsData[value.byte] & Math.pow(2, value.bit));
            return acc;
        }, {} as Record<FF6Event, boolean>);

        // PARSE DRAGON
        const dragonIds = Object.keys(dragon_bit);
        const dragonBits = dragonIds.map((dragon) => dragon_bit[dragon as FF6Dragon]);
        const dragons = dragonIds.reduce((acc, charName, idx) => {
            const value = dragonBits[idx];
            acc[charName as FF6Dragon] = !!(dragonData[value.byte] & Math.pow(2, value.bit));
            return acc;
        }, {} as Record<FF6Dragon, boolean>);

        const [hr, min, sec] = gameTimeData;

        const secondsPassed = hr * 3600 + min * 60 + sec;

        const value = {
            characters,
            events,
            dragons,
            allFlags: {
                ...characters,
                ...events,
                ...dragons,
            },

            characterCount,
            esperCount,
            checkCount,
            dragonCount,
            bossCount,
            // ...dragons,
            // ...espers,
            // events: {
            //     ...special?.events,
            //     ...events.events,
            // },
            gameTime: secondsPassed,
        } as GetSaveDataResponse;
        return value;
    }
}

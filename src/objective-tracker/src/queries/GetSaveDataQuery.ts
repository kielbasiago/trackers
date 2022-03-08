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
    private CHEST_BITS: number;

    constructor() {
        super();
        this.EVENT_WORD_ADDRESS = this.IN_WRAM(0x1fc2);
        this.EVENT_ADDRESS = this.IN_WRAM(0x1e80);
        this.DRAGON_ADDRESS = this.IN_WRAM(0x1dc9);
        this.CHEST_BITS = this.IN_WRAM(0x1e40); // 0x1e40 - 0x1e7f
    }

    public get queryAddress(): Array<number> {
        const addresses = [this.EVENT_WORD_ADDRESS, this.EVENT_ADDRESS, this.DRAGON_ADDRESS, this.CHEST_BITS];
        return addresses;
    }

    public get queryLength(): Array<number> {
        return [64, 150, 24, 63];
    }

    public async onResponse(responses: Array<Buffer>): Promise<GetSaveDataResponse> {
        const [EVENT_WORDS, EVENTS, DRAGONS, CHESTS] = responses;

        const value = this.parseAllData(EVENT_WORDS, EVENTS, DRAGONS, CHESTS);

        return value;
    }

    private parseAllData(
        eventWordsData: Buffer,
        eventsData: Buffer,
        dragonData: Buffer,
        chestData: Buffer
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

        const chestCount = [...chestData].reduce((acc, chestByte) => {
            const bitcount = (byte: number) => {
                let bits = 0;

                while (byte) {
                    bits += byte % 2;
                    byte = byte >>> 1;
                }

                return bits;
            };

            acc += bitcount(chestByte);

            return acc;
        }, 0);

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
            gameTime: 0,
            chestCount,
        } as GetSaveDataResponse;
        return value;
    }
}

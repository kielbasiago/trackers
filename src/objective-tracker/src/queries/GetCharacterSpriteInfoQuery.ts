import { Query } from "../tracker/Query";
import times from "lodash/times";
import flatten from "lodash/flatten";
import { Tile } from "./data/Tile";
import { Palette } from "./data/Palette";
import { characterChecks } from "../AnguirelTracker/types";
import { FF6Character } from "../types/ff6-types";
import { Character } from "./data/Character";

export type CharacterSpriteInfoResponse = {
    portraits: Record<FF6Character, Character>;
};
export class GetCharacterSpriteInfoQuery extends Query<CharacterSpriteInfoResponse> {
    private CHARACTER_PORTRAIT_GRAPHICS_ADDRESS = 0x11d00;
    private CHARACTER_PORTRAIT_GRAPHICS_ADDRESSES: Array<number> = [];
    private CHARACTER_PORTRAIT_GRAPHICS_ADDRESS_LENGTHS: Array<number> = [];
    private CHARATER_PORTRAIT_PALETTES_ADDRESS = 0x15860;
    // private CHARACTER_PALETTE_ADDRESS: number = 0x68000;
    // private PORTRAIT_ADDRESS: number = 0x150000;

    constructor() {
        super();
        const CHAR_COUNT = 14; // char count

        const PAGE_SIZE = 25 * 32;

        this.CHARACTER_PORTRAIT_GRAPHICS_ADDRESSES = times(
            CHAR_COUNT,
            (index) => PAGE_SIZE * index + this.CHARACTER_PORTRAIT_GRAPHICS_ADDRESS
        );

        this.CHARACTER_PORTRAIT_GRAPHICS_ADDRESS_LENGTHS = times(CHAR_COUNT, () => PAGE_SIZE);

        this.CHARATER_PORTRAIT_PALETTES_ADDRESS = this.IN_ROM(this.CHARATER_PORTRAIT_PALETTES_ADDRESS);
    }

    public get queryAddress(): Array<number> {
        // palette information

        const addresses = [this.CHARATER_PORTRAIT_PALETTES_ADDRESS, ...this.CHARACTER_PORTRAIT_GRAPHICS_ADDRESSES];
        return addresses;
    }

    public get queryLength(): Array<number> {
        return [576, ...this.CHARACTER_PORTRAIT_GRAPHICS_ADDRESS_LENGTHS]; // 655
    }

    public async onResponse(responses: Array<Buffer>): Promise<CharacterSpriteInfoResponse> {
        const [PALETTE, ...GRAPHICS] = responses;
        const PALETTE_BLOCK_SIZE = 32;

        const graphicBlocks = GRAPHICS.map((g) =>
            g
                .toString()
                .split(",")
                .map((z) => Number.parseInt(z))
        );

        const paletteBlocks = [...PALETTE].map((p) => p);

        const tiles = graphicBlocks.map((z, idx) => {
            const blockCount = 25;
            const blockSize = 32;
            const paletteOffset = idx * PALETTE_BLOCK_SIZE;
            const paletteBytes = paletteBlocks.slice(paletteOffset, paletteOffset + PALETTE_BLOCK_SIZE);
            const palette = new Palette(paletteBytes);
            return times(blockCount, (idx) => {
                const tile = new Tile(z.slice(idx * blockSize, idx * blockSize + blockSize), palette);
                return tile;
            });
        });

        const val = Object.keys(characterChecks).reduce((acc, val, idx) => {
            const tile = tiles[idx];
            const char = new Character(idx, val).setPortrait(tile);
            acc[val] = char;
            return acc;
        }, {} as Record<string, Character>);

        return {
            portraits: val,
        };
    }

    private parsePalette(data: Buffer) {
        const palette = [...data].map((p) => p);
    }
}

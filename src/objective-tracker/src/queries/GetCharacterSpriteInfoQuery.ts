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
    palettes: Array<Palette>;
};

const TILE_SIZE = 32;
const TILES_PER_CHAR = 197 * TILE_SIZE;
const PAGE_SIZE = 0x16a0;
const CHAR_COUNT = 14; // char count
const PAGES = Math.ceil((CHAR_COUNT * PAGE_SIZE) / 1024); // 1024 is the max length

export class GetCharacterSpriteInfoQuery extends Query<CharacterSpriteInfoResponse> {
    private CHARACTER_SPRITE_GRAPHICS_ADDRESS = 0x150000;
    private CHARACTER_SPRITE_GRAPHICS_ADDRESSES: Array<number> = [];
    private CHARACTER_SPRITE_GRAPHICS_ADDRESS_LENGTHS: Array<number> = [];
    private CHARATER_SPRITE_PALETTES_ADDRESS = 0x268000;

    constructor() {
        super();
        const TILE_COUNT = 197; // tiles per sprite

        this.CHARACTER_SPRITE_GRAPHICS_ADDRESSES = times(
            PAGES,
            (index) => index * PAGE_SIZE + this.CHARACTER_SPRITE_GRAPHICS_ADDRESS
        );

        this.CHARACTER_SPRITE_GRAPHICS_ADDRESS_LENGTHS = times(PAGES, () => PAGE_SIZE);

        this.CHARATER_SPRITE_PALETTES_ADDRESS = this.IN_ROM(this.CHARATER_SPRITE_PALETTES_ADDRESS);
    }

    public get queryAddress(): Array<number> {
        return [
            this.IN_ROM(0xd0f1), // character sprite tile formation 0xC0D0F1 - 0xC0CE3A = 0x2B7;
            this.CHARATER_SPRITE_PALETTES_ADDRESS,
            ...this.CHARACTER_SPRITE_GRAPHICS_ADDRESSES,
        ];
    }

    public get queryLength(): Array<number> {
        return [
            695, //0xC0D0F1 - 0xC0CE3A = 0x2B7 = 695
            0x3ff,
            ...this.CHARACTER_SPRITE_GRAPHICS_ADDRESS_LENGTHS,
        ];
    }

    public async onResponse(responses: Array<Buffer>): Promise<CharacterSpriteInfoResponse> {
        const [TILE_INFO, PALETTE, ...GRAPHICS] = responses;
        const PALETTE_BLOCK_SIZE = 32;

        const rawGraphicBlocks = GRAPHICS.map((g) =>
            g
                .toString()
                .split(",")
                .map((z) => Number.parseInt(z))
        );

        const allGraphics = rawGraphicBlocks.reduce((acc, val) => {
            return acc.concat(val);
        }, []);

        const graphicBlocks = times(CHAR_COUNT, (idx) => {
            const val = allGraphics.slice(idx * PAGE_SIZE, idx * PAGE_SIZE + PAGE_SIZE);

            return val;
        });

        const paletteBlocks = [...PALETTE].map((p) => p);

        const palettes = times(paletteBlocks.length / 32, (idx) => {
            return new Palette(paletteBlocks.slice(idx * 32, idx * 32 + 32));
        });

        const tiles = graphicBlocks.map((z, idx) => {
            const palette = palettes[0];
            const tileCount = PAGE_SIZE / TILE_SIZE;
            const tileSize = 32;
            // const paletteOffset = idx * PALETTE_BLOCK_SIZE;
            // const paletteBytes = paletteBlocks.slice(paletteOffset, paletteOffset + PALETTE_BLOCK_SIZE);
            return times(tileCount, (idx) => {
                const tile = new Tile(z.slice(idx * tileSize, idx * tileSize + tileSize), palette);
                return tile;
            });
        });

        const val = Object.keys(characterChecks).reduce((acc, val, idx) => {
            const tile = tiles[idx];
            const char = new Character(idx, val).setSprite(tile);
            acc[val] = char;
            return acc;
        }, {} as Record<string, Character>);

        return {
            portraits: val,
            palettes: palettes,
        };
    }
}

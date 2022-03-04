import { Tile } from "./Tile";

export class Character {
    public readonly id: number;
    public readonly name: string;
    public portrait!: Array<Tile>;
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public setPortrait(tile: Array<Tile>) {
        this.portrait = tile;
        return this;
    }
}

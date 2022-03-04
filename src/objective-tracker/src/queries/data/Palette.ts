import { PaletteColor } from "./PaletteColor";
import padStart from "lodash/padStart";

export class Palette {
    protected bytes: number[];
    public colors: Array<PaletteColor>;

    constructor(bytes: Array<number>) {
        this.bytes = bytes;
        this.colors = [];
        this.decode(bytes);
    }

    protected decode(data: Array<number>) {
        for (let i = 0; i < 16; i++) {
            const idx = i * 2;
            const byteString = padStart(data[idx].toString(2).concat(data[i].toString(2)), 16, "0"); // get 16 bit byte string
            const rawr = byteString.slice(11, 16);
            const rawg = byteString.slice(6, 11);
            const rawb = byteString.slice(1, 6);
            const r = Number.parseInt(rawr);
            const g = Number.parseInt(rawg);
            const b = Number.parseInt(rawb);

            this.colors[i] = new PaletteColor(r, g, b);
        }

        return this;
    }
}

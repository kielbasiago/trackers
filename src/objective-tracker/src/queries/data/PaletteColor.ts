import padStart from "lodash/padStart";
export class PaletteColor {
    public readonly r: number;
    public readonly g: number;
    public readonly b: number;

    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    public toCss() {
        const r = padStart(this.r.toString(16).toUpperCase(), 2, "0");
        const g = padStart(this.g.toString(16).toUpperCase(), 2, "0");
        const b = padStart(this.b.toString(16).toUpperCase(), 2, "0");
        return `#${r}${g}${b}`;
    }
}

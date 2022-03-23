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
        // const r = padStart((this.r * 8).toString(16).toUpperCase(), 2, "0");
        // const g = padStart((this.g * 8).toString(16).toUpperCase(), 2, "0");
        // const b = padStart((this.b * 8).toString(16).toUpperCase(), 2, "0");
        const r = this.r * 8;
        const g = this.g * 8;
        const b = this.b * 8;
        const transparent = [r, g, b].every((z) => z === 16 || z === 24);
        if (transparent) {
            debugger;
        }
        const o = transparent ? 0 : 1;
        // return `#${r}${g}${b}`;
        const val = `rgba(${r},${g},${b},${o})`;
        return val;
    }
}

export class Tuple<T extends Array<any>> {
    public readonly args: T;
    constructor(...args: T) {
        this.args = args;

        this.init();
    }

    public value(): T {
        return this.args;
    }

    protected init(): void {}
}

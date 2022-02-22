import { Query } from '../tracker/Query';

export class GenericQuery extends Query<unknown> {
    private addr: number;
    private bytes: number;
    constructor(addr: number, bytes: number) {
        super();
        this.addr = addr;
        this.bytes = bytes;
    }

    public get queryAddress(): Array<number> {
        return [this.addr];
    }

    public get queryLength(): Array<number> {
        return [this.bytes];
    }

    public async onResponse(response: Array<Buffer>): Promise<Array<string>> {
        return this.bytesToArray(response[0]);
    }
}

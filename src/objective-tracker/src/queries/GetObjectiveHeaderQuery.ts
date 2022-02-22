import { Query } from "../tracker/Query";
import { HeaderResponseData } from "../types";

export class GetObjectiveHeaderQuery extends Query<HeaderResponseData> {
    private HEADER_ADDRESS: number = 0xff0000 - 0xc00000;

    constructor() {
        super();
        this.HEADER_ADDRESS = this.IN_ROM(this.HEADER_ADDRESS);
    }

    public get queryAddress(): Array<number> {
        const addresses = [this.HEADER_ADDRESS];
        return addresses;
    }

    public get queryLength(): Array<number> {
        return [0x10];
    }

    public async onResponse(
        responses: Array<Buffer>
    ): Promise<HeaderResponseData> {
        const [HEADER] = responses;
        // const getLogMessage = (header: string, message: string) => `\r\n---${header}: ${message}`;
        // this.log(`SaveDataQuery: Received ${responses.length} responses:
        // ${getLogMessage('ESPER', ESPER.length.toString())}
        // ${getLogMessage('EVENT', EVENT.length.toString())}
        // ${getLogMessage('SPECIAL', SPECIAL.length.toString())}
        // ${getLogMessage('GAME_TIME', GAME_TIME.length.toString())}`);

        const value = this.parseAllData(HEADER);

        return value;
    }

    private parseAllData(headerBuffer: Buffer): HeaderResponseData {
        return this.parseHeaderData(headerBuffer);
    }

    private parseHeaderData(data: Buffer): HeaderResponseData {
        const [
            id,
            dataBank,
            dataOffsetHigh,
            dataOffsetLow,
            sizeOfDataHigh,
            sizeOfDataLow,
            objectiveCount,
        ] = data;

        const dataOffset = (dataOffsetHigh << 8) + dataOffsetLow;
        const sizeOfData = (sizeOfDataHigh << 8) + sizeOfDataLow;

        return {
            bank: dataBank.toString(16),
            dataOffset,
            sizeOfData,
            objectiveCount,
        };
    }
}

import groupBy from "lodash/groupBy";
import maxBy from "lodash/maxBy";
import uniq from "lodash/uniq";
import { Query } from "../tracker/Query";
import {
    ConditionAddressInfo,
    ConditionBitResult,
    CONDITION_BIT_TYPES,
} from "../types";

type ResponseData = Record<string, ConditionBitResult>;

export class GetObjectiveConditionBitsQuery extends Query<ResponseData> {
    private data: Array<ConditionAddressInfo>;
    private addresses: Array<number> = [];
    private lengths: Array<number> = [];
    private groupedData: Record<string, Array<ConditionAddressInfo>> = {};

    constructor(data: Array<ConditionAddressInfo>) {
        super();
        this.data = data;

        this.groupedData = groupBy(this.data, (d) =>
            d.address.toString(16)
        ) as any as Record<string, Array<ConditionAddressInfo>>;

        this.addresses = uniq(
            Object.keys(this.groupedData).map((z) => Number.parseInt(z, 16))
        );

        this.lengths = Object.keys(this.groupedData).map((addr) => {
            const max = maxBy(this.groupedData[addr], (z) => z.bit)?.bit || 0;
            return this.groupedData[addr][0].type === "EventWord"
                ? max * 2 + 1
                : Math.ceil(max / 8) + 1;
        });
    }

    public get queryAddress(): Array<number> {
        return this.addresses.map((addr) => this.IN_WRAM(addr));
    }

    public get queryLength(): Array<number> {
        return this.lengths;
    }

    public async onResponse(responses: Array<Buffer>): Promise<ResponseData> {
        return this.addresses.reduce((acc, val, idx) => {
            const buffer = responses[idx];
            const groupedIndex = val.toString(16);
            const groupedData = this.groupedData[groupedIndex];
            groupedData.forEach((z) => {
                const eventword = z.type === "EventWord";
                console.log(z.type);
                const offset = eventword ? z.bit * 2 : Math.floor(z.bit / 8);

                const byte = buffer[offset];
                const value = eventword
                    ? byte
                    : // : CONDITION_BIT_TYPES.includes(z.type)
                    // ? !!(byte & z.bit)
                    // if event bit, give boolean interpretation
                    CONDITION_BIT_TYPES.includes(z.type)
                    ? Boolean(byte & Math.pow(2, z.bit % 8))
                    : // just trust me, lol
                      byte & Math.pow(2, z.bit % 8);

                const isComplete =
                    typeof value === "boolean"
                        ? value
                        : value / (z.contextValue ?? 1) >= 1;

                acc[z.key] = {
                    key: z.key,
                    value: value,
                    isComplete,
                };
            });
            return acc;
        }, {} as ResponseData);
    }

    private parseAllData(
        headerBuffer: Buffer,
        namesBuffer: Array<number>
    ): ResponseData {
        return {};
    }

    protected transformHighLowByte(highByte: number, lowByte: number) {
        return (highByte << 8) + lowByte;
    }
}

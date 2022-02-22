import { Query } from "../tracker/Query";
import {
    ResponseData,
    ObjectiveResponseData,
    HeaderResponseData,
    ConditionType,
    ConditionResponseData,
    ConditionTypeFormat,
} from "../types";
import times from "lodash/times";
import orderBy from "lodash/orderBy";
import uniq from "lodash/uniq";
import flatten from "lodash/flatten";

export class GetObjectiveDataQuery extends Query<ResponseData> {
    public NAME_ADDRESS: number;
    public DATA_ADDRESS: number;
    public DATA_SIZE: number;

    protected objectiveCount: number;

    constructor(header: HeaderResponseData) {
        super();
        const { bank, dataOffset, sizeOfData, objectiveCount } = header;
        this.DATA_SIZE = sizeOfData;
        const startNameAddress = (Number.parseInt("FE", 16) << 16) - 0xc00000;
        const leadByte = (Number.parseInt(bank, 16) << 16) - 0xc00000;
        const dataAddress = leadByte + dataOffset;
        this.objectiveCount = objectiveCount;
        this.NAME_ADDRESS = this.IN_ROM(startNameAddress);
        this.DATA_ADDRESS = this.IN_ROM(dataAddress);
    }

    public get queryAddress(): Array<number> {
        return [this.DATA_ADDRESS, this.NAME_ADDRESS, this.NAME_ADDRESS + 1024];
    }

    public get queryLength(): Array<number> {
        return [this.DATA_SIZE, 1024, 1024];
    }

    public async onResponse(responses: Array<Buffer>): Promise<ResponseData> {
        const [HEADER, NAMES, MORE_NAMES] = responses;

        const value = this.parseAllData(HEADER, [
            ...(NAMES as any),
            ...(MORE_NAMES as any),
        ]);

        return value;
    }

    private parseAllData(
        headerBuffer: Buffer,
        namesBuffer: Array<number>
    ): ResponseData {
        return this.parseHeaderData(headerBuffer, namesBuffer);
    }

    private parseHeaderData(
        data: Buffer,
        nameData: Array<number>
    ): ResponseData {
        let ongoingIdx = 0;
        const OBJECTIVE_BLOCK_SIZE = 0x20;
        const CONDITION_BLOCK_SIZE = 0x10;
        const objectiveData = times(this.objectiveCount, () => {
            const objectiveIndexStart = ongoingIdx;
            const objectiveIndexEnd = ongoingIdx + OBJECTIVE_BLOCK_SIZE;
            const objectiveSlice = data.slice(
                objectiveIndexStart,
                objectiveIndexEnd
            );
            const [
                id,
                namePointerHigh,
                namePointerLow,
                totalConditions,
                requiredConditions,
                _contextValueHigh,
                _contextValueLow,
                typeNamePointerHigh,
                typeNamePointerLow,
            ] = objectiveSlice;

            const namePointer = this.transformHighLowByte(
                namePointerHigh,
                namePointerLow
            );

            const typeNamePointer = this.transformHighLowByte(
                typeNamePointerHigh,
                typeNamePointerLow
            );

            const oNameLength = nameData[namePointer];
            const tNameLength = nameData[typeNamePointer];

            const objectiveName = [
                ...nameData.slice(
                    namePointer + 1,
                    namePointer + 1 + oNameLength
                ),
            ]
                .map((z) => String.fromCharCode(z))
                .join("");

            const resultTypeName = [
                ...nameData.slice(
                    typeNamePointer + 1,
                    typeNamePointer + 1 + tNameLength
                ),
            ]
                .map((z) => String.fromCharCode(z))
                .join("");

            const conditionData = times(totalConditions, (conditionIdx) => {
                const conditionStart =
                    objectiveIndexEnd + conditionIdx * CONDITION_BLOCK_SIZE;
                const conditionResult = data.slice(
                    conditionStart,
                    conditionStart + CONDITION_BLOCK_SIZE
                );

                const [
                    cId,
                    cNamePointerHigh,
                    cNamePointerLow,
                    cConditionType,
                    cMemoryHigh,
                    cMemoryLow,
                    bitValueHigh,
                    bitValueLow,
                    contextValueHigh, // no longer used
                    contextValueLow, // no longer used
                    contextNameHigh,
                    contextNameLow,
                ] = conditionResult;

                const conditionType = ConditionType[cConditionType];

                const contextValue = this.transformHighLowByte(
                    contextValueHigh,
                    contextValueLow
                );

                const nameAddr = this.transformHighLowByte(
                    cNamePointerHigh,
                    cNamePointerLow
                );

                const memoryAddr = this.transformHighLowByte(
                    cMemoryHigh,
                    cMemoryLow
                );

                const bitValue = this.transformHighLowByte(
                    bitValueHigh,
                    bitValueLow
                );

                const contextNameByte = this.transformHighLowByte(
                    contextNameHigh,
                    contextNameLow
                );

                const nameLength = nameData[nameAddr];

                const conditionName = [
                    ...nameData.slice(nameAddr + 1, nameAddr + 1 + nameLength),
                ]
                    .map((z) => String.fromCharCode(z))
                    .join("");

                const contextNameLength = nameData[contextNameByte];

                const conditionDescription =
                    contextNameByte === 0xffff
                        ? ""
                        : [
                              ...nameData.slice(
                                  contextNameByte + 1,
                                  contextNameByte + 1 + contextNameLength
                              ),
                          ]
                              .map((z) => String.fromCharCode(z))
                              .join("");

                return {
                    conditionType,
                    name: conditionName,
                    memoryAddr,
                    bitValue,
                    conditionDescription,
                    contextValue,
                } as ConditionResponseData;
            });

            ongoingIdx +=
                OBJECTIVE_BLOCK_SIZE + totalConditions * CONDITION_BLOCK_SIZE;

            return {
                id,
                key: objectiveName,
                requiredConditions,
                totalConditions,
                conditions: conditionData, //orderBy(conditionData, (z) => z.name.toLowerCase()),
                displayName: resultTypeName,
            } as ObjectiveResponseData;
        });
        const cs = uniq(
            flatten(objectiveData.map((z) => z.conditions)).map(
                (z) => z.memoryAddr
            )
        );

        return {
            objectiveData,
        } as ResponseData;
    }

    protected async lookupRams() {}
    protected transformHighLowByte(highByte: number, lowByte: number) {
        return (highByte << 8) + lowByte;
    }
}

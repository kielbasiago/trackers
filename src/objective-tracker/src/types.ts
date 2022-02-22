export type HeaderResponseData = {
    bank: string;
    dataOffset: number;
    sizeOfData: number;
    objectiveCount: number;
};

export type ResponseData = {
    objectiveData: Array<ObjectiveResponseData>;
};

export type ObjectiveResponseData = {
    id: number;
    key: string;
    totalConditions: number;
    requiredConditions: number;
    conditions: Array<ConditionResponseData>;
};

export type ConditionResponseData = {
    conditionType: keyof typeof ConditionType;
    name: string;
    memoryAddr: number;
    bitValue: number;
    conditionDescription: string | null;
    contextValue: number | null;
};

export enum ConditionType {
    EventWord = 1,
    EventBit = 2,
    BattleBit = 3,
    Character = 4,
    Esper = 5,
}

export const CONDITION_BIT_TYPES = [
    ConditionType[ConditionType.Esper],
    ConditionType[ConditionType.Character],
    ConditionType[ConditionType.EventBit],
    ConditionType[ConditionType.BattleBit],
];

export type ConditionAddressInfo = {
    /** RAM address */
    address: number;
    /** bit offset */
    bit: number;
    key: string;
    type: keyof typeof ConditionType;
    contextValue: number | null;
};

export enum Check {
    FanaticsTower = 13,
}

export const ConditionTypeFormat: Record<
    string,
    (val: any, val2: any) => string
> = {
    EventWord: (name, val) => `${name} ${val}`,
    EventBit: (name, value) => `${name} - ${value}`,
    BattleBit: (name, val) => `${name} ${val}`,
    Character: (name, val) => `${name} ${val}`,
    Esper: (name, val) => `${name} ${val}`,
};

export type ConditionBitResult = {
    key: string;
    value: any;
    isComplete: boolean;
};

/** Written to a json file sibling to the output rom, this shows all objectives in the game */
export type ObjectiveMetadata = {
    id: number;
    name: string;
    conditions: Array<ConditionMetadata>;
    conditions_required: number;
};

/** A condition found on an OBjectiveMetadata above */
export type ConditionMetadata = {
    condition_type_name: string;
    condition_type_value: number;
    value: number;
    name: string;
    base_address: number;
    bit: number;
};

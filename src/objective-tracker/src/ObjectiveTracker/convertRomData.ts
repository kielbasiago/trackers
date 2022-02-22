import {
    ConditionMetadata,
    ConditionResponseData,
    ConditionType,
    ObjectiveMetadata,
    ObjectiveResponseData,
} from "../types";

export function convertObjectiveRomData(
    input: ObjectiveMetadata
): ObjectiveResponseData {
    const { conditions: rawConditions, id, name, conditions_required } = input;
    const conditions = rawConditions.map(convertConditionRomData);
    return {
        conditions,
        id,
        key: name,
        requiredConditions: conditions_required,
        totalConditions: conditions.length,
    };
}

function convertConditionRomData(
    input: ConditionMetadata
): ConditionResponseData {
    const { base_address, bit, condition_type_name, name, value } = input;

    return {
        bitValue: bit,
        conditionDescription: name,
        conditionType: condition_type_name as keyof typeof ConditionType,
        contextValue: value,
        memoryAddr: base_address,
        name: name,
    };
}

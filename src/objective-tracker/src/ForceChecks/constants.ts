export const RewardType = {
    CHARACTER: 2,
    ESPER: 4,
    ITEM: 8,
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type RewardType = typeof RewardType.CHARACTER | typeof RewardType.ESPER | typeof RewardType.ITEM;

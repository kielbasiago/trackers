import { CharacterCell, LayoutCell, LayoutGroup, LayoutNumberCell } from "./layout";

const condenseLayout = [
    [
        /*********************** ROW 3 ***********************/
        new LayoutGroup("none", "center", [
            new LayoutNumberCell(
                "characterCount",
                "characterCount",
                ({ characters, characterCount }) => {
                    return characterCount > 0 ? characterCount : Object.values(characters).filter((z) => !!z).length;
                },
                undefined,
                {
                    min: 1,
                    max: 14,
                }
            ),
            new LayoutNumberCell(
                "esperCount",
                "esperCount",
                ({ esperCount }) => {
                    return esperCount;
                },
                undefined,
                {
                    max: 27,
                }
            ),
            new LayoutNumberCell(
                "dragonCount",
                "dragonCount",
                ({ dragonCount, dragons }) => {
                    return dragonCount > 0 ? dragonCount : Object.values(dragons).filter((z) => !!z).length;
                },
                undefined,
                { max: 8 }
            ),
        ]),
    ],
    /*********************** ROW 6 ***********************/
    [
        new LayoutGroup("none", "center", [
            new LayoutNumberCell("bossCount", "bossCount", ({ bossCount }) => bossCount, undefined, { max: 100 }),
            new LayoutNumberCell(
                "checkCount",
                "checkCount",
                ({ checkCount, events, dragons }) => {
                    return checkCount > 0
                        ? checkCount
                        : Object.values({ ...events, ...dragons }).filter((z) => !!z).length;
                },
                undefined,
                { max: 100 }
            ),
            new LayoutNumberCell("chestCount", "chestCount", ({ chestCount }) => chestCount, undefined, {
                max: 255,
            }),
        ]),
    ],
    // [
    //     /*********************** ROW 7 ***********************/
    //     new LayoutGroup("dragons", "center", [
    //         new LayoutCell("blueDragon", "blueDragon", ({ dragons }) => dragons.blueDragon),
    //         new LayoutCell("iceDragon", "iceDragon", ({ dragons }) => dragons.iceDragon),
    //         new LayoutCell("stormDragon", "stormDragon", ({ dragons }) => dragons.stormDragon),
    //         new LayoutCell("dirtDragon", "dirtDragon", ({ dragons }) => dragons.dirtDragon),
    //         new LayoutCell("goldDragon", "goldDragon", ({ dragons }) => dragons.goldDragon),
    //         new LayoutCell("skullDragon", "skullDragon", ({ dragons }) => dragons.skullDragon),
    //         new LayoutCell("redDragon", "redDragon", ({ dragons }) => dragons.redDragon),
    //         new LayoutCell("whiteDragon", "whiteDragon", ({ dragons }) => dragons.whiteDragon),
    //     ]),
    // ],
];

export const rowLayout = [
    [
        /*********************** ROW 3 ***********************/
        new LayoutGroup("none", "center", [
            new LayoutNumberCell(
                "characterCount",
                "characterCount",
                ({ characters, characterCount }) => {
                    return characterCount > 0 ? characterCount : Object.values(characters).filter((z) => !!z).length;
                },
                undefined,
                {
                    min: 1,
                    max: 14,
                }
            ),
            new LayoutNumberCell(
                "esperCount",
                "esperCount",
                ({ esperCount }) => {
                    return esperCount;
                },
                undefined,
                {
                    max: 27,
                }
            ),
            new LayoutNumberCell(
                "dragonCount",
                "dragonCount",
                ({ dragonCount, dragons }) => {
                    return dragonCount > 0 ? dragonCount : Object.values(dragons).filter((z) => !!z).length;
                },
                undefined,
                { max: 8 }
            ),

            new LayoutNumberCell("bossCount", "bossCount", ({ bossCount }) => bossCount, undefined, { max: 100 }),
            new LayoutNumberCell(
                "checkCount",
                "checkCount",
                ({ checkCount, events, dragons }) => {
                    return checkCount > 0
                        ? checkCount
                        : Object.values({ ...events, ...dragons }).filter((z) => !!z).length;
                },
                undefined,
                { max: 100 }
            ),
            new LayoutNumberCell("chestCount", "chestCount", ({ chestCount }) => chestCount, undefined, {
                max: 255,
            }),
        ]),
    ],
];

export const colLayout = [
    [
        /*********************** ROW 3 ***********************/
        new LayoutGroup("characterCount", "flex-start", [
            new LayoutNumberCell(
                "characterCount",
                "characterCount",
                ({ characters, characterCount }) => {
                    return characterCount > 0 ? characterCount : Object.values(characters).filter((z) => !!z).length;
                },
                undefined,
                {
                    min: 1,
                    max: 14,
                }
            ),
        ]),
        new LayoutGroup("esperCount", "flex-start", [
            new LayoutNumberCell(
                "esperCount",
                "esperCount",
                ({ esperCount }) => {
                    return esperCount;
                },
                undefined,
                {
                    max: 27,
                }
            ),
        ]),
        new LayoutGroup("dragonCount", "flex-start", [
            new LayoutNumberCell(
                "dragonCount",
                "dragonCount",
                ({ dragonCount, dragons }) => {
                    return dragonCount > 0 ? dragonCount : Object.values(dragons).filter((z) => !!z).length;
                },
                undefined,
                { max: 8 }
            ),
        ]),
        new LayoutGroup("checkCount", "flex-start", [
            new LayoutNumberCell(
                "checkCount",
                "checkCount",
                ({ checkCount, events, dragons }) => {
                    return checkCount > 0
                        ? checkCount
                        : Object.values({ ...events, ...dragons }).filter((z) => !!z).length;
                },
                undefined,
                { max: 100 }
            ),
        ]),
        new LayoutGroup("bossCount", "flex-start", [
            new LayoutNumberCell("bossCount", "bossCount", ({ bossCount }) => bossCount, undefined, { max: 100 }),
        ]),

        new LayoutGroup("chestCount", "flex-start", [
            new LayoutNumberCell("chestCount", "chestCount", ({ chestCount }) => chestCount, undefined, {
                max: 255,
            }),
        ]),
    ],
];

type Cell = LayoutCell | LayoutNumberCell;
export const getCell = (key: string) => {
    const c = condenseLayout.reduce<Cell | null>((acc, groups, idx) => {
        acc =
            acc ||
            groups.reduce<Cell | null>((acc, group, idx) => {
                const cells = group.args[2];
                acc =
                    acc ||
                    cells.reduce<Cell | null>((acc, cell, idx) => {
                        if (cell.args[0] === key) {
                            return cell;
                        }
                        return acc;
                    }, null);

                return acc;
            }, null);

        return acc;
    }, null);

    return c;
};

export { condenseLayout };

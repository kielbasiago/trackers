import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Tile } from "../queries/data/Tile";

type Props = {
    proportion?: number;
    tiles: Array<Tile>;
};

const tileOrder = [
    0x00, 0x01, 0x02, 0x03, 0x08, 0x10, 0x11, 0x12, 0x13, 0x09, 0x04, 0x05, 0x06, 0x07, 0x0a, 0x14, 0x15, 0x16, 0x17,
    0x0b, 0x0d, 0x0e, 0x0f, 0x18, 0x0c,
];

const DrawPortrait: React.FC<Props> = (props: Props) => {
    const { tiles, proportion = 1 } = props;
    const ref = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        if (!ref.current) {
            return;
        }

        const context = ref.current.getContext("2d");

        if (!context) {
            return;
        }

        let row = 0;
        let col = 0;
        const PIXELS_PER_ROW = 8;
        const PIXELS_PER_COLUMN = 8;

        const getXOffset = () => col * (proportion * PIXELS_PER_ROW);
        const getYOffset = () => row * (proportion * PIXELS_PER_COLUMN);

        tileOrder.forEach((tileIdx, idx) => {
            const tile = tiles[tileIdx];
            console.group(`Tile (${row}, ${col})`);
            tile.map.forEach((cell) => {
                const fillStyle = tile.palette.colors[cell.value];
                context.fillStyle = fillStyle.toCss();
                const x = cell.x * proportion + getXOffset();
                const y = cell.y * proportion + getYOffset();
                console.log(`drawing cell (${x}, ${y}) of size ${proportion}`);
                // if (cell.value === 0) {
                //     context.clearRect(
                //         cell.x * proportion + getXOffset(),
                //         cell.y * proportion + getYOffset(),
                //         proportion,
                //         proportion
                //     );
                // } else {
                context.fillRect(cell.x + getXOffset(), cell.y + getYOffset(), proportion, proportion);
                // }
            });
            console.groupEnd();
            if (row < 4) {
                row += 1;
            } else {
                row = 0;
            }
            if (row === 0) {
                col += 1;
            }
        });
    }, [tiles]);
    return <canvas ref={ref} width={40 * proportion} height={40 * proportion} />;
};

export default DrawPortrait;

import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Tile } from "../queries/data/Tile";

type Props = {
    proportion?: number;
    tiles: Array<Tile>;
};

const DrawSprite: React.FC<Props> = (props: Props) => {
    const { tiles, proportion = 2 } = props;
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

        const getXOffset = () => col * (1.4 * PIXELS_PER_ROW);
        const getYOffset = () => row * (1 * PIXELS_PER_COLUMN);

        tiles.forEach((tile) => {
            tile.map.forEach((cell) => {
                const fillStyle = tile.palette.colors[cell.value];
                context.fillStyle = fillStyle.toCss();
                context.fillRect(cell.x + getXOffset(), cell.y + getYOffset(), 4, 4);
            });
            col += 1;
            if (col > 1) {
                col = 0;
                row += 1;
            }
        });
        row += 1;
    }, [tiles]);
    return <canvas ref={ref} width={16 * proportion} height={24 * proportion} />;
};

export default DrawSprite;

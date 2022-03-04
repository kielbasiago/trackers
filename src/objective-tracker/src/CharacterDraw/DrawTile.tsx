import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Tile } from "../queries/data/Tile";

type Props = {
    proportion?: number;
    tileId: string;
    tile: Tile;
};

const DrawTile: React.FC<Props> = (props: Props) => {
    const { tile, tileId, proportion = 1 } = props;
    const ref = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        if (!ref.current) {
            return;
        }
        const context = ref.current.getContext("2d");
        if (!context) {
            return;
        }
        tile.map.forEach((cell) => {
            const fill = cell.value === 0 ? context.clearRect : context.fillRect;
            const fillStyle = tile.palette.colors[cell.value];
            context.fillStyle = "#ff0000"; //fillStyle.toCss();
            fill(cell.x * proportion, cell.y * proportion, proportion, proportion);
        });
    }, [tileId]);
    return <canvas ref={ref} />;
};

export default DrawTile;

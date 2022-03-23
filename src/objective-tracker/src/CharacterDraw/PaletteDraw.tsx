import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Palette } from "../queries/data/Palette";

type Props = {
    palette: Palette;
};

const PaletteDraw: React.FC<Props> = (props: Props) => {
    const { palette } = props;
    const { colors } = palette;
    const ref = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!ref.current || !colors.length) {
            return;
        }

        const context = ref.current.getContext("2d");

        if (!context) {
            return;
        }
        colors.forEach((color, idx) => {
            context.fillStyle = color.toCss();
            context.fillRect(idx * 24, 0, 24, 24);
        });
    }, [palette]);
    return (
        <div style={{ padding: 16, width: 24 * 16, height: 24 }}>
            <canvas ref={ref} width={24 * 16} height={24} />
        </div>
    );
};

export default PaletteDraw;

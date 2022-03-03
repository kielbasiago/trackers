import { createTheme, ThemeOptions } from "@mui/material";
import React, { useState } from "react";
import { TrackerFont, TrackerMode, TrackerBackground, TrackerThemeMode } from "../AnguirelTracker/types";

export type TrackerSettings = {
    mode: TrackerMode;
    themeMode: TrackerThemeMode;
    background: TrackerBackground;
    font: TrackerFont;
    /** show tag of character count */
    characterTag: boolean;
};

export type FullTrackerSettings = TrackerSettings & {
    setBackground: (theme: TrackerBackground) => void;
    setThemeMode: (theme: TrackerThemeMode) => void;
    setFont: (font: TrackerFont) => void;
    setMode: (mode: TrackerMode) => void;
    setCharacterTag: (characterTag: boolean) => void;
};

export const ff6FontTheme = {
    typography: {
        allVariants: {
            fontFamily: '"Final Fantasy 3/6 Font"',
            fontSize: "1.35em",
        },
        h6: {
            fontSize: "1.5em",
        },
    },
} as Pick<ThemeOptions, "typography">;

export const normalFontTheme = {
    typography: {
        allVariants: {},
        h6: {
            fontSize: "1.5em",
        },
    },
} as Pick<ThemeOptions, "typography">;

const noop = () => {};
export const TrackerSettingsContext = React.createContext<FullTrackerSettings>({
    // font: TrackerFont.DEFAULT,
    // mode: TrackerMode.AUTO,
    // themeMode: "dark",
    // theme: TrackerTheme.ANGUIREL,
    // characterTag: false,
    // setFont: noop,
    // setMode: noop,
    // setTheme: noop,
    // setThemeMode: noop,
    // setCharacterTag: noop,
} as FullTrackerSettings);

export const useTrackerSettings = () => React.useContext(TrackerSettingsContext);

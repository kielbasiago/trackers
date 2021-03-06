import { createTheme, ThemeOptions } from "@mui/material";
import React, { useState } from "react";
import { TrackerFont, TrackerMode, TrackerBackground, TrackerThemeMode, LayoutTypes } from "../AnguirelTracker/types";

export type TrackerSettings = {
    mode: TrackerMode;
    themeMode: TrackerThemeMode;
    background: TrackerBackground;
    font: TrackerFont;
    /** show tag of character count */
    characterTag: boolean;
    /** Always true when visiting site, only false when providing link to tracker */
    showHeader: boolean;
    layoutType: LayoutTypes;
};

export type FullTrackerSettings = TrackerSettings & {
    setBackground: (theme: TrackerBackground) => void;
    setThemeMode: (theme: TrackerThemeMode) => void;
    setFont: (font: TrackerFont) => void;
    setMode: (mode: TrackerMode) => void;
    setCharacterTag: (characterTag: boolean) => void;
    setShowHeader: (showHeader: boolean) => void;
    setLayoutType: (layoutType: LayoutTypes) => void;
};

export const ff6FontTheme = {
    typography: {
        allVariants: {
            fontFamily: '"Final Fantasy 3/6 Font"',
            fontSize: "1.35em",
        },
        h6: {
            fontSize: "2.2em",
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
export const TrackerSettingsContext = React.createContext<FullTrackerSettings>({} as FullTrackerSettings);

export const useTrackerSettings = () => React.useContext(TrackerSettingsContext);

import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TrackerFont, TrackerBackground, TrackerThemeMode } from "./AnguirelTracker/types";
import AppSettingsProvider from "./AppSettingsProvider";
import ThemeProvider from "@mui/system/ThemeProvider";
import { createTheme, Theme, ThemeOptions } from "@mui/material";
import { normalFontTheme, ff6FontTheme } from "./settings/settings";
import { useLocation } from "react-router-dom";
import CharacterDraw from "./CharacterDraw/CharacterPortraitDraw";
import CharacterSpriteDraw from "./CharacterDraw/CharacterSpriteDraw";

const AnguirelTracker = React.lazy(() => import("./AnguirelTracker/AnguirelTracker"));

function App() {
    const [theme, setTheme] = useState<Theme>(
        createTheme({
            palette: {
                mode: "dark",
            },
            ...ff6FontTheme,
        })
    );
    const onThemeUpdate = (font: TrackerFont, newmode: TrackerThemeMode) => {
        const mode = newmode === TrackerThemeMode.DARK ? "dark" : "light";
        const partial = font === TrackerFont.DEFAULT ? normalFontTheme : ff6FontTheme;

        setTheme(
            createTheme({
                palette: {
                    mode,
                },
                ...partial,
            })
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <AppSettingsProvider onThemeUpdate={(font, themeMode) => onThemeUpdate(font, themeMode)}>
                <Routes>
                    <Route path="/test" element={<CharacterSpriteDraw />} />
                    <Route path="/" element={<AnguirelTracker />} />
                </Routes>
            </AppSettingsProvider>
        </ThemeProvider>
    );
}

export default App;

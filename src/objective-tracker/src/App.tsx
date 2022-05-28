import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TrackerFont, TrackerBackground, TrackerThemeMode } from "./AnguirelTracker/types";
import AppSettingsProvider from "./AppSettingsProvider";
import ThemeProvider from "@mui/system/ThemeProvider";
import { createTheme, Theme, ThemeOptions } from "@mui/material";
import { normalFontTheme, ff6FontTheme } from "./settings/settings";
import { useLocation } from "react-router-dom";
import { CheckPicker } from "./ForceChecks/CheckPicker";
import { SpellPicker } from "./SpellPicker/SpellPicker";

const AnguirelTracker = React.lazy(() => import("./AnguirelTracker/AnguirelTracker"));
const AnguirelTrackerSimple = React.lazy(() => import("./AnguirelTracker/AnguirelTrackerSimple"));

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
            <Routes>
                <Route
                    path="/"
                    element={
                        <AppSettingsProvider onThemeUpdate={(font, themeMode) => onThemeUpdate(font, themeMode)}>
                            <AnguirelTracker />
                        </AppSettingsProvider>
                    }
                />
                <Route
                    path="/simple"
                    element={
                        <AppSettingsProvider onThemeUpdate={(font, themeMode) => onThemeUpdate(font, themeMode)}>
                            <AnguirelTrackerSimple />
                        </AppSettingsProvider>
                    }
                />
                <Route path="/rewards" element={<CheckPicker />} />
                <Route path="/spells" element={<SpellPicker />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;

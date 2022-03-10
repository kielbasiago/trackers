import { TrackerFont, TrackerMode, TrackerBackground, TrackerThemeMode } from "./AnguirelTracker/types";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { TrackerSettings, TrackerSettingsContext, useTrackerSettings } from "./settings/settings";
import { useNavigate } from "react-router-dom";

type Props = {
    onThemeUpdate: (background: TrackerFont, themeMode: TrackerThemeMode) => void;
};
const STORAGE_KEY = `FF6WC-TRACKER--SETTINGS`;

function useQuery(key: string) {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search).get(key), [search]);
}

export const AppSettingsProvider: React.FC<Props> = (props) => {
    const { children, onThemeUpdate } = props;
    const qsCharacterTag = useQuery("characterTag");
    const qsFont = useQuery("font");
    const qsMode = useQuery("mode");
    const qsBackground = useQuery("background");
    const qsThemeMode = useQuery("themeMode");
    const qsShowHeader = useQuery("showHeader");
    const nav = useNavigate();
    const location = useLocation();
    const [raw] = useState(
        // localStorage.getItem(STORAGE_KEY) ??
        JSON.stringify({
            font: TrackerFont.DEFAULT,
            mode: TrackerMode.AUTO,
            background: TrackerBackground.ANGUIREL,
            themeMode: TrackerThemeMode.DARK,
            characterTag: true,
            showHeader: true,
        } as TrackerSettings)
    );

    const defaults: TrackerSettings = JSON.parse(raw);

    const [characterTag, setCharacterTag] = useState<boolean>(
        qsCharacterTag === "false" ? false : defaults.characterTag
    );

    const [showHeader, setShowHeader] = useState<boolean>(qsShowHeader === "false" ? false : defaults.showHeader);

    const [font, setFont] = useState<TrackerFont>((qsFont?.toUpperCase() as TrackerFont) ?? defaults.font);
    const [mode, setMode] = useState<TrackerMode>((qsMode?.toUpperCase() as TrackerMode) ?? defaults.mode);
    const [background, setBackground] = useState<TrackerBackground>(
        (qsBackground?.toUpperCase() as TrackerBackground) ?? defaults.background
    );
    const [themeMode, setThemeMode] = useState<TrackerThemeMode>(
        (qsThemeMode?.toLowerCase() as TrackerThemeMode) ?? defaults.themeMode
    );

    useEffect(() => {
        const val = {
            characterTag,
            font,
            mode,
            background,
            themeMode,
            showHeader,
        } as TrackerSettings;
        const searchVals = Object.keys(val).map((key) => {
            return `${key}=${val[key as keyof typeof val]}`;
        });
        const search = "?" + searchVals.join("&");
        localStorage.setItem(STORAGE_KEY, JSON.stringify(val));

        if (search !== location.search) {
            nav(`${location.pathname}${search}`, {
                replace: true,
            });
        }
    }, [characterTag, font, mode, background, themeMode]);

    useEffect(() => {
        onThemeUpdate(font, themeMode);
    }, [themeMode, font]);

    return (
        <TrackerSettingsContext.Provider
            value={{
                characterTag,
                setCharacterTag,
                font,
                setFont,
                mode,
                setMode,
                background,
                setBackground,
                themeMode,
                setThemeMode,
                showHeader,
                setShowHeader,
            }}
        >
            {children}
        </TrackerSettingsContext.Provider>
    );
};

export default AppSettingsProvider;

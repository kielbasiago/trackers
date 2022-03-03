import React from "react";
import {
    FF6CharacterFlags,
    ff6Characters,
    FF6DragonFlags,
    ff6Dragons,
    FF6EsperFlags,
    FF6EventFlags,
    ff6Events,
} from "../../types/ff6-types";
import { GetSaveDataResponse, TrackerMode } from "../types";

export type TrackerContextData = GetSaveDataResponse & {
    mode: TrackerMode;
};

export const getDefaultTrackerData = () => {
    const characters = Object.keys(ff6Characters).reduce((acc, key) => {
        acc[key as keyof FF6CharacterFlags] = false;
        return acc;
    }, {} as FF6CharacterFlags);
    const events = Object.keys(ff6Events).reduce((acc, key) => {
        acc[key as keyof FF6EventFlags] = false;
        return acc;
    }, {} as FF6EventFlags);
    const dragons = Object.keys(ff6Dragons).reduce((acc, key) => {
        acc[key as keyof FF6DragonFlags] = false;
        return acc;
    }, {} as FF6DragonFlags);
    return {
        characters,
        events,
        dragons,
        allFlags: {
            ...characters,
            ...events,
            ...dragons,
        },
        bossCount: 0,
        characterCount: 0,
        checkCount: 0,
        dragonCount: 0,
        esperCount: 0,
        gameTime: 0,
        mode: TrackerMode.AUTO,
    } as TrackerContextData;
};
export const TrackerContext = React.createContext<TrackerContextData | null>(null);

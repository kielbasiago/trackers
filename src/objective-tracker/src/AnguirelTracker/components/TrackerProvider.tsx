import React, { useContext, useState } from "react";
import {
    FF6Character,
    FF6CharacterFlags,
    ff6Characters,
    FF6Dragon,
    FF6DragonFlags,
    ff6Dragons,
    FF6Event,
    FF6EventFlags,
    ff6Events,
} from "../../types/ff6-types";
import { GetSaveDataResponse } from "../types";

export type TrackerContextData = {
    data: GetSaveDataResponse;
    onClick: (key: string, value?: number) => unknown;
    onRightClick: (key: string, value?: number) => unknown;
    updateFlag: (flag: string, value: any) => void;
};

export const getTrackerDefaults = () => {
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

    const defaultData = {
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
    } as TrackerContextData["data"];

    return {
        data: defaultData,
    } as Pick<TrackerContextData, "data">;
};

export const TrackerContext = React.createContext<TrackerContextData | null>(null);

export const useTrackerContext = () => {
    const value = useContext(TrackerContext);
    if (!value) {
        return {
            ...getTrackerDefaults(),
            onClick: () => {},
            onRightClick: () => {},
            updateFlag: () => {},
        } as TrackerContextData;
    }

    return value;
};

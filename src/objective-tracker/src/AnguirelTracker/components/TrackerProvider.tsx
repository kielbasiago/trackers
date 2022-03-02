import React, { useContext, useState } from "react";
import {
    FF6Character,
    FF6CharacterFlags,
    ff6Characters,
    FF6Dragon,
    FF6DragonFlags,
    ff6Dragons,
    FF6EsperFlags,
    FF6Event,
    FF6EventFlags,
    ff6Events,
} from "../../types/ff6-types";
import { getCell, LayoutNumberCell } from "../layout";
import { GetSaveDataResponse, TrackerMode } from "../types";

export type TrackerContextData = {
    data: GetSaveDataResponse;
    mode: TrackerMode;
    onClick: (key: string, value?: number) => unknown;
    onRightClick: (key: string, value?: number) => unknown;
    setData: (data: GetSaveDataResponse) => void;
    updateFlag: (flag: FF6Character & FF6Dragon & FF6Event) => void;
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

    const increment = (key: string, currentValue?: number) => {
        const cell = getCell(key);
        if (cell instanceof LayoutNumberCell && currentValue != null) {
            const [_key, _display, _cb1, _cb2, options = { min: 0, max: 3 }] = cell.args;
            const { min, max } = options;
            let newValue = currentValue++;
            if (newValue > max) {
            } else {
            }
        }

        const allFlags = data.data.allFlags;
        const keys = Object.keys(data.data.allFlags).filter((z) => z.includes(key));
        const item = allFlags[key as unknown as keyof (FF6CharacterFlags & FF6DragonFlags & FF6EventFlags)];
    };

    const decrement = (key: string, value?: number) => {
        const allFlags = data.data.allFlags;
        const keys = Object.keys(allFlags).filter((z) => z.includes(key));
        const item = allFlags[key as unknown as keyof (FF6CharacterFlags & FF6DragonFlags & FF6EventFlags)];
        debugger;
    };

    const updateData = (newData: GetSaveDataResponse) => {
        return setData({
            ...data,
            data: newData,
        });
    };

    const updateFlag = (flag: FF6Character & FF6Dragon & FF6Event) => {
        const character = !!data.data.characters[flag];
        const event = !!data.data.events[flag];
        const dragon = !!data.data.dragons[flag];
    };

    return {
        data: defaultData,
        mode: TrackerMode.AUTO,
        onClick: increment,
        onRightClick: decrement,
        setData: updateData,
        updateFlag,
    };
};

export const TrackerContext = React.createContext<TrackerContextData | null>(null);

export const useTrackerContext = () => useContext(TrackerContext);

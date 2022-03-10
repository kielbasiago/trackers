import React, { useContext } from "react";
import {
    FF6CharacterFlags,
    ff6Characters,
    FF6DragonFlags,
    ff6Dragons,
    FF6EventFlags,
    ff6Events,
} from "../../types/ff6-types";
import { LayoutCell, LayoutNumberCell } from "../layout";
import { GetSaveDataResponse } from "../types";

export type TrackerContextData = {
    data: GetSaveDataResponse;
    onClick: (key: string) => unknown;
    onRightClick: (key: string) => unknown;
    updateCell: (cell: LayoutCell, value: boolean) => GetSaveDataResponse;
    updateNumberCell: (cell: LayoutNumberCell, value: number) => GetSaveDataResponse;
    updateValue: (key: string, value: any) => GetSaveDataResponse;
    updateData: (data: GetSaveDataResponse) => void;
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
            updateCell: () => getTrackerDefaults().data,
            updateNumberCell: () => getTrackerDefaults().data,
            updateValue: () => getTrackerDefaults().data,
            updateData: () => {},
        } as TrackerContextData;
    }

    return value;
};

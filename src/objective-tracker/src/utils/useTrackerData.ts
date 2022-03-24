import times from "lodash/times";
import { getLogger } from "loglevel";
import { CharacterCell, getCell, LayoutCell, LayoutNumberCell } from "../AnguirelTracker/layout";
import { GetSaveDataResponse, TrackerContextData, TrackerMode } from "../AnguirelTracker/types";
import { FF6Character, FF6Dragon, FF6Event } from "../types/ff6-types";

/** Returns  */
type UseTrackerDataProps = {
    mode: TrackerMode;
    trackerData: Pick<TrackerContextData, "data">;
    setTrackerData: (data: Pick<TrackerContextData, "data">) => void;
};

type DataKey = keyof GetSaveDataResponse;

export function useTrackerData(props: UseTrackerDataProps) {
    const { trackerData, mode, setTrackerData } = props;
    const providerData = {
        ...trackerData,
        // increment
        onClick(key: string) {
            if (mode === TrackerMode.AUTO) {
                return;
            }

            const cell = getCell(key);
            // magitek, floatingContintent, nightmare, auctionHouse, etc.
            if (cell == null) {
                getLogger("AnguirelTracekr--Manual-onClick").info(`no cell for key ${key}`);
                return;
            }

            if (cell instanceof CharacterCell) {
                const [key, _display, valueCallback, _cb2] = cell.args;
                const currentValue = valueCallback(trackerData.data) as boolean;
                const newData = providerData.updateValue(key, !currentValue);
                providerData.updateData(newData);
            } else if (cell instanceof LayoutNumberCell) {
                const [_key, _display, valueCallback, _cb2, options = { min: 0, max: 3 }] = cell.args;
                const currentValue = valueCallback(trackerData.data) as number;
                const { min, max } = options;
                let newValue = 0;
                if (currentValue < max) {
                    newValue = Math.max(0, Math.min(currentValue + 1, max));
                }
                const newData = providerData.updateNumberCell(cell, newValue);
                providerData.updateData(newData);
            } else if (cell instanceof LayoutCell) {
                const [_key, _displayName, valueCallback] = cell.args;
                const currentValue = valueCallback(trackerData.data) as boolean;
                const newData = providerData.updateCell(cell, !currentValue);
                providerData.updateData(newData);
            }
        },

        // decrement
        onRightClick(key: string) {
            const cell = getCell(key);

            // magitek, floatingContintent, nightmare, auctionHouse, etc.
            if (cell == null) {
                getLogger("AnguirelTracekr--Manual-onRightClick").info(`no cell for key ${key}`);
                return;
            }

            if (cell instanceof LayoutCell || cell instanceof CharacterCell) {
                const newData = providerData.updateValue(cell.args[0], false);
                providerData.updateData(newData);
            } else if (cell instanceof LayoutNumberCell) {
                const [_key, _display, valueCallback, _cb2, options = { min: 0, max: 3 }] = cell.args;
                const currentValue = valueCallback(trackerData.data) as number;
                const { min, max } = options;
                let newValue = 0;
                if (currentValue > 0) {
                    newValue = Math.min(max, Math.max(currentValue - 1, 0));
                }
                const newData = providerData.updateNumberCell(cell, newValue);
                providerData.updateData(newData);
            }
        },
        updateData(newData: GetSaveDataResponse): void {
            setTrackerData({
                ...trackerData,
                data: newData,
            });
        },
        updateNumberCell(cell, value): GetSaveDataResponse {
            const rawkey = cell.args[0];
            const opts = cell.args[4] ?? {
                min: 0,
                max: 3,
            };

            if (trackerData.data[rawkey as DataKey] != null) {
                const latestData = providerData.updateValue(rawkey, value);
                return latestData;
            }

            const checkKeys = times(opts.max, (idx) => `${rawkey}${idx + 1}`);
            let latestData: GetSaveDataResponse | null = trackerData.data;
            checkKeys.forEach((val, idx) => {
                // working with index of 1
                idx++;
                latestData = providerData.updateValue(val, value >= idx);
            });

            return latestData as GetSaveDataResponse;
        },
        updateCell(cell, value): GetSaveDataResponse {
            const data = providerData.updateValue(cell.args[0], value);
            return data;
        },
        updateValue(flag, value): GetSaveDataResponse {
            const character = trackerData.data.characters[flag as FF6Character] != null;
            const event = trackerData.data.events[flag as FF6Event] != null;
            const dragon = trackerData.data.dragons[flag as FF6Dragon] != null;
            const global = trackerData.data[flag as DataKey] != null;

            if (global) {
                const f = flag as DataKey;
                trackerData.data[f] = value;
            } else if (character) {
                const f = flag as FF6Character;
                trackerData.data.allFlags[f] = value;
                trackerData.data.characters[f] = value;
            } else if (event) {
                const f = flag as FF6Event;
                trackerData.data.allFlags[f] = value;
                trackerData.data.events[f] = value;
            } else if (dragon) {
                const f = flag as FF6Dragon;
                trackerData.data.allFlags[f] = value;
                trackerData.data.dragons[f] = value;
            }

            return trackerData.data;
        },
    } as TrackerContextData;

    return providerData;
}

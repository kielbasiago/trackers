import { Paper, TextField, Typography } from "@mui/material";
import clsx from "clsx";
import last from "lodash/last";
import times from "lodash/times";
import { getLogger } from "loglevel";
import React, { useEffect, useRef, useState } from "react";
import { GetSaveDataQuery } from "../queries/GetSaveDataQuery";
import { useTrackerSettings } from "../settings/settings";
import { QueryBuilder } from "../tracker/QueryBuilder";
import { snesSession } from "../tracker/SnesSession";
import { FF6Character, FF6Dragon, FF6Event } from "../types/ff6-types";
import { sleep } from "../utils/sleep";
import "./AnguirelTracker.scss";
import TrackerHeader from "./components/TrackerHeader";
import { getTrackerDefaults, TrackerContext, TrackerContextData } from "./components/TrackerProvider";
import { CharacterCell, getCell, layout, LayoutCell, LayoutNumberCell } from "./layout";
import { renderLayout } from "./layoutRender";
import { GetSaveDataResponse, TrackerMode } from "./types";

type Props = Record<string, unknown>;

type DataKey = keyof GetSaveDataResponse;

export function AnguirelTracker(props: Props): JSX.Element {
    const [session] = useState(snesSession);
    const [qb, setQb] = useState<QueryBuilder>();
    const [initialized, setInitialized] = useState(false);
    const [initializing, setInitializing] = useState(false);

    const [trackerData, setTrackerData] = useState(getTrackerDefaults());
    const { mode, background, themeMode, showHeader } = useTrackerSettings();

    const { data } = trackerData;

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
                let newValue = Math.max(0, Math.min(currentValue + 1, max));
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
        onRightClick(key: string, value?: number) {
            const allFlags = trackerData.data.allFlags;
            const keys = Object.keys(allFlags).filter((z) => z.includes(key));
            // const item = allFlags[key as unknown as keyof (FF6CharacterFlags & FF6DragonFlags & FF6EventFlags)];
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

    const logs = useRef<Array<string>>([]);
    const [sendRequest, setSendRequest] = useState(0);
    const [____ignoreRenderVal, setRender] = useState(0);

    useEffect(() => {
        if (session && !qb) {
            setQb(new QueryBuilder(session));
        }
    }, [qb, session]);

    useEffect(() => {
        if (qb && session && !initialized && !initializing) {
            void (async function () {
                session.clearLog();
                if (qb) {
                    setInitializing(true);
                    snesSession.setLogger((...msgs) => {
                        logs.current.push(...msgs);
                        setRender(Math.random());
                    });
                    await qb.connect();
                    session.logMessages.push("CONNECTED");
                    setInitialized(true);
                }
            })();
        }
    }, [session, qb, initialized]);

    useEffect(() => {
        if (!qb || !initialized) {
            return;
        }
        void (async function () {
            const dataResult = await qb?.send(
                new GetSaveDataQuery().setLogger((...msgs) => {
                    logs.current.push(...msgs);
                    setRender(Math.random());
                })
            );

            setTrackerData({
                ...trackerData,
                data: dataResult,
            });
            // setBitData(bitsResult);
            await sleep(800);
            setSendRequest(sendRequest + 1);
        })();
    }, [qb, initialized, sendRequest]);

    const RenderedLayout = renderLayout(layout);

    return (
        <TrackerContext.Provider value={providerData}>
            <Paper
                style={{
                    width: 600,
                    minWidth: 600,
                    maxWidth: 600,
                    boxShadow: "none",
                    height: "100%",
                    borderRadius: 0,
                }}
                className={clsx(`theme-${background}`, `theme-mode-${themeMode} tracker-background`)}
            >
                {showHeader ? <TrackerHeader /> : null}
                <div style={{ position: "relative" }}>
                    {RenderedLayout}
                    {session.status === "CONNECTED" || mode === TrackerMode.MANUAL ? null : (
                        <div className="overlay overlay-background">
                            <Typography>{last(session.logMessages)}</Typography>
                        </div>
                    )}
                </div>
                <TextField
                    disabled
                    multiline
                    fullWidth
                    rows={8}
                    value={logs.current.join("\r\n")}
                    style={{ marginTop: 48 }}
                    className={"tracker-log"}
                />
            </Paper>
        </TrackerContext.Provider>
    );
}

export default AnguirelTracker;

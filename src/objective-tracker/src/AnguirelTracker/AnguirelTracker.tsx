import { Paper, TextField, Typography } from "@mui/material";
import flatten from "lodash/flatten";
import React, { useEffect, useRef, useState } from "react";
import { GetSaveDataQuery } from "../queries/GetSaveDataQuery";
import { useTrackerSettings } from "../settings/settings";
import { QueryBuilder } from "../tracker/QueryBuilder";
import { snesSession } from "../tracker/SnesSession";
import { FF6Character, FF6Dragon, FF6Event } from "../types/ff6-types";
import { sleep } from "../utils/sleep";
import "./AnguirelTracker.scss";
import TrackerCell from "./components/TrackerCell";
import { TrackerCounts } from "./components/TrackerCounts";
import TrackerGroup from "./components/TrackerGroup";
import TrackerHeader from "./components/TrackerHeader";
import { getTrackerDefaults, TrackerContext, TrackerContextData } from "./components/TrackerProvider";
import TrackerRow from "./components/TrackerRow";
import { getCell, layout, LayoutNumberCell } from "./layout";
import { GetSaveDataResponse, TrackerMode } from "./types";
import clsx from "clsx";
import last from "lodash/last";

type Props = Record<string, unknown>;
type Flag = keyof TrackerContextData["data"]["allFlags"];

export function AnguirelTracker(props: Props): JSX.Element {
    const [session] = useState(snesSession);
    const [qb, setQb] = useState<QueryBuilder>();
    const [initialized, setInitialized] = useState(false);
    const [initializing, setInitializing] = useState(false);

    const [trackerData, setTrackerData] = useState(getTrackerDefaults());
    const { mode, background, themeMode } = useTrackerSettings();

    const { data } = trackerData;

    const providerData = {
        ...trackerData,
        // increment
        onClick(key: string, currentValue?: number) {
            if (mode === TrackerMode.AUTO) {
                return;
            }

            // WIP
            const cell = getCell(key);
            if (cell instanceof LayoutNumberCell && currentValue != null) {
                const [_key, _display, _cb1, _cb2, options = { min: 0, max: 3 }] = cell.args;
                const { min, max } = options;
                let newValue = currentValue++;
                if (newValue > max) {
                } else {
                }
            }

            const allFlags = trackerData.data.allFlags;
            const values = Object.keys(trackerData.data.allFlags)
                .filter((z) => z.includes(key))
                .map((key) => trackerData.data.allFlags[key as Flag]);

            const max = values.length;
            // const currentValue = values.filter((v) => !!v).length;

            // const item = keys[key as unknown as keyof (FF6CharacterFlags & FF6DragonFlags & FF6EventFlags)];
        },

        // decrement
        onRightClick(key: string, value?: number) {
            const allFlags = trackerData.data.allFlags;
            const keys = Object.keys(allFlags).filter((z) => z.includes(key));
            // const item = allFlags[key as unknown as keyof (FF6CharacterFlags & FF6DragonFlags & FF6EventFlags)];
        },

        updateData(newData: GetSaveDataResponse) {
            setTrackerData({
                ...trackerData,
                data: newData,
            });
        },

        updateFlag(flag, value: any) {
            const character = !!trackerData.data.characters[flag as FF6Character];
            const event = !!trackerData.data.events[flag as FF6Event];
            const dragon = !!trackerData.data.dragons[flag as FF6Dragon];

            if (character) {
                const f = flag as FF6Character;
                const newValue = !trackerData.data.allFlags[f];
                trackerData.data.allFlags[f] = newValue;
                trackerData.data.characters[f] = newValue;
            } else if (event) {
                const f = flag as FF6Event;
                const newValue = !trackerData.data.allFlags[f];
                trackerData.data.allFlags[f] = newValue;
                trackerData.data.events[f] = newValue;
            } else if (dragon) {
                const f = flag as FF6Dragon;
                const newValue = !trackerData.data.allFlags[f];
                trackerData.data.allFlags[f] = newValue;
                trackerData.data.dragons[f] = newValue;
            }
        },

        setMode(mode: TrackerMode) {
            // noop for now
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
                <TrackerHeader />
                <div style={{ position: "relative" }}>
                    {flatten(
                        layout.map((layout, layoutIndex) => {
                            const $groups = layout.map((group) => {
                                const [groupName, _, cells] = group.args;
                                const $cells = cells.map((cell) => {
                                    return <TrackerCell key={cell.args[0]} cell={cell} />;
                                });

                                return (
                                    <TrackerGroup key={groupName} group={group}>
                                        {$cells}
                                    </TrackerGroup>
                                );
                            });

                            return <TrackerRow key={layoutIndex}>{$groups}</TrackerRow>;
                        })
                    )}
                    {session.status === "CONNECTED" ? null : (
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

import { FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import clsx from "clsx";
import last from "lodash/last";
import React, { useEffect, useRef, useState } from "react";
import { GetSaveDataQuery } from "../queries/GetSaveDataQuery";
import { useTrackerSettings } from "../settings/settings";
import { QueryBuilder } from "../tracker/QueryBuilder";
import { snesSession } from "../tracker/SnesSession";
import { sleep } from "../utils/sleep";
import { useTrackerData } from "../utils/useTrackerData";
import "./AnguirelTracker.scss";
import TrackerHeader from "./components/TrackerHeader";
import { getTrackerDefaults, TrackerContext } from "./components/TrackerProvider";
import { colLayout, condenseLayout, rowLayout } from "./condenseLayout";
import { RenderLayout } from "./layoutRender";
import { LayoutTypes, TrackerMode } from "./types";

type Props = Record<string, unknown>;

export function AnguirelTrackerSimple(props: Props): JSX.Element {
    const [session] = useState(snesSession);
    const [qb, setQb] = useState<QueryBuilder>();
    const [initialized, setInitialized] = useState(false);
    const [initializing, setInitializing] = useState(false);

    const [trackerData, setTrackerData] = useState(getTrackerDefaults());
    const { mode, background, themeMode, showHeader, setLayoutType, layoutType } = useTrackerSettings();

    const providerData = useTrackerData({
        mode,
        setTrackerData,
        trackerData,
    });

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
            if (mode === TrackerMode.MANUAL) {
                return;
            }
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
    }, [qb, initialized, sendRequest, mode]);

    let layout: typeof condenseLayout | typeof rowLayout | typeof colLayout;

    switch (layoutType) {
        case LayoutTypes.threeByTwo:
            layout = condenseLayout;
            break;
        case LayoutTypes.horizontal:
            layout = rowLayout;
            break;
        case LayoutTypes.vertical:
            layout = colLayout;
            break;
        default:
            layout = condenseLayout;
    }

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
                {showHeader ? (
                    <div className={"tracker-options"} style={{ marginTop: 8, paddingLeft: 16, paddingRight: 16 }}>
                        <FormControl fullWidth>
                            <InputLabel id="tracker-mode-select-label">Layout Mode</InputLabel>
                            <Select
                                labelId="tracker-mode-select-label"
                                id="tracker-mode-select"
                                value={layoutType}
                                label="Layout"
                                variant="standard"
                                onChange={(a) => setLayoutType(a.target.value as unknown as LayoutTypes)}
                            >
                                <MenuItem value={LayoutTypes.threeByTwo}>3x2</MenuItem>
                                <MenuItem value={LayoutTypes.horizontal}>Horizontal</MenuItem>
                                <MenuItem value={LayoutTypes.vertical}>Vertical</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                ) : null}
                <div style={{ position: "relative", marginTop: 16 }}>
                    <RenderLayout layout={layout} />
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

export default AnguirelTrackerSimple;

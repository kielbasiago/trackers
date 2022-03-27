import { Paper, TextField, Typography } from "@mui/material";
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
import { layout } from "./layout";
import { RenderLayout } from "./layoutRender";
import { TrackerMode } from "./types";

type Props = Record<string, unknown>;

export function AnguirelTracker(props: Props): JSX.Element {
    const [session] = useState(snesSession);
    const [qb, setQb] = useState<QueryBuilder>();
    const [initialized, setInitialized] = useState(false);
    const [initializing, setInitializing] = useState(false);

    const [trackerData, setTrackerData] = useState(getTrackerDefaults());
    const { mode, background, themeMode, showHeader } = useTrackerSettings();

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
                {showHeader ? <TrackerHeader /> : null}
                <div style={{ position: "relative" }}>
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

export default AnguirelTracker;

import { Paper, TextField } from "@mui/material";
import flatten from "lodash/flatten";
import React, { useEffect, useRef, useState } from "react";
import { GetSaveDataQuery } from "../queries/GetSaveDataQuery";
import { QueryBuilder } from "../tracker/QueryBuilder";
import { snesSession } from "../tracker/SnesSession";
import { sleep } from "../utils/sleep";
import "./AnguirelTracker.css";
import TrackerCell from "./components/TrackerCell";
import TrackerHeader from "./components/TrackerHeader";
import { TrackerCounts } from "./components/TrackerCounts";
import { useTrackerData, TrackerContext, TrackerContextData } from "./components/TrackerProvider";
import TrackerRow from "./components/TrackerRow";
import { layout } from "./layout";
import TrackerGroup from "./components/TrackerGroup";

type Props = Record<string, unknown>;

export function AnguirelTracker(props: Props): JSX.Element {
    const [session] = useState(snesSession);
    const [qb, setQb] = useState<QueryBuilder>();
    const [initialized, setInitialized] = useState(false);
    const [initializing, setInitializing] = useState(false);
    const trackerData = useTrackerData();
    const { data, setData } = trackerData;
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

            setData(dataResult);
            // setBitData(bitsResult);
            await sleep(2000);
            setSendRequest(sendRequest + 1);
        })();
    }, [qb, initialized, sendRequest]);

    return (
        <TrackerContext.Provider value={trackerData}>
            <Paper style={{ width: 600, minWidth: 600, maxWidth: 600, padding: 8 }}>
                <TrackerHeader />
                <div style={{ position: "relative" }}>
                    {flatten(
                        layout.map((layout) => {
                            const $groups = layout.map((group) => {
                                const [groupName, _, cells] = group.args;
                                const $cells = cells.map((cell) => {
                                    return <TrackerCell key={cell.args[0]} cell={cell} />;
                                });

                                return <TrackerGroup group={group}>{$cells}</TrackerGroup>;
                            });

                            return <TrackerRow>{$groups}</TrackerRow>;
                        })
                    )}
                    <div style={{ position: "absolute" }}> </div>
                </div>
                <TrackerCounts />
                <TextField disabled multiline fullWidth maxRows={5} rows={8} value={logs.current.join("\r\n")} />
            </Paper>
        </TrackerContext.Provider>
    );
}

export default AnguirelTracker;

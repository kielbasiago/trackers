import { Button, Grid, TextField, Typography } from "@mui/material";
import flatten from "lodash/flatten";
import React, { useEffect, useRef, useState } from "react";
import { GetObjectiveConditionBitsQuery } from "../queries/GetObjectiveConditionBitsQuery";
import { QueryBuilder } from "../tracker/QueryBuilder";
import { snesSession } from "../tracker/SnesSession";
import {
    ConditionAddressInfo,
    ConditionBitResult,
    ConditionResponseData,
    ResponseData,
} from "../types";
import { sleep } from "../utils/sleep";
import { ObjectiveTrackerState } from "./constants";
import { convertObjectiveRomData } from "./convertRomData";
import ObjectiveCondition from "./ObjectiveCondition";
import ObjectiveTitle from "./ObjectiveTitle";
import ObjectiveTrackerHeader from "./ObjectiveTrackerHeader";
import "./ObjectiveTrackerView.css";

type Props = Record<string, unknown>;

export function ObjectiveTrackerView(props: Props): JSX.Element {
    const {} = props;
    const [session] = useState(snesSession);
    const [qb, setQb] = useState<QueryBuilder>();
    const [initialized, setInitialized] = useState(false);
    const [initializing, setInitializing] = useState(false);
    const [trackerData, setTrackerData] = useState<ResponseData | null>(null);
    const [trackerState, setTrackerState] = useState<ObjectiveTrackerState>(
        ObjectiveTrackerState.SELECT_FILE
    );
    const [activeCondition, setActiveCondition] =
        useState<ConditionResponseData>();
    const [bitData, setBitData] = useState<Record<string, ConditionBitResult>>(
        {}
    );
    const [beginTracking, setBeginTracking] = useState<boolean>(false);
    const logs = useRef<Array<string>>([]);
    const [sendRequest, setSendRequest] = useState(0);
    const [____ignoreRenderVal, setRender] = useState(0);

    const activeConditionResult =
        bitData[activeCondition?.conditionDescription as string];

    useEffect(() => {
        if (session && !qb) {
            setQb(new QueryBuilder(session));
        }
    }, [qb, session]);

    useEffect(() => {
        if (!beginTracking) {
            return;
        }
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
    }, [session, qb, initialized, beginTracking]);

    useEffect(() => {
        if (!qb || !initialized || !trackerData?.objectiveData) {
            return;
        }
        void (async function () {
            const conditionData = flatten(
                trackerData?.objectiveData?.map((z) =>
                    z.conditions.map(
                        (z) =>
                            ({
                                foo: z.contextValue,
                                address: z.memoryAddr,
                                bit: z.bitValue,
                                key: z.conditionDescription,
                                type: z.conditionType,
                                contextValue: z.contextValue,
                            } as ConditionAddressInfo)
                    )
                )
            );

            const bitsResult = await qb?.send(
                new GetObjectiveConditionBitsQuery(conditionData).setLogger(
                    (...msgs) => {
                        logs.current.push(...msgs);
                        setRender(Math.random());
                    }
                )
            );

            setBitData(bitsResult);
            setTrackerState(ObjectiveTrackerState.TRACKING);
            await sleep(5000);
            setSendRequest(sendRequest + 1);
        })();
    }, [qb, initialized, sendRequest, trackerData]);

    const onConditionClick = (c: ConditionResponseData) => {
        setActiveCondition(c);
    };

    const objectiveData = trackerData?.objectiveData || [];

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            const val = JSON.parse(evt?.target?.result as string);
            setTrackerData({
                objectiveData: val.map(convertObjectiveRomData),
            });
            setTrackerState(ObjectiveTrackerState.FILE_SELECTED);
        };
        reader.onerror = function (evt) {
            console.error("there was an error", evt);
        };
    };

    useEffect(() => {
        const data = window.localStorage.getItem(
            `objective-tracker--last-file`
        );
        if (data) {
            convertObjectiveRomData(JSON.parse(data));
        }
    }, []);

    const startTracking = () => {
        setBeginTracking(true);
        setTrackerState(ObjectiveTrackerState.START_TRACKING);
    };

    const trackerMessage =
        trackerState === ObjectiveTrackerState.SELECT_FILE
            ? `1. Select a metadata file output by FF6WC`
            : trackerState === ObjectiveTrackerState.FILE_SELECTED
            ? `2. Select 'Begin Tracking'`
            : "";

    return (
        <>
            <div>
                <ObjectiveTrackerHeader
                    message={trackerMessage}
                    state={trackerState}
                    onBeginTracking={startTracking}
                    onFileSelect={onFileChange}
                />
            </div>
            <div>
                <Grid container className="inner-dialogue-window tracker-text">
                    {objectiveData.map((o, idx) => {
                        const bitResults = bitData;
                        const conditionData = o.conditions
                            .map(
                                // true be told i forget which one is the key here lol. Condition description is an awful prop name
                                (z) =>
                                    bitResults[z.conditionDescription || ""] ||
                                    bitResults[z.name]
                            )
                            .filter((z) => !!z);
                        const totalConditions = o.totalConditions;
                        const requiredConditions = o.requiredConditions;
                        const description = o.key;
                        const completedConditions = conditionData.reduce(
                            (acc, val) => {
                                if (val.isComplete) {
                                    return acc + 1;
                                }
                                return acc;
                            },
                            0
                        );

                        const isComplete =
                            o.requiredConditions === 0
                                ? true
                                : completedConditions / requiredConditions >= 1;

                        return (
                            <>
                                <Grid
                                    key={o.id}
                                    item
                                    className={"outer-dialogue-window"}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    style={{
                                        borderLeft: "1px solid black",
                                        borderBottom: "1px solid black",
                                        padding: 24,
                                    }}
                                    display={isComplete ? "none" : undefined}
                                >
                                    <Typography variant="h6" color="inherit">
                                        <ObjectiveTitle
                                            index={idx}
                                            completedConditions={
                                                completedConditions
                                            }
                                            name={description}
                                            requiredConditions={
                                                requiredConditions
                                            }
                                            totalConditions={totalConditions}
                                        />
                                    </Typography>
                                    {o.conditions.map((z, cidx) => (
                                        <ObjectiveCondition
                                            key={cidx}
                                            condition={z}
                                            objective={o}
                                            conditionBitResult={
                                                bitData[
                                                    z.conditionDescription as string
                                                ]
                                            }
                                            onClick={() => onConditionClick(z)}
                                        />
                                    ))}
                                </Grid>
                            </>
                        );
                    })}
                </Grid>

                <TextField
                    style={{ padding: 16 }}
                    disabled
                    multiline
                    fullWidth
                    maxRows={10}
                    rows={10}
                    value={logs.current.join("\r\n")}
                />
            </div>
        </>
    );
}

export default ObjectiveTrackerView;

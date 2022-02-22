import { TextField } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { GetSaveDataQuery } from "../queries/GetSaveDataQuery";
import { QueryBuilder } from "../tracker/QueryBuilder";
import { snesSession } from "../tracker/SnesSession";
import { sleep } from "../utils/sleep";
import "./AnguirelTracker.css";
import Check from "./Check";
import { characterChecks, GetSaveDataResponse } from "./types";
import urljoin from "url-join";
import { TrackedCharacter } from "./TrackedCharacter";
import { FF6Character, FF6Events } from "../types/ff6-types";
import { TrackedCheck } from "./TrackedCheck";
import startCase from "lodash/startCase";
import { TrackerRow } from "./TrackerRow";

type Props = Record<string, unknown>;

export function AnguirelTracker(props: Props): JSX.Element {
    const {} = props;
    const [session] = useState(snesSession);
    const [qb, setQb] = useState<QueryBuilder>();
    const [initialized, setInitialized] = useState(false);
    const [initializing, setInitializing] = useState(false);
    const [data, setData] = useState<GetSaveDataResponse | null>(null);
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
            await sleep(5000);
            setSendRequest(sendRequest + 1);
        })();
    }, [qb, initialized, sendRequest]);

    const url = (str: string) =>
        urljoin(
            "https://kielbasa.s3.us-east-2.amazonaws.com/autotracker/images",
            str
        );

    const availableChecks = useMemo(
        () =>
            (data &&
                Object.keys(data.events).map((z) => {
                    const eventName = z as keyof FF6Events;
                    return new TrackedCheck(eventName, data.events[eventName]);
                })) ||
            [],
        [data]
    );

    const characters = useMemo(() => {
        if (!data) {
            return [];
        }
        return Object.keys(data.characters).map((charName) => {
            const rawChecks =
                characterChecks[charName as keyof typeof FF6Character];
            const checks =
                availableChecks?.filter((z) => rawChecks.includes(z.key)) || [];

            return new TrackedCharacter(
                charName,
                checks,
                data.characters[charName]
            );
        });
    }, [data]);

    const charToChecks = Object.keys(characterChecks).reduce((acc, val) => {
        if (!characters) {
            return acc;
        }

        const charName = val as keyof typeof FF6Character;

        const checks = characterChecks[charName];
        const availableEvents =
            availableChecks?.filter((z) => checks.includes(z.key)) || [];

        acc.push(
            new TrackedCharacter(
                charName,
                availableEvents,
                data?.characters[val] ?? false
            )
        );

        return acc;
    }, [] as Array<TrackedCharacter>);

    const TERRA = charToChecks.find(
        (z) => z.name === "TERRA"
    ) as TrackedCharacter;
    const SETZER = charToChecks.find(
        (z) => z.name === "SETZER"
    ) as TrackedCharacter;
    const SABIN = charToChecks.find(
        (z) => z.name === "SABIN"
    ) as TrackedCharacter;
    const GAU = charToChecks.find((z) => z.name === "GAU") as TrackedCharacter;
    const CELES = charToChecks.find(
        (z) => z.name === "CELES"
    ) as TrackedCharacter;
    const EDGAR = charToChecks.find(
        (z) => z.name === "EDGAR"
    ) as TrackedCharacter;
    const SHADOW = charToChecks.find(
        (z) => z.name === "SHADOW"
    ) as TrackedCharacter;
    const LOCKE = charToChecks.find(
        (z) => z.name === "LOCKE"
    ) as TrackedCharacter;
    const CYAN = charToChecks.find(
        (z) => z.name === "CYAN"
    ) as TrackedCharacter;
    const STRAGO = charToChecks.find(
        (z) => z.name === "STRAGO"
    ) as TrackedCharacter;
    const RELM = charToChecks.find(
        (z) => z.name === "RELM"
    ) as TrackedCharacter;
    const UMARO = charToChecks.find(
        (z) => z.name === "UMARO"
    ) as TrackedCharacter;
    const MOG = charToChecks.find((z) => z.name === "MOG") as TrackedCharacter;
    const GOGO = charToChecks.find(
        (z) => z.name === "GOGO"
    ) as TrackedCharacter;

    const r1 = new TrackerRow(TERRA, SETZER);
    const r2 = new TrackerRow(SABIN, GAU);
    const r3 = new TrackerRow(CELES, EDGAR);
    const r4 = new TrackerRow(SHADOW, LOCKE);
    const r5 = new TrackerRow(CYAN, STRAGO);
    const r6 = new TrackerRow(RELM, UMARO);
    const r7 = new TrackerRow(MOG, GOGO);

    const rows = [r1, r2, r3, r4, r5, r6, r7];

    return (
        <div>
            {rows.map((z) => {
                const c1 = z.char1;
                const c2 = z.char2;
                if (!c1 || !c2) {
                    return null;
                }
                const c1name = startCase(c1?.name.toLowerCase());
                const c2name = startCase(c2?.name.toLowerCase());
                return (
                    <div>
                        <Check
                            imageUri={url(`Prt${c1name}.png`)}
                            name={c1name}
                            isChecked={c1.available}
                        />
                        {c1.checks.map((z) => {
                            return (
                                <Check
                                    imageUri={url(z.name)}
                                    name={z.name}
                                    isChecked={z.complete}
                                />
                            );
                        })}
                        <Check
                            imageUri={url(`Prt${c2name}.png`)}
                            name={c1name}
                            isChecked={c2.available}
                        />
                    </div>
                );
            })}
            <TextField
                disabled
                multiline
                fullWidth
                maxRows={10}
                rows={10}
                value={logs.current.join("\r\n")}
            />
        </div>
    );
}

export default AnguirelTracker;

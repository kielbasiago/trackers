import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TrackerHeader from "../AnguirelTracker/components/TrackerHeader";
import { getTrackerDefaults, TrackerContext } from "../AnguirelTracker/components/TrackerProvider";
import { characterNames, TrackerMode } from "../AnguirelTracker/types";
import { Tile } from "../queries/data/Tile";
import { CharacterSpriteInfoResponse, GetCharacterSpriteInfoQuery } from "../queries/GetCharacterSpriteInfoQuery";
import { GetSaveDataQuery } from "../queries/GetSaveDataQuery";
import { useTrackerSettings } from "../settings/settings";
import { QueryBuilder } from "../tracker/QueryBuilder";
import { snesSession } from "../tracker/SnesSession";
import { FF6Character } from "../types/ff6-types";
import { sleep } from "../utils/sleep";
import { useTrackerData } from "../utils/useTrackerData";
import DrawSprite from "./DrawSprite";
import clsx from "clsx";
import last from "lodash/last";
import orderBy from "lodash/orderBy";
import times from "lodash/times";
import Typography from "@mui/material/Typography";
import AnguirelTracker from "../AnguirelTracker/AnguirelTracker";

type Props = Record<string, unknown>;

const StyledContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    // align-items: flex-start;
    justify-content: center;
`;

const StyledChar = styled.div<{ active: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    ${({ active }) =>
        !active
            ? `
    opacity: 0.8;
    filter: brightness(50%) grayscale(100%);
    `
            : undefined}
`;
export function CharacterSpriteDraw(props: Props): JSX.Element {
    const [session] = useState(snesSession);
    const [qb, setQb] = useState<QueryBuilder>();
    const [initialized, setInitialized] = useState(false);
    const [initializing, setInitializing] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    const logs = useRef<Array<string>>([]);
    const [sendRequest, setSendRequest] = useState(0);
    const [____ignoreRenderVal, setRender] = useState(0);

    const [spriteData, setCharData] = useState<CharacterSpriteInfoResponse | null>(null);
    const [trackerData, setTrackerData] = useState(getTrackerDefaults());

    const { mode, background, themeMode, showHeader } = useTrackerSettings();

    const providerData = useTrackerData({
        mode,
        setTrackerData,
        trackerData,
    });
    useEffect(() => {
        if (session && !qb) {
            setQb(new QueryBuilder(session));
        }
    }, [qb, session]);

    useEffect(() => {
        if (qb && session && !initialized && !initializing && !spriteData && !loadingData) {
            void (async function () {
                session.clearLog();
                setInitializing(true);
                snesSession.setLogger((...msgs) => {
                    logs.current.push(...msgs);
                    setRender(Math.random());
                });
                await qb.connect();
                setInitialized(true);
            })();
        }
    }, [session, qb, initialized, loadingData, spriteData, initializing]);

    useEffect(() => {
        if (!qb || !initialized || spriteData || loadingData) {
            return;
        }
        setLoadingData(true);
        void (async function () {
            const result = await qb?.send(
                new GetCharacterSpriteInfoQuery().setLogger((...msgs) => {
                    logs.current.push(...msgs);
                    setRender(Math.random());
                })
            );

            setCharData(result);
        })();
    }, [qb, initialized, spriteData, loadingData]);

    useEffect(() => {
        if (!qb || !spriteData || !initialized) {
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
    }, [spriteData]);

    const getFormation = (key: FF6Character) =>
        [0, 1, 6, 7, 8, 9].map((idx) => spriteData?.portraits[key].sprite[idx]) as Array<Tile>;

    const getFormation2 = (key: FF6Character) =>
        times(50).map((idx) => spriteData?.portraits[key].sprite[idx]) as Array<Tile>;

    const charOrder = useMemo(() => {
        console.log("REFEFERERER");
        return orderBy(characterNames, (name, idx) => {
            return `${!providerData.data.characters[name as FF6Character]}${idx}`;
        });
    }, [providerData.data.characterCount > 0]);
    if (!spriteData) {
        return <></>;
    }

    return (
        <>
            <Paper style={{ height: "100%", borderRadius: 0 }}>
                <TrackerHeader />
                <TrackerContext.Provider value={providerData}>
                    <StyledContainer>
                        {charOrder.map((name, idx) => {
                            const d = providerData.data.characters[name as FF6Character];
                            const formation = getFormation2(name as FF6Character);
                            return (
                                <StyledChar active={d} key={name}>
                                    <div style={{ position: "relative" }}></div>
                                    <DrawSprite tiles={formation} key={name} proportion={2} />
                                    {session.status === "CONNECTED" || mode === TrackerMode.MANUAL ? null : (
                                        <div className="overlay overlay-background">
                                            <Typography>{last(session.logMessages)}</Typography>
                                        </div>
                                    )}
                                </StyledChar>
                            );
                        })}
                    </StyledContainer>
                </TrackerContext.Provider>

                <AnguirelTracker />
            </Paper>
        </>
    );
}

export default React.memo(CharacterSpriteDraw);

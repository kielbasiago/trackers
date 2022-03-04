import { Paper, TextField } from "@mui/material";
import flatten from "lodash/flatten";
import React, { useEffect, useRef, useState } from "react";
import { GetSaveDataQuery } from "../queries/GetSaveDataQuery";
import { useTrackerSettings } from "../settings/settings";
import { QueryBuilder } from "../tracker/QueryBuilder";
import { snesSession } from "../tracker/SnesSession";
import { FF6Character, FF6Dragon, FF6Event } from "../types/ff6-types";
import { sleep } from "../utils/sleep";

import clsx from "clsx";
import { CharacterSpriteInfoResponse, GetCharacterSpriteInfoQuery } from "../queries/GetCharacterSpriteInfoQuery";
import { Tile } from "../queries/data/Tile";
import DrawTile from "./DrawTile";
import DrawPortrait from "./DrawPortrait";

type Props = Record<string, unknown>;

export function CharacterDraw(props: Props): JSX.Element {
    const [session] = useState(snesSession);
    const [qb, setQb] = useState<QueryBuilder>();
    const [initialized, setInitialized] = useState(false);
    const [initializing, setInitializing] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    const logs = useRef<Array<string>>([]);
    const [sendRequest, setSendRequest] = useState(0);
    const [____ignoreRenderVal, setRender] = useState(0);

    const [charData, setCharData] = useState<CharacterSpriteInfoResponse | null>(null);

    useEffect(() => {
        if (session && !qb) {
            setQb(new QueryBuilder(session));
        }
    }, [qb, session]);

    useEffect(() => {
        if (qb && session && !initialized && !initializing && !charData && !loadingData) {
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
    }, [session, qb, initialized, loadingData, charData, initializing]);

    useEffect(() => {
        if (!qb || !initialized || charData || loadingData) {
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
    }, [qb, initialized, charData, loadingData]);

    useEffect(() => {}, [charData]);

    if (!charData) {
        return <></>;
    }
    return <DrawPortrait tiles={charData.portraits.terra.portrait} proportion={3} />;
}

export default React.memo(CharacterDraw);

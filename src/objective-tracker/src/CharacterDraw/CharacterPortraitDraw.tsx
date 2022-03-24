import React, { useEffect, useRef, useState } from "react";
import { CharacterPortraitInfoResponse, GetCharacterPortraitInfoQuery } from "../queries/GetCharacterPortraitInfoQuery";
import { QueryBuilder } from "../tracker/QueryBuilder";
import { snesSession } from "../tracker/SnesSession";
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

    const [charData, setCharData] = useState<CharacterPortraitInfoResponse | null>(null);

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
                new GetCharacterPortraitInfoQuery().setLogger((...msgs) => {
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
    return <DrawPortrait tiles={charData.portraits.terra.portrait} proportion={5} />;
}

export default React.memo(CharacterDraw);

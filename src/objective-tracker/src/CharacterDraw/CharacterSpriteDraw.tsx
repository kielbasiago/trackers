import times from "lodash/times";
import React, { useEffect, useRef, useState } from "react";
import { characterNames } from "../AnguirelTracker/types";
import { Tile } from "../queries/data/Tile";
import { CharacterSpriteInfoResponse, GetCharacterSpriteInfoQuery } from "../queries/GetCharacterSpriteInfoQuery";
import { QueryBuilder } from "../tracker/QueryBuilder";
import { snesSession } from "../tracker/SnesSession";
import { FF6Character } from "../types/ff6-types";
import DrawPortrait from "./DrawPortrait";
import DrawSprite from "./DrawSprite";
import PaletteDraw from "./PaletteDraw";

type Props = Record<string, unknown>;

export function CharacterSpriteDraw(props: Props): JSX.Element {
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

    const getFormation = (key: FF6Character) =>
        [0, 1, 6, 7, 8, 9].map((idx) => charData?.portraits[key].sprite[idx]) as Array<Tile>;
    if (!charData) {
        return <></>;
    }
    return (
        <>
            {characterNames.map((name, idx) => {
                const formation = getFormation(name);
                return (
                    <span>
                        <DrawSprite tiles={formation} key={name} />
                    </span>
                );
            })}
            {/* {charData.palettes.map((palette, idx) => {
                return <PaletteDraw palette={palette} key={idx.toString()} />;
            })} */}
        </>
    );
}

export default React.memo(CharacterSpriteDraw);

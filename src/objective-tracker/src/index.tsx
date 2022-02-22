import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ObjectiveTrackerView from "./ObjectiveTracker/ObjectiveTrackerView";
import App from "./App";

// STEP 1 - Include Dependencies
// Include react
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Highcharts, { Options } from "highcharts";
import addDraggablePoints from "highcharts/modules/draggable-points";
import rawdata from "./data.json";
import times from "lodash/times";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { theme } from "./theme/theme";
import ThemeProvider from "@mui/system/ThemeProvider";
import styled from "@emotion/styled";
import AnguirelTracker from "./AnguirelTracker/AnguirelTracker";

const Container = styled.div`
    .highcharts-credits {
        display: none;
    }
`;

addDraggablePoints(Highcharts);

const Test = () => {
    const [avg, setAvg] = useState(10);
    const [highest, setHighest] = useState(15);
    useEffect(() => {
        setInterval(() => {
            const val = document.getElementsByClassName("highcharts-credits");
            if (val.length) {
            }
        }, 500);
    });
    useEffect(() => {
        const XP_PER_LEVEL = 230;
        const GET_MONSTER_LEVEL = (idx: number) => Math.floor(idx * 1.5);
        const xpData = times(
            99,
            (idx) => XP_PER_LEVEL * GET_MONSTER_LEVEL(idx + 1)
        );
        const data = rawdata;
        // const data = rawdata.map((item, index) => {
        //     const previousItem = rawdata[index - 1];
        //     if (!previousItem) {
        //         return item;
        //     }
        //     return item - previousItem;
        // });
        Highcharts.chart("foobar", {
            chart: {
                animation: false,
                events: {
                    click: function (e) {
                        const event = e as any;
                        // find the clicked values and the series
                        const x = Math.round(event.xAxis[0].value);
                        const y = Math.round(event.yAxis[0].value);
                        const series = this.series[0];

                        // Add it
                        series.addPoint([x, y]);
                    },
                },
            },
            title: {
                text: "FF6 WC Exp Curve",
            },

            subtitle: {
                text: "",
            },

            yAxis: {
                type: "linear",
                allowDecimals: false,
                title: {
                    text: "Experience",
                },
            },

            xAxis: {
                floor: 1,
                ceiling: 99,
                allowDecimals: false,
                accessibility: {
                    rangeDescription: "Levels",
                },
            },

            plotOptions: {
                series: {
                    stickyTracking: false,
                    dragDrop: {
                        draggableY: false,
                        dragMaxY: 3000000,
                    },
                    events: {},
                },
                column: {
                    stacking: "normal",
                    minPointLength: 2,
                },
                line: {
                    cursor: "ns-resize",
                },
            },

            series: [
                {
                    name: "Exp needed for next level",
                    data,
                },
                // {
                //     name: "Monster Exp",
                //     data: xpData,
                // },
            ],
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 500,
                        },
                        chartOptions: {
                            legend: {
                                layout: "horizontal",
                                align: "center",
                                verticalAlign: "bottom",
                            },
                        },
                    },
                ],
            },
        } as Options);
    }, [highest, avg]);
    return (
        <>
            <Container id="foobar" />
            <TextField
                value={highest}
                label="Party Highest"
                type="number"
                onChange={(e) => {
                    setHighest(Math.floor(Number.parseFloat(e.target.value)));
                }}
            />
            <TextField
                value={avg}
                label="Party Average"
                type="number"
                onChange={(e) => {
                    setAvg(Math.floor(Number.parseFloat(e.target.value)));
                }}
            />
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ObjectiveTrackerView />} />
                    <Route path="/foo" element={<App />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/tracker" element={<AnguirelTracker />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

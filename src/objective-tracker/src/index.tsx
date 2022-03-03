import CircularProgress from "@mui/material/CircularProgress";
import Highcharts from "highcharts";
import addDraggablePoints from "highcharts/modules/draggable-points";
// STEP 1 - Include Dependencies
// Include react
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

addDraggablePoints(Highcharts);

ReactDOM.render(
    <React.StrictMode>
        <React.Suspense fallback={<CircularProgress size={20} />}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.Suspense>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

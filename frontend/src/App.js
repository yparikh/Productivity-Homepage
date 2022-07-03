import React from "react";
import Header from "./Header";
import Kanban from "./Kanban";
import Journal from "./Journal";
import {Routes, Route} from "react-router-dom";
import axios from "axios";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export default function App() {
    return (
        <div className="outerDiv">
            <Header/>
            <Routes>
                <Route path="kanban" element={< Kanban />}/>
                <Route path="journal" element={< Journal />}/>
            </Routes>
        </div>
    );
}
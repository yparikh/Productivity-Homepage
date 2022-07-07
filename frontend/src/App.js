import React from "react";
import Header from "./components/Header";
import Kanban from "./views/Kanban";
import Journal from "./views/Journal";
import {Routes, Route} from "react-router-dom";
import axios from "axios";
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import "@fontsource/jost";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export default function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <Header/>
                <Routes>
                    <Route path="kanban" element={< Kanban />}/>
                    <Route path="journal" element={< Journal />}/>
                </Routes>
            </div>
        </DndProvider>
    );
}
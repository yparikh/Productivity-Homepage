import React from "react";
import Header from "./components/Header";
import Kanban from "./views/Kanban";
import Journal from "./views/Journal";
import {Routes, Route} from "react-router-dom";
import axios from "axios";
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import "@fontsource/jost";
import {createTheme, ThemeProvider} from "@mui/material";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const fontTheme = createTheme({
    typography: {
        "fontFamily": `"Jost", "Helvetica", "Arial", sans-serif`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    }
});

export default function App() {
    return (
        <ThemeProvider theme={fontTheme}>
            <DndProvider backend={HTML5Backend}>
                <div>
                    <Header/>
                    <Routes>
                        <Route path="kanban" element={< Kanban />}/>
                        <Route path="journal" element={< Journal />}/>
                    </Routes>
                </div>
            </DndProvider>
        </ThemeProvider>
    );
}
import React, {useState} from "react";
import {Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Kanban from "./views/Kanban";
import Journal from "./views/Journal";
import axios from "axios";
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import {createTheme, ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeContext } from "./components/ColorModeContext";
import "@fontsource/jost";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export default function App() {
    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
        createTheme({
            typography: {
                "fontFamily": `"Jost", "Helvetica", "Arial", sans-serif`,
                "fontSize": 14,
                "fontWeightLight": 300,
                "fontWeightRegular": 400,
                "fontWeightMedium": 500
            },
            palette: {
            mode,
            },
        }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
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
            </ColorModeContext.Provider>
    );
}
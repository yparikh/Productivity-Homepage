import * as React from "react";
  
// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider, createTheme } from '@mui/material/styles';


let theme = createTheme({
  palette: {
    primary: {
      main: '#B32428',
    },
  },
});
  
export default function Header() {
  return (
	<ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          {/*Inside the IconButton, we 
           can render various icons*/}
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/*This is a simple Menu 
             Icon wrapped in Icon */}
            <MenuIcon />
          </IconButton>
          {/* The Typography component applies 
           default font weights and sizes */}
  
          <Typography variant="h6" 
            component="div" sx={{ flexGrow: 1 }}>
            Productivity Homepage
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
	</ThemeProvider>
  );
}
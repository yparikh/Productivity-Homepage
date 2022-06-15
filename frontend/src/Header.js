import React, { useState } from 'react';
  
// importing material UI components
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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
	const pages = ['Products', 'Pricing', 'Blog'];
	
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	  const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	  };
	  const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	  };

	  const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	  };

	  const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	  };
	
  return (
	<ThemeProvider theme={theme}>
	
      <AppBar position="static">
        <Toolbar>
          {/*Inside the IconButton, we 
           can render various icons*/}
		   <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
		  <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
			</Box>
          {/* The Typography component applies 
           default font weights and sizes */}
			<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
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
import React from 'react';
import {Link} from 'react-router-dom';
import { ColorModeContext } from './ColorModeContext';

/* importing material UI components */
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import {styled, experimental_sx as sx} from '@mui/system';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { Switch } from '@mui/material';

/* Gradient Theme for the Header */
const StyledHeader = styled(AppBar)`
  background-color: #f08080;
  background-image: linear-gradient(315deg, #ee8c68 0%, #eb6b9d 74%);
  border: 0;
  color: white;
  height: 70px;
  padding: 0 30px;
`;

const LinkButton = styled(Button)(
    sx({
        my: 2, 
        color: 'white', 
        display: 'block'
    })
);

const HeaderTypography = styled(Typography)(
    sx({
        width: '50%', 
        display: 'flex', 
        flexgrow: 1
    })
);

const LinkBox = styled(Box)(
    sx({
        justifyContent: 'flex-end',
        width: '50%',
        flexgrow: 1,
        display: {
            xs: 'none',
            md: 'flex'
        }
    })
);

export default function Header() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
        <StyledHeader position="static">
            <Toolbar>
                <HeaderTypography variant="h5" component="div">
                    Productivity Manager
                </HeaderTypography>
                <LinkBox>
                    <LinkButton component={Link} to="/kanban">
                        Kanban
                    </LinkButton>
                    <LinkButton component={Link} to="/journal">
                        Journal
                    </LinkButton>
                    <LinkButton component={Link} to="/kanban">
                        Calendar
                    </LinkButton>
                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                     </IconButton>
                </LinkBox>
            </Toolbar>
        </StyledHeader>
    );
}
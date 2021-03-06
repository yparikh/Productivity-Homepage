import React from 'react';
import {Link} from 'react-router-dom';

/* importing material UI components */
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {styled} from '@mui/system';

/* Gradient Theme for the Header */
const StyledHeader = styled(AppBar)`
  background-color: #ee8c68;
  background-image: linear-gradient(315deg, #ee8c68 0%, #eb6b9d 74%);
  border: 0;
  color: white;
  height: 70px;
  padding: 0 30px;
`;


export default function Header() {

    return (
        <StyledHeader position="static">
            <Toolbar>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                    width: '50%',
                    display: 'flex',
                    flexgrow: 1
                }}>
                    Productivity Manager
                </Typography>
                <Box
                    sx={{
                    justifyContent: 'flex-end',
                    width: '50%',
                    flexgrow: 1,
                    display: {
                        xs: 'none',
                        md: 'flex'
                    }
                }}>
                    <Button
                        component={Link}
                        to="/kanban"
                        sx={{
                        my: 2,
                        color: 'white',
                        display: 'block'
                    }}>
                        Kanban
                    </Button>
                    <Button
                        component={Link}
                        to="/journal"
                        sx={{
                        my: 2,
                        color: 'white',
                        display: 'block'
                    }}>
                        Journal
                    </Button>
                    <Button
                        component={Link}
                        to="/kanban"
                        sx={{
                        my: 2,
                        color: 'white',
                        display: 'block'
                    }}>
                        Calendar
                    </Button>
                </Box>
            </Toolbar>
        </StyledHeader>
    );
}
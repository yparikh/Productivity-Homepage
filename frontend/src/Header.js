import React from 'react';

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {styled} from '@mui/system';


//Gradient Theme for the Header
const StyledHeader = styled(AppBar)`
  background-color: #1fd1f9;
  background-image: linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 70px;
  padding: 0 30px;
`;

export default function Header() {
    const pages = ['Kanban', 'Journal', 'Calendar'];

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
                    Productivity Homepage
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
                    {pages.map((page) => (
                        <Button
                            key={page}
                            sx={{
                            my: 2,
                            color: 'white',
                            display: 'block'
                        }}>
                            {page}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </StyledHeader>
    );
}
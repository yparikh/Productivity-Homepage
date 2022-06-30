import React from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink, MemoryRouter} from 'react-router-dom';
import {StaticRouter} from 'react-router-dom/server';

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

function Router(props) {
    const {children} = props;
    if (typeof window === 'undefined') {
        return <StaticRouter location="/kanban">{children}</StaticRouter>;
    }

    return (
        <MemoryRouter initialEntries={['/kanban']} initialIndex={0}>
            {children}
        </MemoryRouter>
    );
}

Router.propTypes = {
    children: PropTypes.node
};

function ButtonLink(props) {
    const {to} = props;

    const renderLink = React.useMemo(() => React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined}/>;
    }), [to],);

    return (
        <Button
            component={renderLink}
            sx={{
            my: 2,
            color: 'white',
            display: 'block'
        }}></Button>
    );
}

ButtonLink.propTypes = {
    to: PropTypes.string.isRequired
};

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
                    <ButtonLink to={"/kanban"}>
                        Kanban
                    </ButtonLink>
                </Box>
            </Toolbar>
        </StyledHeader>
    );
}
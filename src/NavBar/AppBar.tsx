import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVrCardboard } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const pages = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'About us',
        path: '/'
    }, 
];

function ResponsiveAppBar() {
    const navigate = useNavigate();

    const handleOnClick = (path: string) => {
        navigate(path);
    };


    return (
        <AppBar position="static" style={{backgroundColor:"#3E0758"}}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <FontAwesomeIcon icon={faVrCardboard} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 6,
                ml: 1,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                VR Rehacom
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                    <Button
                    key={page.name}
                    onClick={() => handleOnClick(page.path)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page.name}
                    </Button>
                ))}
            </Box>

            </Toolbar>
        </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;

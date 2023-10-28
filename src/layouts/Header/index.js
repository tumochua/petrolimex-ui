import * as React from 'react';

import { useEffect } from 'react';
import style from './Header.module.scss'

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
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Danh Sách Nhân Viên', 'Chấm Công', 'Lương', 'Báo Cáo'];
const settings = ['Profile', 'Dashboard','Login', 'Register', 'Logout'];
function Header() {

    useEffect(() => {
        (async () => {
            // const response = await getListUsers();
            // console.log('response', response);
        })();
    }, []);

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
        <div className={style.headerWarpper}>
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                    <Avatar alt="Remy Sharp" src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/344431182_181653767765102_733030341253524066_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=KYziJqvMgLEAX9Y3Swr&_nc_ht=scontent.fhan2-3.fna&oh=00_AfBHO1tqMOGm8VNymqypc2pzM3YH76U80bNqfAyWA3O9Wg&oe=6541C45A" />
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', fontSize: '16px', } }}>
                            <IconButton

                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                                sx={{
                                    fontSize: '16px',
                                }}
                            >
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
                                    display: { xs: 'block', md: 'none', fontSize: '16px', },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" >{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                fontSize: '16px',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block', fontSize: '16px', }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, fontSize: '16px', }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px', fontSize: '16px', }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" sx={{ fontSize: '16px', }}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
    </div>
     );
}

export default Header;
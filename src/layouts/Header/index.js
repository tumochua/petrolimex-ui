import * as React from 'react';

import { useEffect, memo } from 'react';

import style from './Header.module.scss';

import { useNavigate, Link } from 'react-router-dom';


import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Cookies from 'js-cookie';
import config from '@/config';

import { apiGetProfileUser } from '@/services/apis';

// const settings = ['Profile', 'Dashboard','Login', 'Register', 'Logout'];

const menus = [
    {
        id: 1,
        name: 'Danh Sách Nhân Viên',
        role: true,
        router: config.routes.employee
    },
    {
        id: 2,
        name: "Chấm Công",
        role: false,
        router: config.routes.timekeeping
    },
    {
        id: 3,
        name: 'Lương',
        role: true,
        router: config.routes.salary
    },
    {
        id: 4,
        name: 'Báo Cáo',
        role: false,
        router: config.routes.report
    },
    {
        id: 5,
        name: 'Phân Quyền Và Chia Ca',
        role: true,
        router: config.routes.ofTheChief
    },
];

function Header() {

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [bellNoti, setBellNoTi] = React.useState(null);

    const [settings] = React.useState([
        {
            id: 1,
            name: "Profile",
            value: 'profile'
        },
        {
            id: 2,
            name: "Login",
            value: 'login'
        },
        {
            id: 3,
            name: "Register",
            value: 'register'
        },
        {
            id: 4,
            name: "Logout",
            value: 'logout'
        },
    ])


    const [isLogin, setIsLogin] = React.useState(true);
    const [refreshToken, setRefreshToken] = React.useState(null);
    const [accessToken, setAccessToken] = React.useState(null);

    const [userInfor, setUserInfor] = React.useState(null);

    // const [filterMenus, setFilterMenus] = React.useState(null)

    const navigate = useNavigate();


    useEffect(() => {
        setAccessToken(Cookies.get('accessToken'));
        setRefreshToken(Cookies.get('refreshToken'));
        if (refreshToken && accessToken) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }

    }, [accessToken, refreshToken]);


    useEffect(() => {
        // const userData = JSON.parse(localStorage.getItem('user'));
        // console.log(userData.firstName);
        const fetchUserInfo = async () => {
            const response = await apiGetProfileUser()
            // console.log(response.data.data);
            if (response.data.statusCode === 2 && response.data.data) {
                const userInfor = response.data.data
                setUserInfor(userInfor)
                // const firstName = response.data.data.firstName
            }
        }
        fetchUserInfo()
    }, [])


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (value) => {
        setAnchorElUser(null);
        const matchedSetting = settings.find(setting => setting.value === value);

        if (matchedSetting) {
            navigate(`/${value}`)
        }
    };

    const handleOpenNotification = (event) => {
        setBellNoTi(event.currentTarget);
    }

    const handleCloseBellMenu = () => {
        setBellNoTi(null);
    }

    // useEffect(() => {
    //     if (userInfor && userInfor.roleId) {
    //         if (userInfor.roleId === "R1" || userInfor.roleId === "R2") {
    //             setFilterMenus(menus)
    //         } else {
    //             const result = menus.filter(item => item.role === false)
    //             setFilterMenus(result)
    //         }
    //     }
    // }, [userInfor])


    const handleBtnLogin = () => {
        navigate(config.routes.login)
    }

    const handleBackHome = () => {
        navigate(config.routes.home)
    }

    return (
        <div className={style.headerContainer}>


            <div className={style.headerLeft}>
                <Avatar alt="Remy Sharp"
                    src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/344431182_181653767765102_733030341253524066_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=KYziJqvMgLEAX9Y3Swr&_nc_ht=scontent.fhan2-3.fna&oh=00_AfBHO1tqMOGm8VNymqypc2pzM3YH76U80bNqfAyWA3O9Wg&oe=6541C45A"
                    sx={{ cursor: "pointer" }}
                    onClick={handleBackHome}
                />
                {
                    isLogin ?
                        <ul className={style.headerMenus}>
                            {
                                menus && menus.map((menu) => {
                                    if (menu.role && userInfor && userInfor.roleId === 'R0') {
                                        return null; // Nếu menu có role true và roleId là R0, không render menu này
                                    }
                                    return (
                                        <li key={menu.id} className={style.headerMenuItem}>
                                            <Link to={menu.router} key={menu.id} className={style.headerMenuItem}>
                                                <span>{menu.name}</span>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        : <React.Fragment></React.Fragment>
                }
            </div>
            <div>
                {
                    isLogin ?
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip>
                                <div className={style.headerInfor}>
                                    <div className={style.notificationCtn} onClick={handleOpenNotification}>
                                        <i className="fa-solid fa-bell"></i>
                                        <span className={style.bellSize}>1</span>
                                    </div>
                                    <Menu
                                        sx={{ mt: '45px', fontSize: '16px', }}
                                        id="menu-appbar"
                                        anchorEl={bellNoti}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(bellNoti)}
                                        onClose={handleCloseBellMenu}
                                        disableScrollLock={true}
                                    >
                                        <MenuItem onClick={handleCloseBellMenu} sx={{ fontSize: '16px', }}>My account</MenuItem>
                                    </Menu>

                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, fontSize: '16px', }}>
                                        <div className={style.firstName}>
                                            {userInfor && userInfor.firstName}
                                        </div>
                                    </IconButton>

                                </div>
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
                                disableScrollLock={true}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting.id} onClick={() => handleCloseUserMenu(setting.value)}>
                                        <Typography textAlign="center" sx={{ fontSize: '16px', }}>{setting.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>

                        </Box>
                        : <button className={style.btnLogin} onClick={handleBtnLogin}>Login</button>
                }
            </div>
        </div>
    );
}

export default React.memo(Header);
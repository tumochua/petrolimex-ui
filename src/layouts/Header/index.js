import * as React from 'react';
import { useEffect } from 'react';

import style from './Header.module.scss';
import { useNavigate, Link, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'js-cookie';
import config from '@/config';
import images from '@/assets/images';

import { apiGetProfileUser, apiGetAllNotification } from '@/services/apis';

const menus = [
    {
        id: 1,
        name: 'Danh Sách Nhân Viên',
        allowRoles: ['R1', 'R2'],
        router: config.routes.employee
    },
    {
        id: 2,
        name: "Chấm Công",
        allowRoles: ['R1', 'R2', 'R0'],
        router: config.routes.timekeeping
    },
    {
        id: 3,
        name: 'Lương',
        allowRoles: ['R1', 'R2', 'R0'],
        router: config.routes.salary
    },
    {
        id: 4,
        name: 'Báo Cáo',
        allowRoles: ['R1', 'R2', 'R0'],
        router: config.routes.report
    },
    {
        id: 5,
        name: 'Phân Quyền Và Chia Ca',
        allowRoles: ['R1', 'R2'],
        router: config.routes.ofTheChief,
        getName: (roleId) => {
            if (roleId === 'R2') return 'Phân Quyền';
            if (roleId === 'R1') return 'Chia Ca';
            return 'Phân Quyền Và Chia Ca';
        }
    },
    {
        id: 6,
        name: 'Danh sách ca làm',
        allowRoles: ['R1'],
        router: config.routes.listShift
    },
    {
        id: 7,
        name: 'Doanh số',
        allowRoles: ['R2'],
        router: config.routes.sales
    },
];

function Header() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [bellNoti, setBellNoTi] = React.useState(null);
    const [settings] = React.useState([
        { id: 1, name: "Profile", value: 'profile' },
        { id: 2, name: "Login", value: 'login' },
    ]);
    const [isLogin, setIsLogin] = React.useState(true);
    const [refreshToken, setRefreshToken] = React.useState(null);
    const [accessToken, setAccessToken] = React.useState(null);
    const [userInfor, setUserInfor] = React.useState(null);
    const [listNotification, setListNotification] = React.useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        try {
            (async () => {
                const response = await apiGetAllNotification();
                if (response?.data?.statusCode === 2) {
                    setListNotification(response?.data?.message);
                }
            })();
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        const access = Cookies.get('accessToken');
        const refresh = Cookies.get('refreshToken');
        setAccessToken(access);
        setRefreshToken(refresh);
        setIsLogin(!!(access && refresh));
    }, []);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await apiGetProfileUser();
            if (response.data.statusCode === 2 && response.data.data) {
                setUserInfor(response.data.data);
            }
        };
        fetchUserInfo();
    }, []);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (value) => {
        setAnchorElUser(null);
        const matchedSetting = settings.find(setting => setting.value === value);
        if (matchedSetting) {
            navigate(`/${value}`);
        }
    };

    const handleOpenNotification = (event) => {
        setBellNoTi(event.currentTarget);
    };

    const handleCloseBellMenu = () => {
        setBellNoTi(null);
    };

    const handleBtnLogin = () => {
        navigate(config.routes.login);
    };

    const handleBackHome = () => {
        navigate(config.routes.home);
    };

    const roleId = JSON.parse(localStorage.getItem('roleId'));

    return (
        <div className={style.headerContainer}>
            <div className={style.headerLeft}>
                <Avatar
                    alt="Logo"
                    src={images.logo}
                    sx={{ cursor: "pointer" }}
                    onClick={handleBackHome}
                />
                {isLogin &&
                    <ul className={style.headerMenus}>
                        {menus.map((menu) => {
                            if (!menu.allowRoles.includes(roleId)) return null;
                            const displayName = typeof menu.getName === 'function'
                                ? menu.getName(roleId)
                                : menu.name;

                            const isActive = location.pathname === menu.router;


                            return (
                                <li key={menu.id}>
                                    <Link
                                        to={menu.router}
                                        className={`${style.headerMenuItem} ${isActive ? style.active : ''}`}
                                    >
                                        <span>{displayName}</span>
                                    </Link>
                                </li>

                            );
                        })}
                    </ul>
                }
            </div>
            <div>
                {isLogin ? (
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip>
                            <div className={style.headerInfor}>
                                {/* <div className={style.notificationCtn} onClick={handleOpenNotification}>
                                    <i className="fa-solid fa-bell"></i>
                                    <span className={style.bellSize}>1</span>
                                </div> */}
                                <Menu
                                    sx={{ mt: '45px', fontSize: '16px' }}
                                    id="menu-appbar"
                                    anchorEl={bellNoti}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    keepMounted
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    open={Boolean(bellNoti)}
                                    onClose={handleCloseBellMenu}
                                    disableScrollLock={true}
                                >
                                    {listNotification && listNotification.map((notification) => (
                                        <MenuItem
                                            onClick={handleCloseBellMenu}
                                            sx={{
                                                fontSize: '16px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start'
                                            }}
                                            key={notification?.id}
                                        >
                                            <h2>{notification?.title}</h2>
                                            <p>{notification?.content}</p>
                                        </MenuItem>
                                    ))}
                                </Menu>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, fontSize: '16px' }}>
                                    <div className={style.firstName}>
                                        {userInfor && userInfor.firstName}
                                    </div>
                                </IconButton>
                            </div>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px', fontSize: '16px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            disableScrollLock={true}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting.id}
                                    onClick={() => handleCloseUserMenu(setting.value)}
                                >
                                    <Typography textAlign="center" sx={{ fontSize: '16px' }}>
                                        {setting.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                ) : (
                    <button className={style.btnLogin} onClick={handleBtnLogin}>Login</button>
                )}
            </div>
        </div>
    );
}

export default React.memo(Header);

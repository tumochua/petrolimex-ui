/* eslint-disable no-fallthrough */
import { useState, useEffect } from 'react';
import { Outlet, Navigate, redirect } from 'react-router-dom';
import config from '@/config';
import Cookies from 'js-cookie';
import { apiGetProfileUser } from '@/services/apis';
// import { useContextStore } from '@/context';
function ProtectedRouter({ route }) {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    const isLogin = accessToken && refreshToken;
    const [role, setRole] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await apiGetProfileUser()
            // console.log(response);
            if (response.data.statusCode === 2 && response.data.data.roleId) {
                setRole(response.data.data.roleId)
            }
        })()
    }, [role])
    if (role) {
        const roleAdmin = role === 'R2';
        const roleOfTheChief = role === 'R1';
        const roleAdminAndOfTheChief = role === "R1" || role === "R2"
        // console.log("roleAdminAndOfTheChief", roleAdminAndOfTheChief);
        // console.log('role', role, route.role);
        // console.log("roleAdmin", roleAdmin);
        // console.log('roleOfTheChief', roleOfTheChief);
        // console.log(route);
        if (roleAdmin) {
            return role === 'R2' ? <Outlet /> : <Navigate to={config.routes.home} />;
        }
        if (roleOfTheChief) {
            if (route.role === 'admin') {
                return <Navigate to={config.routes.home} />;
            }
            return <Outlet />;
        }
        if (roleAdminAndOfTheChief) {
            return <Outlet />
        }

        if (route.role === null) {
            return <Outlet />
        }

        if (!roleAdmin && !roleOfTheChief) {
            // console.log('test');
            // return redirect("/")
            return <Navigate to={config.routes.home} />;
        } else {
            return <Outlet />
        }
    }
    return isLogin ? <Outlet /> : <Navigate to={config.routes.login} />;
    // if (!isLogin) {
    //     return <Outlet />;
    // } else {
    //     console.log("User is not logged in");
    //     return <Navigate to={config.routes.login} />;
    // }

}

export default ProtectedRouter;

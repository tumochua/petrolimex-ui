/* eslint-disable no-fallthrough */
// import { useState, useEffect } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
// import config from '@/config';
// import Cookies from 'js-cookie';
// import { useContextStore } from '@/context';
function ProtectedRouter({ route }) {
    return (
        <div>ProtectedRouter</div>
    )
    // const [state] = useContextStore();
    // // const navigate = useNavigate();
    // const [role, setRole] = useState(null);
    // useEffect(() => {
    //     if (state.userInfor && state.userInfor.data) {
    //         setRole(state.userInfor.data.roleId);
    //     }
    // }, [state]);
    // const accessToken = Cookies.get('accessToken');
    // const refreshToken = Cookies.get('refreshToken');
    // const isLogin = !accessToken || !refreshToken;
    // console.log(route);
    // console.log(role);
    // if (route.isRole) {
    //     // console.log('admin');
    //     if (role) {
    //         const isRole = role === 'R5' || role === 'R4' || role === 'R3';
    //         return isRole ? <Outlet /> : <Navigate to={config.routes.profilePersonalInfo} />;
    //     }
    // }
    // if (route.isRole || route.isTeacher) {
    //     // console.log('teacher');
    //     if (role) {
    //         const isRole = role === 'R5' || role === 'R4' || role === 'R3' || role === 'R2';
    //         // console.log(isRole);
    //         return isRole ? <Outlet /> : <Navigate to={config.routes.profilePersonalInfo} />;
    //     }
    // }

    // return !isLogin ? <Outlet /> : <Navigate to={config.routes.login} />;
}

export default ProtectedRouter;

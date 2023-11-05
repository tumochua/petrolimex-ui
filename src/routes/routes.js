import config from '@/config';

import Home from '@/pages/Home/index';
import Login from '@/pages/Login/index';
import Register from '@/pages/Register/index';

import NotFound from '@/pages/NotFound';

import DefaultLayout from '@/layouts/DefaultLayout';

import Profile from '@/pages/Profile';
import Admin from '@/pages/Admin';
import OfTheChief from '@/pages/OfTheChief';
import Employee from '@/pages/Employee';
import Timekeeping from '@/pages/Timekeeping';
import Salary from '@/pages/Salary';
import Report from '@/pages/Report';
import EditUsers from '@/pages/EditUsers'

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.notFound, component: NotFound, layout: null },
    // { path: '/leanRedux', component: LeanRedux },
];

const privateRoutes = [
    {
        id: 1,
        path: config.routes.profile,
        component: Profile,
        layout: null,
        role: null
    },
    {
        id: 2,
        path: config.routes.admin,
        component: Admin,
        layout: null,
        role: 'admin',
        isRole: true,
    },
    {
        id: 3,
        path: config.routes.ofTheChief,
        component: OfTheChief,
        layout: null,
        role: 'OfTheChief',
        isRole: true,
    },
    {
        id: 4,
        path: config.routes.employee,
        component: Employee,
        layout: null,
        role: ["admin", 'OfTheChief'],
        isRole: true,
    },
    {
        id: 5,
        path: config.routes.timekeeping,
        component: Timekeeping,
        layout: null,
        role: null,
        isRole: true,
    },
    {
        id: 6,
        path: config.routes.salary,
        component: Salary,
        layout: null,
        role: null,
        isRole: true,
    },
    {
        id: 7,
        path: config.routes.report,
        component: Report,
        layout: null,
        role: null,
        isRole: true,
    },
    {
        id: 8,
        path: config.routes.editUser,
        component: EditUsers,
        layout: null,
        role: null,
        isRole: true,
    },
]

export { publicRoutes, privateRoutes };

import config from '@/config';

import Home from '@/pages/Home/index';
import Login from '@/pages/Login/index';
import Register from '@/pages/Register/index';

import NotFound from '@/pages/NotFound';

import DefaultLayout from '@/layouts/DefaultLayout';

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },

    { path: config.routes.notFound, component: NotFound, layout: null },
    // { path: '/leanRedux', component: LeanRedux },
];

const privateRoutes = [
    // {
    //     id: 1,
    //     path: config.routes.profile,
    //     component: Profile,
    //     icon: 'fa-solid fa-house',
    //     name: 'Navbar.home',
    //     layout: DefaultHeaderProfile,
    // },
]

export { publicRoutes, privateRoutes };

import config from '@/config';

export const MENUS = [
    {
        id: 1,
        value: 'edit',
        text: 'Blog.edit',
        icon: 'fa-solid fa-pen',
    },
    {
        id: 2,
        value: 'delete',
        text: 'Blog.delete',
        icon: 'fa-solid fa-trash',
    },
];

export const optionGender = [
    {
        id: 1,
        value: 'M',
        name: 'Profile.male',
    },
    {
        id: 2,
        value: 'F',
        name: 'Profile.female',
    },
    {
        id: 3,
        value: 'O',
        name: 'Profile.other',
        // selected: true,
    },
];

export const optionClass = [
    {
        id: 1,
        name: '--- Chọn tùy chọn của bạn ---',
        value: '',
    },
    {
        id: 2,
        name: 'BK06-K14',
        value: 'BK06',
    },
    {
        id: 3,
        name: 'BK07-K14',
        value: 'BK07',
    },
    {
        id: 4,
        name: 'BK08-K14',
        value: 'BK08',
    },
];

export const HEADERMANAGE = [
    {
        id: 1,
        name: 'Student',
        router: config.routes.manageStudent,
        icon: 'fa-solid fa-school',
    },
    {
        id: 2,
        name: 'Posts',
        router: config.routes.managePost,
        icon: 'fa-solid fa-signs-post',
    },
    {
        id: 3,
        name: 'Teacher',
        router: config.routes.manageTeach,
        icon: 'fa-solid fa-chalkboard-user',
    },
    {
        id: 4,
        name: 'Class',
        router: config.routes.manageSystem,
        icon: 'fa-solid fa-landmark',
    },
];

export const ALLCOURSE = [
    {
        id: 1,
        name: 'K1',
        class: [
            {
                id: 1,
                name: 'BK-01',
            },
            {
                id: 2,
                name: 'BK-02',
            },
            {
                id: 3,
                name: 'BK-03',
            },
        ],
    },
    {
        id: 2,
        name: 'K2',
        class: [
            {
                id: 1,
                name: 'BK-01',
            },
            {
                id: 2,
                name: 'BK-02',
            },
            {
                id: 3,
                name: 'BK-03',
            },
        ],
    },
    {
        id: 3,
        name: 'K3',
        class: [
            {
                id: 1,
                name: 'BK-01',
            },
            {
                id: 2,
                name: 'BK-02',
            },
            {
                id: 3,
                name: 'BK-03',
            },
        ],
    },
    {
        id: 4,
        name: 'K4',
        class: [
            {
                id: 1,
                name: 'BK-01',
            },
            {
                id: 2,
                name: 'BK-02',
            },
            {
                id: 3,
                name: 'BK-03',
            },
        ],
    },
    {
        id: 5,
        name: 'K5',
        class: [
            {
                id: 1,
                name: 'BK-01',
            },
            {
                id: 2,
                name: 'BK-02',
            },
            {
                id: 3,
                name: 'BK-03',
            },
        ],
    },
    {
        id: 6,
        name: 'K6',
        class: [
            {
                id: 1,
                name: 'BK-01',
            },
            {
                id: 2,
                name: 'BK-02',
            },
            {
                id: 3,
                name: 'BK-03',
            },
        ],
    },
];
export const ROLEDATA = [
    {
        id: 1,
        name: 'Student',
        value: 'R0',
    },
    {
        id: 2,
        name: 'Class Staff',
        value: 'R1',
    },
    {
        id: 3,
        name: 'Teacher',
        value: 'R2',
    },
    {
        id: 4,
        name: 'Leader',
        value: 'R3',
    },
    {
        id: 5,
        name: 'Principal',
        value: 'R4',
    },
    {
        id: 6,
        name: 'Admin',
        value: 'R5',
    },
];

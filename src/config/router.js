const routes = {
    home: '/',
    login: '/login',
    register: '/register',
    translate: '/translate',

    /// profile
    profilePersonalInfo: '/profile/personalinfo',
    managePosts: '/managePosts',
    profileFamilyInfo: '/profile/familyinfo',
    profileProctorDetails: '/profile/proctordetails',
    profileHostelDetails: '/profile/hosteldetails',
    blog: '/new-blog',
    detailPost: '/detail-post',
    approve: '/approve',
    teacher: '/teacher',
    manages: '/manages',
    manage: '/manage',
    manageStudent: '/manage-student',
    manageTeach: '/manage-teach',
    managePost: '/manage-posts',
    manageSystem: '/manage-system',

    // detailPost: '/detail-post/:id',

    // editUser: '/eidt-user/:id',
    editUser: '/eidt-user',
    notification: '/notification',
    share: '/share',
    post: '/post/page:id',
    editPosts: '/edit-posts/:id',

    /// manage
    editUserManage: '/manage-edit-user',
    detailUserManage: '/manage-detail-user',

    /// not found
    notFound: '*',
};

export default routes;

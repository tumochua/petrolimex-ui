import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { apiGetUserById, apiEditUserById } from '@/services/apis';

import style from './EditUsers.module.scss'
import config from '@/config';

function EditUsers() {
    const routerData = useLocation();
    const navigate = useNavigate()

    const [userId, setUserId] = useState(null)
    const [userData, setUserData] = useState(null)
    const [inputUser, setInputUser] = useState(null)


    useEffect(() => {
        setInputUser({
            userId: routerData.state?.id || '',
            firstName: userData?.firstName || '',
            lastName: userData?.lastName || '',
            address: userData?.address || '',
            dob: userData?.dob || '',
            gender: userData?.gender || '',
            education: userData?.education || '',
            home_town: userData?.home_town || '',
            nation: userData?.nation || '',
            mobile: userData?.mobile || '',
            cccd: userData?.cccd || ''
        });
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform the submission or any other action here using inputUser state
        // console.log(inputUser);
        const response = await apiEditUserById(inputUser)
        console.log(response);
        if (response?.data?.statusCode === 2) {
            navigate(config.routes.employee)
        }
    };

    useEffect(() => {
        setUserId(routerData.state?.id);
    }, [])

    useEffect(() => {

        (async () => {
            if (userId) {
                const response = await apiGetUserById(userId)
                if (response?.data?.statusCode === 2) {
                    setUserData(response?.data.data);
                }
            }
        })()
    }, [userId])


    return (
        <div className={style.container}>
            <h1 className={style.title}>Edit User</h1>
            <div className={style.editForm}>
                <form className={style.formLogin} onSubmit={handleSubmit}>
                    <div className={style.formGroup}>
                        <span>Tên</span><br />
                        <input type="text" placeholder="Tên..." className={style.inputLogin}
                            onChange={handleInputChange}
                            name='firstName'
                            value={inputUser?.firstName || ''} />
                        {/* <p className={style.errorReport}>{errors.firstName?.message}</p> */}
                    </div>
                    <div className={style.formGroup}>
                        <span>Họ</span><br />
                        <input type="text" placeholder="Họ..."
                            value={inputUser?.lastName || ''}
                            name='lastName'
                            className={style.inputLogin}
                            onChange={handleInputChange} />
                        {/* <p className={style.errorReport}>{errors.firstName?.message}</p> */}
                    </div>
                    <div className={style.formGroup}>
                        <span>Địa Chỉ</span><br />
                        <input type="text" placeholder="Địa chỉ..."
                            name='address'
                            value={inputUser?.address || ''}
                            className={style.inputLogin}
                            onChange={handleInputChange} />
                        {/* <p className={style.errorReport}>{errors.firstName?.message}</p> */}
                    </div>
                    <div className={style.formGroup}>
                        <span>Năm Sinh</span><br />
                        <input type="text" placeholder="Năm Sinh..."
                            value={inputUser?.dob || ''}
                            name='dob'
                            className={style.inputLogin}
                            onChange={handleInputChange} />
                        {/* <p className={style.errorReport}>{errors.firstName?.message}</p> */}
                    </div>
                    <div className={style.formGroup}>
                        <span>Giới Tính</span><br />
                        <input type="text" placeholder="Giới Tính..."
                            name='gender'
                            value={inputUser?.gender || ''}
                            className={style.inputLogin}
                            onChange={handleInputChange} />
                        {/* <p className={style.errorReport}>{errors.firstName?.message}</p> */}
                    </div>
                    <div className={style.formGroup}>
                        <span>Học Vấn</span><br />
                        <input type="text" placeholder="Học Vấn..."
                            name='education'
                            value={inputUser?.education || ''}
                            className={style.inputLogin}
                            onChange={handleInputChange} />
                        {/* <p className={style.errorReport}>{errors.firstName?.message}</p> */}
                    </div>
                    <div className={style.formGroup}>
                        <span>Quê Quán</span><br />
                        <input type="text" placeholder="Quê Quán..."
                            name='home_town'
                            value={inputUser?.home_town || ''}
                            className={style.inputLogin}
                            onChange={handleInputChange} />
                        {/* <p className={style.errorReport}>{errors.firstName?.message}</p> */}
                    </div>
                    <div className={style.formGroup}>
                        <span>Số Điện Thoại</span><br />
                        <input type="text" placeholder="Số Điện Thoại..."
                            name='mobile'
                            value={inputUser?.mobile || ''}
                            className={style.inputLogin}
                            onChange={handleInputChange} />
                        {/* <p className={style.errorReport}>{errors.firstName?.message}</p> */}
                    </div>
                    <div className={style.formGroup}>
                        <span>Quốc Gia</span><br />
                        <input type="text" placeholder="Quốc Gia..."
                            name='nation'
                            value={inputUser?.nation || ''}
                            className={style.inputLogin}
                            onChange={handleInputChange} />
                        {/* <p className={style.errorReport}>{errors.firstName?.message}</p> */}
                    </div>
                    <div className={style.formGroup}>
                        <span>Căn Cước</span><br />
                        <input type="text" placeholder="Căn Cước..."
                            name='cccd'
                            value={inputUser?.cccd || ''}
                            className={style.inputLogin}
                            onChange={handleInputChange} />
                        {/* <p className={style.errorReport}>{errors.firstName?.message}</p> */}
                    </div>

                    <input type="submit" value="Sửa" className={style.submitBtn} />

                </form>
            </div>
        </div>
    );
}

export default EditUsers;
import { useEffect, useState } from "react";
import { apiGetProfileUser } from "@/services/apis";
import Header from "@/layouts/Header";

import style from './Profile.module.scss'


function Profile() {
    const [useData, setUserData] = useState(null)
    const [reload, setReload] = useState(false)
    // console.log(localStorage.getItem('user'));
    useEffect(() => {
        // console.log('test');
        (async () => {
            const response = await apiGetProfileUser()
            console.log(response);
            setUserData(response?.data?.data)
            console.log(reload);
        })()
    }, [reload])

    useEffect(() => {
        setReload(true)
    }, [])


    return (
        <>
            <Header />

            <div className={style.container}>
                <div className={style.useProfile}>
                    <div className={style.bodyProfile}>
                        <div className={style.bodyProfileLeft}>
                            <div className={style.header}>
                                <h1>{`${useData?.lastName} ${useData?.firstName}`}</h1>
                            </div>
                            <div>Email: {useData?.email}</div>
                            <div>Địa chỉ: {useData?.address || "chưa có thông tin"}</div>
                            <div>Căn cước: {useData?.cccd || "chưa có thông tin"}</div>
                            <div>Năm sinh: {useData?.dob || "chưa có thông tin"}</div>
                            <div>Học vấn: {useData?.education || "chưa có thông tin"}</div>
                            <div>Giới tinh: {useData?.gender || "chưa có thông tin"}</div>
                            <div>Số điện thoại: {useData?.mobile || "chưa có thông tin"}</div>
                            <div>Quốc gia: {useData?.nation || "chưa có thông tin"}</div>
                            <div>Quyền: {useData?.roleData?.role_name || "chưa có thông tin"}</div>
                        </div>
                        {useData?.roleData?.roleId === "R0" ?
                            <div className={style.bodyProfileRight}>
                                <h2>Thông Tin Ca Làm</h2>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời Gian</th>
                                        </tr>
                                        {

                                            useData?.shiftData.map((shifr, index) => {
                                                return (
                                                    <tr key={shifr.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{shifr.time}</td>
                                                    </tr>
                                                )
                                            })

                                        }
                                    </tbody>

                                </table>
                            </div>
                            : null

                        }
                    </div>

                </div>
            </div>
        </>
    );
}


export default Profile;

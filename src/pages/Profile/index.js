import { useEffect, useState } from "react";
import { apiGetProfileUser } from "@/services/apis";
import Header from "@/layouts/Header";
import style from './Profile.module.scss';

function Profile() {
    const [useData, setUserData] = useState(null);
    const [reload, setReload] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc'); // Đặt mặc định là 'asc'

    useEffect(() => {
        (async () => {
            const response = await apiGetProfileUser();
            setUserData(response?.data?.data);
        })();
    }, [reload]);

    useEffect(() => {
        setReload(true);
    }, []);

    const handleSort = () => {
        const sortedData = [...useData?.shiftData].sort((a, b) => {
            if (sortOrder === 'asc') {
                return new Date(a.time) - new Date(b.time);
            } else {
                return new Date(b.time) - new Date(a.time);
            }
        });

        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setUserData(prevData => ({ ...prevData, shiftData: sortedData }));
    };

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
                            <div>Giới tính: {useData?.gender || "chưa có thông tin"}</div>
                            <div>Số điện thoại: {useData?.mobile || "chưa có thông tin"}</div>
                            <div>Quốc gia: {useData?.nation || "chưa có thông tin"}</div>
                            <div>Quyền: {useData?.roleData?.role_name || "chưa có thông tin"}</div>
                        </div>
                        {useData?.roleData?.roleId === "R0" ? (
                            <div className={style.bodyProfileRight}>
                                <h2>Thông Tin Ca Làm</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>
                                                Ngày Ngày <i className={`${style.iconSort} fa-solid fa-sort`} onClick={handleSort}></i>
                                            </th>
                                            <th>Ca làm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {useData?.shiftData.map((shifr, index) => (
                                            <tr key={shifr.id}>
                                                <td>{index + 1}</td>
                                                <td>{shifr?.time}</td>
                                                <td>
                                                    {shifr?.shift === "Sáng" && "Sáng (6h - 14h)"}
                                                    {shifr?.shift === "Chiều" && "Chiều (14h - 22h)"}
                                                    {shifr?.shift === "Tối" && "Tối (22h - 6h sáng hôm sau)"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;

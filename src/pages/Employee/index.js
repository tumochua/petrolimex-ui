import Header from "@/layouts/Header";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getListUsers } from "@/services/apis";

import style from './Employee.module.scss'
import { Button } from "@mui/material";
import config from "@/config";


function Employee() {

    const navigate = useNavigate();

    const [allUser, setAllUser] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await getListUsers();
            const result = response?.data?.data
            console.log(result);
            setAllUser(result)
        })()
    }, [])

    const handleCreateUser = () => {
        navigate(config.routes.register)
    }

    return (
        <>
            <Header />
            <div className={style.container}>
                <Button variant="contained" disableElevation size="large" sx={{ fontSize: '18px' }} onClick={handleCreateUser}>Tạo Nhân Viên</Button>
                <h1 className={style.title}>Danh Sách Nhân Viên</h1>
                <table className={style.customers}>
                    <tbody>
                        <tr>
                            <th>Mã Nhân Viên</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Năm Sinh</th>
                            <th>Giới Tính</th>
                            <th>Quê Quán</th>
                            <th>Căn Cước</th>
                            <th>Dân Tộc</th>
                            <th>Học Vấn</th>
                            <th>Chức Vụ</th>
                            <th>Actions</th>
                        </tr>
                        {allUser && allUser.map(user => (
                            <tr key={user.id}>
                                <td>Nhân Viên : {user.id}</td>
                                <td>{`${user.lastName} ${user.firstName}`}</td>
                                <td>{user.email || "Chưa có thông tin"}</td>
                                <td>{user.dob || "Chưa có thông tin"}</td>
                                <td>{user.gender || "Chưa có thông tin"}</td>
                                <td>{user.home_town || "Chưa có thông tin"}</td>
                                <td>{user.cccd || "Chưa có thông tin"}</td>
                                <td>{user.nation || "Chưa có thông tin"}</td>
                                <td>{user.education || "Chưa có thông tin"}</td>
                                <td>{user?.roleData?.role_name || "Chưa có thông tin"}</td>
                                <td className={style.btnAction}>
                                    <Button variant="contained">Sửa</Button>
                                    <Button variant="outlined" color="error">
                                        Xóa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Employee;
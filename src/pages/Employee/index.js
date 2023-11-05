import { useEffect, useState } from "react";
import Header from "@/layouts/Header";

import { useNavigate } from "react-router-dom";

import { getListUsers } from "@/services/apis";

import style from './Employee.module.scss'
import { Button } from "@mui/material";
import Box from '@mui/material/Box';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from '@mui/material/Modal';
import config from "@/config";

import { apiGetProfileUser, apiCreateNotification, apiDeletUser } from "@/services/apis";

function Employee() {

    const navigate = useNavigate();

    const [allUser, setAllUser] = useState(null)
    const [openModalType, setOpenModalType] = useState(null)
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState(null)

    const schema = yup.object().shape({
        title: yup.string().required("Title is Required!"),
        content: yup.string().required("Content is Required!"),

    });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });



    const onSubmit = async (data) => {
        if (data) {
            reset()
            const response = await apiCreateNotification(data)
            setOpen(false);
            if (response.data.statusCode === 2) {
                toast.success("Tạo thông báo thành công", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }


        }
    };
    useEffect(() => {
        (async () => {
            const response = await getListUsers();
            const result = response?.data?.data
            // console.log(result);
            setAllUser(result)
        })()
    }, [])
    useEffect(() => {
        (async () => {
            const response = await apiGetProfileUser()
            const result = response?.data?.data
            if (result) {
                setUserData(response?.data?.data);

            }
        })()
    }, [])

    const handleCreateUser = () => {
        navigate(config.routes.register)
    }

    const handleOpen = (type) => {
        if (userData && userData?.roleId !== "R2") {
            toast.warn("Bạn Không Có Quyền Tạo Thông Báo", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            setOpen(true);
        }
        setOpenModalType(type);
    }
    const handleClose = () => setOpen(false);

    const handleDeleUser = async (userId, roleId) => {
        if (userData && userData.id === userId) {
            toast.warn("Bạn Không Thể Xóa Chính Mình", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else if (userData?.roleId === 'R1' && roleId === "R2") {
            toast.error("Bạn Không Thể Xóa Người Có Quyền Lơn Hơn Mình", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        } else {
            const response = await apiDeletUser(userId);
            if (response?.data?.statusCode === 2) {
                toast.success("Xóa Người Dùng Thành Công", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            }
        }

    }

    const handleEditUser = (userId) => {
        // // { state: { id: userId }
        // console.log(userId);
        navigate(config.routes.editUser, { state: { id: userId } })
    }



    return (
        <>
            <Header />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className={style.container}>

                <div className={style.headerEmployee}>
                    <Button variant="contained" disableElevation size="large" sx={{ fontSize: '18px' }} onClick={handleCreateUser}>Tạo Nhân Viên</Button>
                    <Button variant="contained" disableElevation size="large" sx={{ fontSize: '18px' }} onClick={() => handleOpen('notification')}>Tạo Thông Báo</Button>
                </div>
                <div>
                    <Modal
                        open={open}
                        // onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 700,
                            bgcolor: 'background.paper',
                            // border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: '5px'
                        }}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={style.formGroup}>
                                    <span>Tiêu Đề</span><br />
                                    <input
                                        className={style.inputNoti}
                                        placeholder="tiêu đề" {...register("title")}
                                    />
                                    <p className={style.errorNoti}>{errors.title?.message}</p>
                                </div>
                                <div className={style.formGroup}>
                                    <span>Nội Dung</span><br />
                                    <textarea className={style.inputNoti} placeholder="Nội dung" {...register("content")} />
                                    <p className={style.errorNoti}>{errors.content?.message}</p>
                                </div>
                                <div className={style.modalFooter}>
                                    <input type="submit" value="Tạo" className={style.inputSubmit} />
                                    <Button variant="outlined" color="error" size="small" sx={{ fontSize: '15px' }} onClick={handleClose}>Hủy</Button>
                                </div>
                            </form>
                        </Box>
                    </Modal>
                </div>
                <h1 className={style.title}>Danh Sách Nhân Viên</h1>
                <table className={style.customers}>
                    <tbody>
                        <tr>
                            <th>Mã Nhân Viên</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Năm Sinh</th>
                            <th>Địa Chỉ</th>
                            <th>Giới Tính</th>
                            <th>Quê Quán</th>
                            <th>Căn Cước</th>
                            <th>Quốc Gia</th>
                            <th>Học Vấn</th>
                            <th>Chức Vụ</th>
                            <th>Actions</th>
                        </tr>
                        {allUser && allUser.map(user => (
                            <tr key={user.id}>
                                <td>Mã Nhân Viên : {user.id}</td>
                                <td>{`${user.lastName} ${user.firstName}`}</td>
                                <td>{user.email || "Chưa có thông tin"}</td>
                                <td>{user.dob || "Chưa có thông tin"}</td>
                                <td>{user.address || "Chưa có thông tin"}</td>
                                <td>{user.gender || "Chưa có thông tin"}</td>
                                <td>{user.home_town || "Chưa có thông tin"}</td>
                                <td>{user.cccd || "Chưa có thông tin"}</td>
                                <td>{user.nation || "Chưa có thông tin"}</td>
                                <td>{user.education || "Chưa có thông tin"}</td>
                                <td>{user?.roleData?.role_name || "Chưa có thông tin"}</td>
                                <td className={style.btnAction}>
                                    <Button variant="contained" onClick={() => handleEditUser(user.id)}>Sửa</Button>
                                    <Button variant="outlined" color="error" onClick={() => handleDeleUser(user.id, user.roleId)}>
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
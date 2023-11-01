import { useEffect, useState } from "react";
import Header from "@/layouts/Header";

import { useNavigate } from "react-router-dom";

import { getListUsers } from "@/services/apis";

import style from '../Employee/Employee.module.scss'
import { Button } from "@mui/material";
import Box from '@mui/material/Box';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from '@mui/material/Modal';

import { apiGetProfileUser, apiCreateShift } from "@/services/apis";

function OfTheChief() {

    const navigate = useNavigate();

    const [allUser, setAllUser] = useState(null)
    const [openModalType, setOpenModalType] = useState(null)
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState(null)
    const [userId, setUserId] = useState(null)

    const schema = yup.object().shape({
        auth: null,
        shifts: yup.string().required("shifts is Required!"),
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
            // setOpen(false)
            const response = await apiCreateShift({ data: data, userId: userId })
            if (response && response?.data?.statusCode === 2) {
                toast.success("Tạo Ca Làm Thành Công", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setOpen(false)
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


    const handleOpen = (type, userId, roleId) => {
        setOpen(true);
        setOpenModalType(type);
        setUserId(userId)
        // console.log(roleId, userData?.roleId);
        if (userData && userData?.id) {
            if (type === 'auth') {
                // console.log('user', userData.id);
                // console.log('userId', userId);
                if (userData.id === userId) {
                    toast.warn("Bạn Không Thể Thêm Quyền Cho Chính Mình", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setOpen(false)
                }
                if (userData?.roleId === 'R1' && roleId === "R2") {
                    toast.warn("Bạn Không Thể Thêm Quyền Cho Người Có Quyền Lớn Hơn Mình", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setOpen(false)
                }
            } else {
            }

        }
    }
    const handleClose = () => setOpen(false);


    const RenderModalType = () => {
        return (
            <div>
                {
                    openModalType && openModalType === 'auth' ? <form onSubmit={handleSubmit(onSubmit)}>
                        <h2>Phân Quyền</h2>
                        <div className={style.modalFooter}>
                            <input type="submit" value="Thêm Quyền" className={style.inputSubmit} {...register("auth", { validate: false })} />
                            <Button variant="outlined" color="error" size="small" sx={{ fontSize: '15px' }} onClick={handleClose}>Hủy</Button>
                        </div>
                    </form> : <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={style.formGroup}>
                                <h2>Chia Ca</h2>
                                <span>Ca Làm</span><br />
                                <input
                                    className={style.inputNoti}
                                    placeholder="Nhập ngày tháng năm"
                                    {...register("shifts")}
                                />
                                <p className={style.errorNoti}>{errors.shifts?.message}</p>
                            </div>
                            <div className={style.modalFooter}>
                                <input type="submit" value="Chia Ca" className={style.inputSubmit} />
                                <Button variant="outlined" color="error" size="small" sx={{ fontSize: '15px' }} onClick={handleClose}>Hủy</Button>
                            </div>

                        </form>
                    </div>
                }

            </div>
        )
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
                            <RenderModalType />
                        </Box>
                    </Modal>
                </div>
                <h1 className={style.title}>Phân Quyền Và Chia Ca</h1>
                <table className={style.customers}>
                    <tbody>
                        <tr>
                            <th>Mã Nhân Viên</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Năm Sinh</th>
                            <th>Chức Vụ</th>
                            <th>Actions</th>
                        </tr>
                        {allUser && allUser.map(user => (
                            <tr key={user.id}>
                                <td>Nhân Viên : {user.id}</td>
                                <td>{`${user.lastName} ${user.firstName}`}</td>
                                <td>{user.email || "Chưa có thông tin"}</td>
                                <td>{user.dob || "Chưa có thông tin"}</td>
                                <td>{user?.roleData?.role_name || "Chưa có thông tin"}</td>
                                <td className={style.btnAction}>
                                    <Button variant="contained" onClick={() => handleOpen('auth', user.id, user.roleId)} sx={{ fontSize: '12px' }} >
                                        Phân Quyền
                                    </Button>
                                    <Button variant="contained" onClick={() => handleOpen('shifts', user.id, user.roleId)} sx={{ fontSize: '12px' }} >
                                        Chia Ca
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

export default OfTheChief;
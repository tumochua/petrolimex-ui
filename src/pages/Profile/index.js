import { useEffect, useState } from "react";
import { apiGetProfileUser } from "@/services/apis";
import Header from "@/layouts/Header";

import style from './Profile.module.scss'
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Profile() {
    const [useData, setUserData] = useState(null)
    const [open, setOpen] = useState(false);
    // console.log(localStorage.getItem('user'));
    useEffect(() => {
        (async () => {
            const response = await apiGetProfileUser()
            setUserData(response?.data.data)
        })()
    }, [])

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
            console.log(data);
        }
    };
    const handleClose = () => setOpen(false);

    console.log('useData', useData);

    const handleshifts = () => {
        setOpen(true);
    }

    return (
        <>
            <Header />

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
                    </div>

                </div>
            </div>
        </>
    );
}


export default Profile;

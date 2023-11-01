import { useState } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Header from "@/layouts/Header";
import style from './Salary.module.scss'
import { Button } from "@mui/material";


function Salary() {

    const [open, setOpen] = useState(false);

    const schema = yup.object().shape({
        salaryBase: yup.string().required("Salary base is Required!"),
        allowance: yup.string().required("Allowance is Required!"),
        subsidize: yup.string().required("Subsidize is Required!"),
        responsibility: yup.string().required("Responsibility is Required!"),

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
            console.log(data);
            setOpen(false)
            reset()
        }
    };

    const handleSalary = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)

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
                        <form onSubmit={handleSubmit(onSubmit)} className={style.formSalary}>
                            <div className={style.formGroup}>
                                <span>Lương Cơ Bản</span><br />
                                <input
                                    className={style.inputSalary}
                                    placeholder="VND" {...register("salaryBase")}
                                    type='number'
                                />
                                <p className={style.errorNoti}>{errors.salaryBase?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Phụ Cấp</span><br />
                                <input
                                    className={style.inputSalary}
                                    placeholder="VND" {...register("allowance")}
                                    type='number'
                                />
                                <p className={style.errorNoti}>{errors.allowance?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Trợ Cấp</span><br />
                                <input
                                    className={style.inputSalary}
                                    placeholder="VND" {...register("subsidize")}
                                    type='number'
                                />
                                <p className={style.errorNoti}>{errors.subsidize?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Trợ Cấp Trách Nhiệm</span><br />
                                <input
                                    className={style.inputSalary}
                                    placeholder="VND" {...register("responsibility")}
                                    type='number'
                                />
                                <p className={style.errorNoti}>{errors.responsibility?.message}</p>
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
                <div className={style.content}>
                    <div className={style.headerSalary}>
                        <h1 className={style.title}>Bảng Lương Nhân Viên</h1>
                        <Button variant="contained" size='large' sx={{ fontSize: '14px', height: "40px" }} onClick={handleSalary}>Tính Lương</Button>
                    </div>
                    <table className={style.customers}>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>Mã Nhân Viên</th>
                                <th>Lương Cơ Bản</th>
                                <th>Phụ Cấp</th>
                                <th>Trợ Cấp Độc Hại (dành cho nhân viên)</th>
                                <th>Trợ Cấp Trách Nhiệm</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Nhân Viên : 1</td>
                                <td>5.000.000 vnd</td>
                                <td>3.0000 vnd</td>
                                <td>60000k</td>
                                <td>1Tr</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    );
}

export default Salary;
import { useState } from "react";
import Header from "@/layouts/Header";
import style from './Report.module.scss'
import { Button } from "@mui/material";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Report() {
    const [open, setOpen] = useState(false);

    const schema = yup.object().shape({
        time: yup.string().required("Time is Required!"),
        size: yup.string().required("Size is Required!"),
        price: yup.string().required("Price is Required!"),
        problem: null,

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
            setOpen(false);
            console.log(data);
            reset();
        }
    };

    const handleReport = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
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
                        width: 500,
                        bgcolor: 'background.paper',
                        // border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '5px'
                    }}>
                        <h2>Báo Cáo Doanh Số</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={style.formGroup}>
                                <span>Ngày</span><br />
                                <input
                                    className={style.inputReport}
                                    placeholder="ngày" {...register("time")}
                                    type="date"
                                />
                                <p className={style.errorReport}>{errors.time?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Số Lượng</span><br />
                                <input
                                    className={style.inputReport}
                                    placeholder="Số Lượng" {...register("size")}
                                    type="number"
                                />
                                <p className={style.errorReport}>{errors.size?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Giá</span><br />
                                <input
                                    className={style.inputReport}
                                    placeholder="Giá" {...register("price")}
                                    type="number"
                                />
                                <p className={style.errorReport}>{errors.price?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Vấn Đề</span><br />
                                <textarea
                                    className={style.inputReport}
                                    placeholder="Vấn đề của quán" {...register("problem", { validate: false })}
                                />
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
                    <Button variant="contained" sx={{ fontSize: '14px' }} onClick={handleReport}>Báo Cáo</Button>

                </div>
            </div>
        </>
    );
}

export default Report;
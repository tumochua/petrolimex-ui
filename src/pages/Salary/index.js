import { useEffect, useState } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Header from "@/layouts/Header";
import style from './Salary.module.scss'
import { Button } from "@mui/material";
import { apiCountSalary, apiGetAllSalary, apiGetProfileUser } from '@/services/apis';
import { SALARY_SENIORITY } from '@/environment';

function Salary() {

    const [open, setOpen] = useState(false);
    const [listSalary, setListSalary] = useState(null)
    const [roleId, setRoleId] = useState(null)
    const [type, setType] = useState('nv')
    const [filterSalary, setFilterSalary] = useState(null)
    const [userData, setUserData] = useState(null)
    const [yearsWorked, setYearsWorked] = useState(0);


    const schema = yup.object().shape({
        salaryBase: yup.string().required("Salary base is Required!"),
        allowance: yup.string().required("Allowance is Required!"),
        subsidize: yup.string().required("Subsidize is Required!"),
        // responsibility: yup.string().required("Responsibility is Required!"),
        time: yup.string().required("time is Required!"),
    });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (listSalary) {
            if (roleId) {
                const result = listSalary.filter((salary) => {
                    return roleId === 'R0' && salary.responsibility ? false : true
                })

                setFilterSalary(result)
            }

        }

    }, [listSalary, roleId])


    useEffect(() => {
        (async () => {
            const response = await apiGetProfileUser()
            setRoleId(response?.data?.data.roleData?.roleId)
            setUserData(response?.data?.data)
        })()
    }, [])


    useEffect(() => {
        (async () => {
            const response = await apiGetAllSalary()
            if (response?.data?.statusCode === 2) {
                setListSalary(response?.data?.data)
            }
        })()
    }, [open])
    useEffect(() => {
        if (userData) {
            // setSize(calculateYearsWorked(userData.createdAt,));
            const startDate = new Date(userData.createdAt);
            const currentDate = new Date();

            const differenceInTime = currentDate.getTime() - startDate.getTime();
            const differenceInYears = differenceInTime / (1000 * 3600 * 24 * 365.25);
            const yearsWorked = Math.floor(differenceInYears);

            setYearsWorked(yearsWorked);
        }
    }, [userData])
    // if (userData) {
    //     console.log(userData);
    // }

    const onSubmit = async (data) => {
        if (data) {
            await apiCountSalary({ data, type })
            setOpen(false)
            reset()
        }
    };

    const handleSalary = (type) => {
        setOpen(true)
        setType(type)
    }
    // const handleSalaryAdmin = (type) => {
    //     setOpen(true)
    //     // reset()
    //     setType(type)
    // }

    const handleClose = () => {
        setOpen(false)

    }

    // console.log(listSalary);
    const calculateYearsWorked = (startDate, currentSalary, increasePerCycle) => {
        // console.log(startDate, currentSalary, increasePerCycle);
        const today = new Date();
        const start = new Date(startDate);
        const differenceInTime = today.getTime() - start.getTime();
        const differenceInYears = differenceInTime / (1000 * 3600 * 24 * 365.25); // Số năm

        const cycles = Math.floor(differenceInYears / 5); // Số chu kỳ 5 năm đã trôi qua
        console.log(cycles);
        if (cycles > 0) {
            // const newSalary = currentSalary + (cycles * increasePerCycle);
            const newSalary = parseInt(currentSalary) + parseInt(increasePerCycle);
            // console.log(newSalary);
            const formattedNumber = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(newSalary);
            // console.log(formattedNumber);
            return formattedNumber;
        } else {
            const result = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentSalary);

            return result;
        }
    };
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
                            </div> :
                            {/* <div className={style.formGroup}>
                                        <span>Trợ Cấp Trách Nhiệm</span><br />
                                        <input
                                            className={style.inputSalary}
                                            placeholder="VND" {...register("subsidize")}
                                            type='number'
                                        />
                                        <p className={style.errorNoti}>{errors.subsidize?.message}</p>
                                    </div> */}
                            <div className={style.formGroup}>
                                <span>Tháng</span><br />
                                <input
                                    className={style.inputSalary}
                                    placeholder="ngày tháng năm" {...register("time")}
                                    type='date'
                                />
                                <p className={style.errorNoti}>{errors.time?.message}</p>
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
                        {
                            (roleId && roleId === 'R2') || (roleId && roleId === 'R1') ?
                                <div className={style.btnSalary}>
                                    <Button variant="contained" size='large' sx={{ fontSize: '14px', height: "40px" }} onClick={() => handleSalary('nv')}>Tính Lương Nhân Viên</Button>
                                    {/* <Button variant="contained" size='large' sx={{ fontSize: '14px', height: "40px" }} onClick={() => handleSalaryAdmin('admin')}>Tính Lương Quản Lý</Button> */}
                                </div> : null
                        }
                    </div>
                    <table className={style.customers}>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>Tháng</th>
                                <th>Lương Cơ Bản</th>
                                <th>Phụ Cấp</th>
                                <th>Trợ Cấp Độc Hại (nhân viên)</th>
                                {roleId && roleId === 'R0' &&
                                    <th>Thâm Niên</th>
                                }
                            </tr>
                            {
                                filterSalary && filterSalary.map((salary, index) => {
                                    return (
                                        <tr key={salary.id}>
                                            <td>{index + 1}</td>
                                            <td>{salary?.time}</td>
                                            {roleId && roleId === 'R0' ?
                                                <td>{calculateYearsWorked(new Date(userData?.createdAt).toLocaleDateString(), salary?.basic_salary, SALARY_SENIORITY)}</td> :
                                                <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salary?.basic_salary)}</td>
                                                // <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(newSalary);salary?.basic_salary}</td>
                                            }
                                            <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salary?.allowance)}</td>
                                            <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salary?.subsidize)}</td>

                                            {/* <td>{salary?.allowance}</td>
                                            <td>{salary?.subsidize || 'Không dành cho quản lý'}</td> */}

                                            {
                                                roleId && roleId === 'R0' &&
                                                <td>{roleId && roleId === 'R0' && yearsWorked} năm</td>
                                            }

                                            {/* {
                                                roleId && roleId !== 'R0' &&
                                                // <td>{roleId && roleId !== 'R0' ? salary?.responsibility || 'Không dành cho nhân viên' : null}</td>
                                                <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salary?.responsibility)}</td>

                                            } */}
                                            {/* {
                                                roleId && roleId === 'R0' &&
                                                <td>{calculateSalaryIncrease(new Date(userData?.createdAt).toLocaleDateString(), currentYear, salary?.basic_salary) + salary?.basic_salary + salary?.subsidize}</td>
                                            } */}

                                            {/* <td>{roleId && roleId !== 'R0' ? salary?.responsibility || 'Không dành cho nhân viên' : null}</td>
                                            <td>{roleId && roleId !== 'R0' ? salary?.responsibility || 'Không dành cho nhân viên' : null}</td> */}
                                            {/* <td>{calculateSalaryIncrease(new Date(userData?.createdAt).toLocaleDateString(), currentYear, salary?.basic_salary)}</td> */}
                                        </tr>

                                    )
                                })

                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    );
}

export default Salary;
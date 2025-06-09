import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import { isValid, parse, format } from 'date-fns';
import Header from "@/layouts/Header";
import style from './Report.module.scss';
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@mui/material";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { apiCreateSales, apiGetAllSales, apiGetProfileUser, apiResetSales, apiCreateReport } from "@/services/apis";
import { TIME_RESET } from "@/environment";


const todayString = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
};


function Report() {
    const [open, setOpen] = useState(false);
    const [roleId, setRoleId] = useState(null);
    const [listSales, setListSales] = useState(null);
    const [dateValue, setDateValue] = useState("");

    const schema = yup.object().shape({
        time: yup
            .string()
            .required("Ngày là bắt buộc!")
            .test("is-valid-date", "Ngày không hợp lệ", value => {
                const parsed = parse(value, "dd/MM/yyyy", new Date());
                return isValid(parsed);
            }),


        size: yup.string().required("Số lượng là bắt buộc!"),
        price: yup.string().default('25'),
        type: yup.string().default("Loại xăng là bắt buộc"),
        problem: null,
    });

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        setValue("time", todayString());
    }, [setValue]);


    useEffect(() => {
        (async () => {
            const response = await apiGetProfileUser();
            setRoleId(response?.data?.data?.roleId);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (roleId) {
                const response = await apiGetAllSales(roleId);
                if (response?.data?.statusCode === 2) {
                    setListSales(response?.data?.data);
                }
            }
        })();
    }, [roleId, open]);

    const onSubmit = async (data) => {
        if (data) {
            // console.log(data);

            const date = parse(data.time, 'dd/MM/yyyy', new Date());
            if (!isValid(date)) {
                toast.error("Ngày không hợp lệ!");
                return;
            }

            const newData = {
                ...data,
                time: format(date, 'yyyy-MM-dd') // hoặc giữ nguyên dd/MM/yyyy nếu backend cần
            };
            // console.log(newData);


            const response = await apiCreateSales(newData);
            if (response?.data?.statusCode === 2) {
                toast.success('Tạo Báo Cáo Thành Công', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            setOpen(false);
            reset();
        }
    };

    const handleReport = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const exportToExcel = () => {
        const data = listSales.map((sale, index) => {
            const formattedDate = formatDate(sale.day_for_sale);
            return {
                'STT': index + 1,
                'Ngày Bán': formattedDate,
                'Số Săng Bán Được': sale.sales_figures_day,
                'Giá': sale.price,
                'Thành Tiền': sale.sales_figures_day * sale.price + ' vnd'
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'SalesData');
        XLSX.writeFile(workbook, 'sales_data.xlsx');
        saveExcelDb(JSON.stringify(workbook));
    };

    const formatDate = (dateString) => {
        if (!dateString) {
            return '';
        }

        const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
        if (isValid(parsedDate)) {
            return format(parsedDate, 'dd/MM/yyyy');
        } else {
            return ''; // Trả về chuỗi trống nếu ngày tháng không hợp lệ
        }
    };

    const saveExcelDb = async (excel) => {
        if (excel) {
            await apiCreateReport(excel);
        }
    };

    const ResetSales = async () => {
        const response = await apiResetSales({ TIME_RESET, isResetting: true });
        if (response?.data?.statusCode === 2) {
            const response = await apiResetSales({ TIME_RESET, isResetting: false });
        }
    };

    const handleDateChange = (e) => {
        const inputValue = e.target.value;
        const regex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/; // Regex để kiểm tra định dạng dd/MM/yyyy

        if (regex.test(inputValue)) {
            setDateValue(inputValue);
        } else {
            setDateValue(""); // Nếu không hợp lệ, không cập nhật giá trị
        }
    };
    console.log(dateValue);


    return (
        <>
            <div className={style.warpper}>
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
                    theme="light"
                />
                <Modal
                    open={open}
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
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '5px'
                    }}>
                        <h2>Báo Cáo Doanh Số</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={style.formGroup}>
                                <span>Ngày</span><br />
                                <input
                                    type="text"
                                    placeholder="dd/MM/yyyy"
                                    className={style.inputReport}
                                    {...register("time")}
                                />

                                {/* Hiển thị lỗi nếu có */}
                                {errors.time && <p className={style.errorReport}>{errors.time.message}</p>}
                            </div>
                            <div className={style.formGroup}>
                                <span>Số Lượng</span><br />
                                <input
                                    className={style.inputReport}
                                    placeholder="Số Lượng"
                                    {...register("size")}
                                    type="number"
                                />
                                <p className={style.errorReport}>{errors.size?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Loại xăng</span><br />
                                <select
                                    className={style.inputReport}
                                    {...register("type")}
                                >
                                    <option value="" disabled>Chọn loại xăng</option>
                                    <option value="A92">A92</option>
                                    <option value="A95">A95</option>
                                    <option value="E5">E5</option>
                                </select>
                                <p className={style.errorReport}>{errors.type?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Giá</span><br />
                                <input
                                    className={style.inputReport}
                                    placeholder="Giá"
                                    {...register("price")}
                                    type="number"
                                    value='25000'
                                />
                                <p className={style.errorReport}>{errors.price?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Vấn Đề</span><br />
                                <textarea
                                    className={style.inputReport}
                                    placeholder="Vấn đề của quán"
                                    {...register("problem", { validate: false })}
                                />
                            </div>
                            <div className={style.modalFooter}>
                                <input type="submit" value="Tạo" className={style.inputSubmit} />
                                <Button variant="outlined" color="error" size="small" sx={{ fontSize: '15px' }} onClick={handleClose}>Hủy</Button>
                            </div>
                        </form>
                    </Box>
                </Modal>

                <div className={style.container}>
                    <div className={style.content}>
                        {
                            roleId && roleId === 'R0' &&
                            <Button variant="contained" sx={{ fontSize: '16px' }} onClick={handleReport}>Báo Cáo</Button>
                        }
                    </div>
                </div>
                {roleId && roleId !== 'R0' ? (
                    <div className={style.listReport}>
                        <Box sx={{ display: 'flex', gap: '20px' }}>
                            <Button variant="contained" onClick={exportToExcel} sx={{ fontSize: '16px' }}>Xuất Excel</Button>
                            <Button variant="contained" color="success" onClick={ResetSales} sx={{ fontSize: '16px' }}>Reset</Button>
                        </Box>
                        <table>
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Ngày Bán</th>
                                    <th>Số Săng Bán Được</th>
                                    <th>Loại xăng</th>
                                    <th>Giá</th>
                                    <th>Thành Tiền</th>
                                </tr>
                                {listSales && listSales.map((sale, index) => (
                                    <tr key={sale.id}>
                                        <td>{index + 1}</td>
                                        <td>{sale?.day_for_sale}</td>
                                        <td>{sale?.sales_figures_day}</td>
                                        <td>{sale?.type}</td>
                                        <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sale?.price)}</td>
                                        <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sale?.sales_figures_day * sale?.price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : null}
            </div>
        </>
    );
}

export default Report;

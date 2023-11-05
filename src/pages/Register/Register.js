
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ToastContainer, toast } from "react-toastify";

import style from './Register.module.scss';


import config from '@/config';

import { handRegisterUser } from '@/services/apis';
import Header from '@/layouts/Header';


function Register() {

    const navigate = useNavigate();


    const schema = yup.object().shape({
        firstName: yup.string().required("Trường Tên Là Bắt Buộc!"),
        lastName: yup.string().required("Trường Họ Là Bắt Buộc!"),
        address: yup.string().required("Trường Địa Chỉ Là Bắt Buộc!"),
        email: yup.string().email().required("Trường Email Là Bắt Buộc!"),
        password: yup.string().min(4).max(20).required("Trường Mật Khẩu Là Bắt Buộc, Lớn hơn 4 và nhỏ hon 20"),
        confirmPassword: yup
            .string()
            .required("Trường Xác Nhận Mật Khẩu Là Bắt Buộc"),
        dob: yup.string().required("Năm Sinh Là Bắt Buộc!"),
        mobile: yup.string().required('Trường Số Điện Thoại Là Bắt Buộc!'),
        gender: yup.string().required("Giới Tính Là Bắt Buộc!"),
        home_town: yup.string().required("Quê Hương Là Bắt Buộc!"),
        cccd: yup.string().required('Trường Căn Cước Là Bắt Buộc!'),
        nation: yup.string().required("Quốc Gia Là Bắt Buộc!"),
        education: yup.string().required("Học Vấn Là Bắt Buộc!"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        if (data) {
            // console.log('data', data);
            const resultRegister = await handRegisterUser(data)
            console.log(resultRegister);
            if (resultRegister && resultRegister?.data?.statusCode === 4) {
                toast.error("Email Này Đã Đăng Ký, Vui Lòng Sử Dụng Email Khác Để Khác Ký Tài Khoản", {
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
            if (resultRegister && resultRegister?.data?.statusCode === 2) {
                toast.success('Đăng Ký Thành Công', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate(config.routes.employee)
            }
        }
    };





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
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <div className={style.loginWapper}>
                <div className={style.bodyWapper}>
                    <div className={style.headeWapper}>
                        <h1>Register An Account</h1>
                        <p>
                            Register an account to enjoy all the services <br /> without any ads for free!
                        </p>
                    </div>
                    <div className={style.formRegister}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={style.formGroup}>
                                <span>Tên</span><br />
                                <input type="text" placeholder="Tên..." {...register("firstName")} className={style.inputRegister} />
                                <p className={style.errorMessage}>{errors.firstName?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Họ</span><br />
                                <input type="text" placeholder="Họ..." {...register("lastName")} className={style.inputRegister} />
                                <p className={style.errorMessage}>{errors.lastName?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Email</span><br />
                                <input type="text" placeholder="Email..." {...register("email")} className={style.inputRegister} />
                                <p className={style.errorMessage}>{errors.email?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Địa Chỉ</span><br />
                                <input type="text" placeholder="Địa chỉ..." {...register("address")} className={style.inputRegister} />
                                <p className={style.errorMessage}>{errors.address?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Mật Khẩu</span><br />
                                <input
                                    type="password"
                                    placeholder="Mật Khẩu..."
                                    {...register("password")}
                                    className={style.inputRegister}
                                />
                                <p className={style.errorMessage}>{errors.password?.message ? 'Trường Mật Khẩu Là Bắt Buộc, Lớn hơn 4 và nhỏ hon 20' : ''}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Xác Thực Mật Khẩu</span><br />
                                <input
                                    type="password"
                                    placeholder="Xác Thực Mật Khẩu..."
                                    {...register("confirmPassword")}
                                    className={style.inputRegister}
                                />
                                <p className={style.errorMessage}>{errors.confirmPassword?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Năm Sinh</span><br />
                                <input
                                    type="text"
                                    placeholder="Năm Sinh..."
                                    {...register("dob")}
                                    className={style.inputRegister}
                                />
                                <p className={style.errorMessage}>{errors.dob?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Số Điện Thoại </span><br />
                                <input
                                    type="text"
                                    placeholder="Số Điện Thoại ..."
                                    {...register("mobile")}
                                    className={style.inputRegister}
                                />
                                <p className={style.errorMessage}>{errors.mobile?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Giới Tính</span><br />
                                <input
                                    type="text"
                                    placeholder="Giới Tính..."
                                    {...register("gender")}
                                    className={style.inputRegister}
                                />
                                <p className={style.errorMessage}>{errors.gender?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Quê Hương</span><br />
                                <input
                                    type="text"
                                    placeholder="Quê Hương..."
                                    {...register("home_town")}
                                    className={style.inputRegister}
                                />
                                <p className={style.errorMessage}>{errors.home_town?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Căn Cước</span><br />
                                <input
                                    type="text"
                                    placeholder="Căn Cước..."
                                    {...register("cccd")}
                                    className={style.inputRegister}
                                />
                                <p className={style.errorMessage}>{errors.cccd?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Quốc Gia</span><br />
                                <input
                                    type="text"
                                    placeholder="Quốc Gia..."
                                    {...register("nation")}
                                    className={style.inputRegister}
                                />
                                <p className={style.errorMessage}>{errors.nation?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Học Vấn</span><br />
                                <input
                                    type="text"
                                    placeholder="Học Vấn..."
                                    {...register("education")}
                                    className={style.inputRegister}
                                />
                                <p className={style.errorMessage}>{errors.education?.message}</p>
                            </div>
                            <input type="submit" value="Đăng Ký" className={style.submitBtn} />
                        </form>
                    </div>
                    <div className={style.footerWapper}>
                        <p>
                            Already Have An Account?{' '}
                            <Link to={config.routes.login} className={style.navLink}>
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;

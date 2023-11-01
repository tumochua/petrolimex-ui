
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
        firstName: yup.string().required("Your First Name is Required!"),
        lastName: yup.string().required("Your Lasr Name is Required!"),
        email: yup.string().email().required(),
        password: yup.string().min(4).max(20).required(),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords Don't Match")
            .required(),
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
            const resultRegister = await handRegisterUser(data)
            console.log(resultRegister);
            if (resultRegister && resultRegister?.data?.statusCode === 4) {
                toast.error(resultRegister?.data?.message, {
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
                navigate(config.routes.login)
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
                                <span>First Name</span><br />
                                <input type="text" placeholder="First Name..." {...register("firstName")} className={style.inputRegister} />
                                <p className={style.errorMessage}>{errors.firstName?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Last Name</span><br />
                                <input type="text" placeholder="Last Name..." {...register("lastName")} className={style.inputRegister} />
                                <p className={style.errorMessage}>{errors.lastName?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Email Name</span><br />
                                <input type="text" placeholder="Email..." {...register("email")} className={style.inputRegister} />
                                <p className={style.errorMessage}>{errors.email?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Password</span><br />
                                <input
                                    type="password"
                                    placeholder="Password..."
                                    {...register("password")}
                                    className={style.inputRegister}
                                />
                                <p className={style.errorMessage}>{errors.password?.message}</p>
                            </div>
                            <div className={style.formGroup}>
                                <span>Confirm Password</span><br />
                                <input
                                    type="password"
                                    placeholder="Confirm Password..."
                                    {...register("confirmPassword")}
                                    className={style.inputRegister}
                                />
                                <p className={style.errorMessage}>{errors.confirmPassword?.message}</p>
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


/// reactjs
import { useState, useEffect } from 'react';
/// react-router-dom
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Cookies from 'js-cookie';
/// redux
import { connect } from 'react-redux';

///scss
import style from './Login.module.scss';

///config router
import config from '@/config';

/// redux
import { createUser } from '@/store/actions/userActions';
import Header from '@/layouts/Header';

function Login({ createUser, userRedux }) {
    const [stateAccessToken, setAccessToken] = useState(null);
    const [stateRefreshToken, setRefreshToken] = useState(null);
    const navigate = useNavigate();
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(4).max(20).required(),

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
            try {
                const response = await createUser(data);
                console.log('response', response);
                if (response && response.data.statusCode === 2) {
                    setAccessToken(Cookies.get('accessToken'));
                    setRefreshToken(Cookies.get('refreshToken'));
                }
            } catch (error) {
                console.log(error);
            }
        }
    };


    useEffect(() => {
        if (stateAccessToken && stateRefreshToken) {
            navigate(config.routes.profile);
        }
    }, [navigate, stateAccessToken, stateRefreshToken]);

    return (
        <>
            <Header />
            <div className={style.loginWapper}>
                <div className={style.bodyWapper}>
                    <div className={style.headeWapper}>
                        <h1>Login An Account</h1>
                        <p>
                            Login an account to enjoy all the services <br /> without any ads for free!
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className={style.formLogin}>
                        <div className={style.formGroup}>
                            <input type="text" placeholder="Email..." {...register("email")} className={style.inputLogin} />
                            <p className={style.errorMessage}>{errors.email?.message}</p>
                        </div>
                        <div className={style.formGroup}>
                            <input
                                type="password"
                                placeholder="Password..."
                                {...register("password")}
                                className={style.inputLogin}
                            />
                            <p className={style.errorMessage}>{errors.password?.message}</p>
                        </div>
                        <input type="submit" value="Login" className={style.submitBtn} />

                    </form>
                    <div className={style.footerWapper}>
                        <p>
                            Already Have An Account?{' '}
                            <Link to={config.routes.register} className={style.navLink}>
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
const mapStateToProps = (state) => ({
    userRedux: state.users.user,
});
export default connect(mapStateToProps, { createUser })(Login);

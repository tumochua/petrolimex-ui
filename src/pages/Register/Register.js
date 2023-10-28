import { useState, useEffect, Fragment } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import style from './Register.module.scss';

import WapperInput from '@/components/WapperInput';
import Button from '@/components/Button';
import ToastMessage from '@/components/ToastMessage';
import Loading from '@/components/Loading';

import config from '@/config';
import { useShowHideIconPassword, useTypeInput, useValidateForm } from '@/use/Forms';

import { handRegisterUser } from '@/services/apis';

function Register() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: '',
        fullName: '',
    });
    const [iconPassword, setIconPassword] = useState('fa-sharp fa-solid fa-eye-slash');
    const [type, setType] = useState('password');
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    /// toast message
    const [isToast, setIstoast] = useState(false);
    const [iconToast, setIconToast] = useState('fa fa-check-circle');
    const [typeToast, setTypeToast] = useState('default');
    const [toastTitle, setToastTitle] = useState('default');
    const [toastDescription, setToastDescription] = useState('default');

    /// loading
    const [isLoading, setIsLoading] = useState(false);

    // const [redirect, setRedirect] = useState(false);

    const newObjectUser = [
        {
            name: 'email',
            value: user.email,
            length: 5,
            isRequire: true,
        },
        {
            name: 'password',
            value: user.password,
            length: 5,
            isRequire: true,
        },
        {
            name: 'fullName',
            value: user.fullName,
            length: 7,
            isRequire: true,
        },
    ];
    const handleRegister = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const data = useValidateForm(newObjectUser);
        setError(data);
    };

    const handleSetState = ({ type, icon, title, description }) => {
        setTypeToast(type);
        setIconToast(icon);
        setToastTitle(title);
        setToastDescription(description);
    };

    useEffect(() => {
        setResult(
            error &&
                error.every((item) => {
                    return item.success ? true : false;
                }),
        );
        if (result) {
            async function fetchMyAPIPostUser() {
                setIsLoading(true);
                try {
                    const response = await handRegisterUser(user);
                    // console.log(response.data);
                    if (response.data.statusCode === 2) {
                        // handleSetState({
                        //     type: 'success',
                        //     icon: 'fa fa-check-circle',
                        //     title: 'success',
                        //     description: response.data.message,
                        // });
                        // console.log(redirect);
                        navigate(config.routes.login);
                    }
                    if (response.data.statusCode === 4) {
                        handleSetState({
                            type: 'warning',
                            icon: 'fa fa-check-circle',
                            title: 'warning',
                            description: response.data.message,
                        });
                    }
                } catch (error) {
                    console.log(error);
                    handleSetState({
                        type: 'error',
                        icon: 'fa-solid fa-xmark',
                        title: 'error',
                        description: 'error from serve',
                    });
                } finally {
                    setIsLoading(false);
                    setIstoast(true);
                }
            }
            fetchMyAPIPostUser();
            // setRedirect(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result, error]);

    const handleOnchange = (data) => {
        // bảo lưu users và thêm data input
        setUser({ ...user, [data.name]: data.value });
        if (error) {
            error.map((item) => {
                if (item.name === data.name) {
                    item.errorMessage = '';
                    item.statusError = false;
                }
                return null;
            });
        }
    };

    const handleChanIcon = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const classPassword = useShowHideIconPassword(iconPassword);
        setIconPassword(classPassword);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const resultType = useTypeInput(type);
        setType(resultType);
    };

    const handleCloseToast = () => {
        setIstoast(false);
    };

    return (
        <>
            {isLoading ? <Loading /> : null}
            {isToast ? (
                <ToastMessage
                    icon={iconToast}
                    handleCloseToast={handleCloseToast}
                    autoClose={5000}
                    hideProgressBar={false}
                    hideBorder={false}
                    typeToast={typeToast}
                >
                    <div>
                        <p>{toastTitle}</p>
                        <p>{toastDescription}</p>
                    </div>
                </ToastMessage>
            ) : null}
            <div className={style.loginWapper}>
                <div className={style.bodyWapper}>
                    <div className={style.headeWapper}>
                        <h1>Register An Account</h1>
                        <p>
                            Register an account to enjoy all the services <br /> without any ads for free!
                        </p>
                    </div>
                    <form className={style.formBody}>
                        <WapperInput
                            lable="FullName"
                            value={user.fullName}
                            name="fullName"
                            type="text"
                            handleOnchange={handleOnchange}
                            placeholder="FullName..."
                            errors={error && error[2].errorMessage}
                            invalid={error && error[2].statusError}
                        ></WapperInput>
                        <WapperInput
                            lable="Email Address"
                            value={user.email}
                            name="email"
                            type="email"
                            handleOnchange={handleOnchange}
                            placeholder="Email Address.."
                            errors={error && error[0].errorMessage}
                            invalid={error && error[0].statusError}
                        ></WapperInput>
                        <WapperInput
                            lable="Password"
                            value={user.password}
                            name="password"
                            type={type}
                            handleOnchange={handleOnchange}
                            placeholder="Password"
                            icon={iconPassword}
                            handleChanIcon={handleChanIcon}
                            errors={error && error[1].errorMessage}
                            invalid={error && error[1].statusError}
                        ></WapperInput>
                        <Button success fullWidth top hanldeClick={handleRegister}>
                            Register
                        </Button>
                    </form>
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

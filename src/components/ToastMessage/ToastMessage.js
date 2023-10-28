import { useEffect } from 'react';

import classNames from 'classnames';
import style from './ToastMessage.module.scss';

function ToastMessage({ icon, children, handleCloseToast, autoClose, hideProgressBar, hideBorder, typeToast }) {
    const toastClasses = classNames({
        [style.toastWapper]: true,
        [style.hideBorder]: hideBorder,
        [style.borderSuccess]: typeToast === 'success',
        [style.borderWarning]: typeToast === 'warning',
        [style.borderError]: typeToast === 'error',
    });
    const iconClasses = classNames(icon, {
        [style.iconSuccess]: typeToast === 'success',
        [style.iconWarning]: typeToast === 'warning',
        [style.iconError]: typeToast === 'error',
    });
    const progressClasses = classNames({
        [style.progress]: !hideProgressBar,
        [style.progressSuccess]: typeToast === 'success',
        [style.progressWarning]: typeToast === 'warning',
        [style.progressError]: typeToast === 'error',
        // animation: `progress ${autoClose} linear`,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            handleCloseToast();
        }, autoClose);

        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className={toastClasses}>
                <div onClick={handleCloseToast} className={style.toast}>
                    <span className={style.borderLeft}>
                        <i className={iconClasses}></i>
                    </span>
                    {children}
                    <span className={style.iconClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                </div>
                {/* style={{ animation: `progress ${autoClose} linear ` }} */}
                <div className={progressClasses}></div>
            </div>
        </>
    );
}

export default ToastMessage;

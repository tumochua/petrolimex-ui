import classNames from 'classnames';
import style from './MyError.module.scss';

function MyError({ children, invalid }) {
    const errorClasses = classNames({
        [style.baseError]: true,
        [style.invalid]: invalid,
    });

    return <span className={errorClasses}>{children}</span>;
}

export default MyError;

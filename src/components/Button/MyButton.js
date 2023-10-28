import style from './MyButton.module.scss';
import classNames from 'classnames';

function MyButton({
    children,
    danger,
    disabled,
    success,
    small,
    medium,
    large,
    fullWidth,
    top,
    error,
    hanldeClick,
    opacity,
    hoverBorder,
    accent,
    border,
    radius,
    isBackground,
}) {
    // console.log(style);
    const btnClassses = classNames({
        [style.baseBtn]: true,
        [style.danger]: danger,
        [style.disabled]: disabled,
        [style.success]: success,
        [style.small]: small,
        [style.medium]: medium,
        [style.large]: large,
        [style.fullWidth]: fullWidth,
        [style.top]: top,
        [style.error]: error,
        [style.opacity]: opacity,
        [style.hoverBorder]: hoverBorder,
        [style.accent]: accent,
        [style.border]: border,
        [style.radius]: radius,
        [style.isBackground]: isBackground,
    });

    return (
        <button className={btnClassses} onClick={hanldeClick}>
            {children}
        </button>
    );
}

export default MyButton;

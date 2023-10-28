import classNames from 'classnames';
import style from './FormInput.module.scss';

function FormInput({
    label,
    errorMessage,
    half,
    value,
    name,
    onChangeInput,
    placeholder,
    type,
    invalid,
    icon,
    onChangeIconPassword,
    trifurcate,
}) {
    /// className của react nhận string nên sử lý làm sao cuối cùng trả ra chuỗi và nếu muốn nhiều className thì mỗi className cách nhau bằng dấu cách
    const classInput = classNames(style.baseInput, {
        [style.half]: half,
        [style.invalid]: invalid,
        [style.trifurcate]: trifurcate,
    });
    const classIcon = classNames(icon, style.iconPassword, {});

    const handleOnchange = (e) => {
        if (type === 'file') {
            onChangeInput({ name: name, value: e.target.files[0] });
            return;
        }
        onChangeInput({ name: name, value: e.target.value });
    };

    // const handleOnBlue = (e) => {
    //     onBlurInput({ name: name, value: e.target.value });
    // };

    return (
        <div className={style.editWapper}>
            <label className={style.lable}>{label}</label> <br />
            <span className={style.inputWapper}>
                <input
                    className={classInput}
                    type={type}
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    onChange={handleOnchange}
                    // onBlur={handleOnBlue}
                    autoComplete="on"
                />
                {/* <i className={icon}></i> */}
                <i className={classIcon} onClick={onChangeIconPassword}></i>
            </span>
            <br />
            {/* <span className={style.errors}>{errorMessage}</span> */}
            <span className={style.errors}>{errorMessage}</span>
        </div>
    );
}

export default FormInput;

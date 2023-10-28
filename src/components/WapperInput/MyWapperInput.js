import style from './MyWapperInput.module.scss';
import MyInput from '@/components/Input/MyInput';
import MyLable from '@/components/Lable/MyLable';
import MyError from '@/components/Error/MyError';
function MyWapperInput({
    value,
    name,
    type,
    placeholder,
    handleOnchange,
    errors,
    lable,
    invalid,
    icon,
    handleChanIcon,
}) {
    return (
        <div className={style.wapperInput}>
            <MyLable>{lable}</MyLable> <br />
            <MyInput
                className={style.formControll}
                invalid={invalid}
                value={value}
                placeholder={placeholder}
                name={name}
                type={type}
                handleOnchange={handleOnchange}
                icon={icon}
                handleChanIcon={handleChanIcon}
            ></MyInput>{' '}
            <MyError invalid>{errors}</MyError>
        </div>
    );
}

export default MyWapperInput;

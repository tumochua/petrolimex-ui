import MyButton from '../Button/MyButton';
import style from './Confirm.module.scss';
function Confirm({ children }) {
    return (
        <div className={style.container}>
            <div className={style.body}>{children}</div>
            <div className={style.bottom}>
                <MyButton>Ok</MyButton>
                <MyButton>Cancel</MyButton>
            </div>
        </div>
    );
}

export default Confirm;

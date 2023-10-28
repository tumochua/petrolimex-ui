import classNames from 'classnames';
import style from './Modal.module.scss';
import MyButton from '../Button/MyButton';

function Modal({ children, isShowModal, onShowHideModal, position, isBottom, showModal, onCanCel, onOk, opacity }) {
    const classModal = classNames(style.container, {
        modal: isShowModal,
        [style.topCenter]: position === 'topCenter',
        [style.center]: position === 'center',
    });
    return (
        <>
            {showModal && (
                <div className={classModal} onClick={onShowHideModal}>
                    <div className={style.modalBody}>{children}</div>
                    {isBottom && (
                        <div className={style.bottom}>
                            <MyButton hanldeClick={onCanCel}>Cancel</MyButton>
                            <MyButton success hanldeClick={onOk} opacity={opacity}>
                                Ok
                            </MyButton>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Modal;

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import style from './Menus.module.scss';
function Menus({ position, menus, isMenu, postId, onChangeItemMenu, commnetId, authorId, textComment }) {
    const { t } = useTranslation();
    const menusClassess = classNames(style.baseMenu, {
        [style.topRight]: position === 'top-right',
    });
    // console.log(postId);
    return (
        <>
            {isMenu && (
                <ul className={menusClassess}>
                    {menus &&
                        menus.map((itemMenu) => {
                            return (
                                <li
                                    key={itemMenu.id}
                                    className={style.itemMenu}
                                    onClick={(event) =>
                                        onChangeItemMenu(
                                            itemMenu.value,
                                            postId,
                                            commnetId,
                                            authorId,
                                            textComment,
                                            event,
                                        )
                                    }
                                >
                                    <i className={itemMenu.icon && itemMenu.icon}></i>
                                    <span>{t(`${itemMenu.text}`)}</span>
                                </li>
                            );
                        })}
                </ul>
            )}
        </>
    );
}

// export default Menus;
export default memo(Menus);

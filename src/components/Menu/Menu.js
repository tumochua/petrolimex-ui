import classNames from 'classnames';

import style from './Menu.module.scss';

function Menu({ small, showBefore, children }) {
    const classes = classNames({
        [style.modalWapper]: true,
        [style.small]: small,
        [style.showBefore]: showBefore,
    });

    return (
        <div className={classes}>
            {/* <p className={style.modalItem}>Tiếng việt</p>
            <p className={style.modalItem}>Tiếng anh</p> */}
            {children}
        </div>
    );
}

export default Menu;

import style from './DefaultLayout.module.scss';

import Header from '../Header/index';
import Footer from '../Footer';
// import Sidebar from '../components/Sidebar';

function DefaultLayout({ children }) {
    return (
        <div className={style.defaultWapper}>
            <Header />
            <div className={style.bodyWapper}>
                <div className={style.contentWapper}>{children}</div>
            </div>
            <Footer/>
        </div>
    );
}

export default DefaultLayout;

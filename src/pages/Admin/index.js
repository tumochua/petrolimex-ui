import Header from "@/layouts/Header";
import style from './Admin.module.scss'

function Admin() {
    return (
        <>
            <Header />
            <div className={style.container}>Admin</div>
        </>
    );
}

export default Admin;
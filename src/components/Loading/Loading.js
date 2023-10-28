import style from './Loading.module.scss';

function Loading() {
    return (
        // <div className={style.loadingWapper}>
        //     <p>l</p>
        //     <p>o</p>
        //     <p>a</p>
        //     <p>d</p>
        //     <p>i</p>
        //     <p>n</p>
        //     <p>g</p>
        // </div>
        <>
            <div className={style.loaderWapp}>
                <div className={style.loader}></div>
                <p className={style.text}>Loading..</p>
            </div>
        </>
    );
}

export default Loading;


import style from './Footer.module.scss'

function Footer() {
    return (
        <div className={style.Footer}>
            <div className={style.FooterWapper}>
                <div>
                    <p>Trang TTĐTTH Tập đoàn Xăng dầu Việt Nam - Petrolimex (PLX)</p>
                    <p>Giấy phép số 1900/GP-TTĐT do Sở TT&TT Hà Nội cấp ngày 8/7/2020</p>
                    <p>Chịu trách nhiệm nội dung: Ông Nguyễn Quang Dũng - Phó Tổng Giám đốc</p>
                </div>
                <div className={style.socialNetwork}>
                    <span><i className="fa fa-rss-square"></i></span>
                    <span><i className="fa-brands fa-facebook"></i></span>
                </div>
            </div>
        </div>
      );
}

export default Footer;
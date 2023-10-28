import * as React from 'react';
import style from './Home.module.scss'


import { useEffect,useState } from 'react';


const ablutMe = ["Danh Sách Nhân Viên", "Chấm Công", "Lương", "Báo cáo tài chính"]


function Home() {

    const [newData] = useState([
        {
            id:1,
            title:"Petrolimex điều chỉnh giá xăng dầu từ 15 giờ 00 phút ngày 23.10.2023",
            orther:"Thông cáo báo chí | 23/10/2023",
        },
        {
            id:2,
            title:"Petrolimex điều chỉnh giá xăng dầu từ 15 giờ 00 phút ngày 23.10.2023",
            orther:"Thông cáo báo chí | 23/10/2023",
        },
        {
            id:3,
            title:"Petrolimex điều chỉnh giá xăng dầu từ 15 giờ 00 phút ngày 23.10.2023",
            orther:"Thông cáo báo chí | 23/10/2023",
        },
        {
            id:4,
            title:"Petrolimex điều chỉnh giá xăng dầu từ 15 giờ 00 phút ngày 23.10.2023",
            orther:"Thông cáo báo chí | 23/10/2023",
        },
        {
            id:5,
            title:"Petrolimex điều chỉnh giá xăng dầu từ 15 giờ 00 phút ngày 23.10.2023",
            orther:"Thông cáo báo chí | 23/10/2023",
        },
       
    ]);


    // const { t } = useTranslation();
    useEffect(() => {
        (async () => {
            // const response = await getListUsers();
            // console.log('response', response);
        })();
    }, []);

   

    return (
        <div>
          
            <div className={style.containers}>
                <img src='https://files.petrolimex.com.vn/files/6783dc1271ff449e95b74a9520964169/image=jpeg/9562fc49e05349faae8bc483f044eb85/Desktop%2016.11.jpg' className={style.imageSlider} alt='alt' />
            </div>
            <div className={style.introduceWarrper}>
                <div className={style.introduceLeft}>
                    <h2 className={style.introduceLeftTitle}>
                        Petrolimex giữ vị trí chủ lực trên thị trường xăng dầu nội địa
                    </h2>
                    <div className={style.introduceDetail}>
                        <p>
                            Cùng các doanh nghiệp đầu mối kinh doanh xăng dầu khác và hơn 120 thương nhân phân phối xăng dầu, Petrolimex bảo đảm đầy đủ và kịp thời các chủng loại xăng dầu phục vụ phát triển kinh tế - xã hội, an ninh quốc phòng và nhu cầu tiêu dùng của nhân dân
                        </p>
                        <div className={style.introduceAboutMe}>
                            <span >Về chúng tôi</span>
                            <span><i class="fa fa-caret-right"></i></span>
                        </div>
                    </div>
                </div>
                <div className={style.introduceRight}>
                    <div className={style.saleWarpper}>
                        <div>
                            <span className={style.saleNumber}>48</span>
                            <span className={style.saleTitle}>đơn vị thành viên</span>
                        </div>
                        <p>Trực tiếp kinh doanh xăng dầu trên toàn quốc</p>
                    </div>
                    <div>
                        <div>
                            <span className={style.saleNumber}>12,9</span>
                            <span className={style.saleTitle}>nghìn tỷ đồng</span>
                        </div>
                        <p> Tổng vốn điều lệ của Petrolimex</p>
                    </div>
                    <div>
                        <div>
                            <span className={style.saleNumber}>5.500</span>
                        </div>
                        <p>Cửa hàng xăng dầu trên toàn quốc</p>
                    </div>
                </div>
            </div>
            <div>
                <div className={style.typesOfServices}>
                    <div className={style.leftImage}>
                        <img src='https://portals.petrolimex.com.vn/_themes/sunrise/img/industry-cta-1.jpg' className={style.leftImageItem} alt='alt'/>
                    </div>
                    <div className={style.rightImages}>
                        <img src='https://portals.petrolimex.com.vn/_themes/sunrise/img/industry-cta-2.jpg' className={style.rightImageItem} alt='alt'/>
                        <img src='https://portals.petrolimex.com.vn/_themes/sunrise/img/industry-cta-3.jpg' className={style.rightImageItem} alt='alt'/>
                        <img src='https://portals.petrolimex.com.vn/_themes/sunrise/img/industry-cta-4.jpg' className={style.rightImageItem} alt='alt'/>
                    </div>
                </div>
            </div>

            <div className={style.hoseWarpper}>
                <div className={style.hoseLeft}>
                    <h3>HOSE: PLX</h3>
                    <span className={style.hoseLeftNumber}>33.00</span>
                    <span className={style.hoseLeftPercent}>
                        <span>0.3%</span>
                        <i class="fa fa-caret-up up"></i>
                    </span>
                    <span>Cập nhật lần cuối lúc 22:11 - 27/10/2023</span>
                </div>
                <div className={style.hoseRight}>
                    <p className={style.hoseRightTitle}>Tin tức đầu tư </p>
                    <span><i class="fa fa-caret-right"></i></span>
                </div>
            </div>

            <div className={style.LearnMoreAboutUs}>
                <div className={style.LearnMoreAboutUsWarpper}>
                    <div className={style.LearnMoreAboutUsTitle}>Hiểu thêm về chúng tôi</div>
                    <div className={style.btnWarpper}>
                        {ablutMe.map((item, index) => (
                            <button key={index} className={style.customBtn}>{item}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className={style.newWarpper}>
                <div className={style.newTitle}>Tin Tức</div>
                <div className={style.newDetail}>
                    <div className={style.newDetailLeft}>
                        <img src='https://files.petrolimex.com.vn/thumbnailwebps/6783dc1271ff449e95b74a9520964169/0/0/0/9276dbf8a4cf4e8094822d6240579b2c/0/082809/b65daa0d78ce46f78c81425fbb630a1d.webp?transparent=.' alt='alt'/>
                        <div className={style.postTitle}>Một số thông tin điều hành Xăng dầu ngày 23.10.2023</div>
                        <p>www.petrolimex.com.vn xin trân trọng đăng tải toàn văn thông tin kỳ điều hành giá xăng dầu ngày 23.10.2023.</p>
                    </div>
                    <div className={style.newDetailRight}>
                    {newData.map(item => (
                        <div key={item.id} className={style.postList}>
                            <div className={style.postListTitle}>{item.title}</div>
                            <p>{item.orther}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

            <div className={style.sunriseWarpper}>
                <div>
                    <img src='https://portals.petrolimex.com.vn/_themes/sunrise/img/cta-textbox-1.jpg' alt='alt' className={style.sunriseItem} />
                </div>
                <div>
                    <img src='https://portals.petrolimex.com.vn/_themes/sunrise/img/cta-textbox-2.jpg' alt='alt' className={style.sunriseItem} />
                </div>
            </div>

        </div>
    );
}

export default Home;

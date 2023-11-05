import Header from "@/layouts/Header";
import style from './Timekeeping.module.scss'
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { apiGetProfileUser, apiCreateTimeKeeing, apiGetAllTimeKeeing } from "@/services/apis";

function Timekeeping() {

    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [userData, setUserData] = useState(null)
    const [toastTitleStart, seTtoastTitleStart] = useState(null)
    const [toastTitleEnd, seTtoastTitleEnd] = useState(null)
    const [roleId, setRoleId] = useState(null)
    const [listTimekeeing, setListTimeKeeing] = useState(null)


    useEffect(() => {
        (async () => {
            const response = await apiGetProfileUser()
            setUserData(response?.data?.data);
            setRoleId(response?.data?.data?.roleData?.roleId)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            if (roleId) {
                const response = await apiGetAllTimeKeeing(roleId)
                if (response?.data?.statusCode === 2) {
                    setListTimeKeeing(response?.data?.data)
                }
            }
        })()
    }, [roleId])

    const getTimeCurrentStart = () => {
        const currentTime = new Date();

        const year = String(currentTime.getFullYear());
        const month = String(currentTime.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const day = String(currentTime.getDate()).padStart(2, '0');
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        // Tạo đối tượng userData từ thông tin thời gian
        const newUserData = {
            day: day,
            month: month,
            year: year,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };

        // Thiết lập state userData
        setStartTime(newUserData);
    }
    const getTimeCurrentEnd = () => {
        const currentTime = new Date();

        const year = String(currentTime.getFullYear());
        const month = String(currentTime.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const day = String(currentTime.getDate()).padStart(2, '0');
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        // Tạo đối tượng userData từ thông tin thời gian
        const newUserData = {
            day: day,
            month: month,
            year: year,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };

        // Thiết lập state userData
        setEndTime(newUserData);
    }
    useEffect(() => {
        getTimeCurrentStart()
    }, [])
    useEffect(() => {

        getTimeCurrentEnd()
    }, [])



    useEffect(() => {
        if (startTime && userData) {

            const title = `Mã Nhân Viên : ${userData?.id} - ${userData.lastName} ${userData.firstName} ,
                Giờ Vào ${startTime.hours}h${startTime.minutes}p Ngày ${startTime.day} Tháng ${startTime.month} Năm ${startTime.year}
            `
            seTtoastTitleStart(title);
        }
    }, [startTime, userData])



    useEffect(() => {
        if (endTime && userData) {
            const title = `Mã Nhân Viên : ${userData?.id} - ${userData.lastName} ${userData.firstName} ,
            Giờ Ra ${endTime.hours}h${endTime.minutes}p Ngày ${endTime.day} Tháng ${endTime.month} Năm ${startTime.year}
        `
            seTtoastTitleEnd(title);
        }
    }, [endTime, userData])


    const handleBtnTimeStart = async () => {

        const response = await apiCreateTimeKeeing({ userId: userData?.id, time: `Giờ Vào ${endTime.hours}h${endTime.minutes}p Ngày ${endTime.day} Tháng ${endTime.month} Năm ${startTime.year}`, type: 'start' })
        if (response?.data?.statusCode === 2) {
            toast.success(toastTitleStart, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        }

    }

    const handleBtnTimeEnd = async () => {
        const response = await apiCreateTimeKeeing({ userId: userData?.id, time: `Giờ Ra ${endTime.hours}h${endTime.minutes}p Ngày ${endTime.day} Tháng ${endTime.month} Năm ${startTime.year}`, type: 'end' })
        if (response?.data?.statusCode === 2) {
            toast.success(toastTitleEnd, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        }
    }
    return (
        <>
            <Header />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div>
                {/* <div>Giờ Vào : {JSON.stringify(startTime)}</div>
                <div>Giờ Ra : {JSON.stringify(endTime)}</div> */}
            </div>
            <div className={style.container}>
                <Button variant="contained" disableElevation sx={{ fontSize: "18px" }} onClick={handleBtnTimeStart}>Giờ Vào</Button>
                <Button variant="contained" color="success" sx={{ fontSize: "18px" }} onClick={handleBtnTimeEnd}>Giờ Ra</Button>
            </div>

            <table className={style.customers}>
                {listTimekeeing &&
                    <tbody>
                        <tr>
                            <th>STT</th>
                            <th>Mã Nhân Viên</th>
                            {/* <th>Full Name</th> */}
                            <th>Time</th>
                            {/* <th>Type</th> */}
                        </tr>
                        {
                            listTimekeeing && listTimekeeing.map((timekeeing, index) => {
                                return (
                                    <tr key={timekeeing.id}>
                                        <td>{index + 1}</td>
                                        <td>{timekeeing.userId}</td>
                                        {/* <td>{userData?.lastName}  {userData?.firstName}</td> */}
                                        <td>{timekeeing.time}</td>
                                        {/* <td>{timekeeing.type === 'start' ? 'Giờ Vào' : 'Giờ Ra'}</td> */}
                                    </tr>
                                )
                            })

                        }

                    </tbody>

                }
            </table>
        </>
    );
}

export default Timekeeping;
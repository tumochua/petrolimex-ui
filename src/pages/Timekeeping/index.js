import Header from "@/layouts/Header";
import style from './Timekeeping.module.scss'
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { apiGetProfileUser } from "@/services/apis";

function Timekeeping() {

    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [userData, setUserData] = useState(null)
    const [toastTitleStart, seTtoastTitleStart] = useState(null)
    const [toastTitleEnd, seTtoastTitleEnd] = useState(null)


    useEffect(() => {
        (async () => {
            const response = await apiGetProfileUser()
            setUserData(response?.data?.data);
        })()
    }, [])

    useEffect(() => {
        const getTimeCurrent = () => {
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
        getTimeCurrent()
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
        const getTimeCurrent = () => {
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
        getTimeCurrent()
    }, [])

    useEffect(() => {
        if (endTime && userData) {
            const title = `Mã Nhân Viên : ${userData?.id} - ${userData.lastName} ${userData.firstName} ,
            Giờ Ra ${endTime.hours}h${endTime.minutes}p Ngày ${endTime.day} Tháng ${endTime.month} Năm ${startTime.year}
        `
            seTtoastTitleEnd(title);
        }
    }, [endTime, userData])


    const handleBtnTimeStart = () => {
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

    const handleBtnTimeEnd = () => {
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
    console.log(toastTitleStart);
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
                <div>Giờ Vào : {JSON.stringify(startTime)}</div>
                <div>Giờ Ra : {JSON.stringify(endTime)}</div>
            </div>
            <div className={style.container}>
                <Button variant="contained" disableElevation sx={{ fontSize: "18px" }} onClick={handleBtnTimeStart}>Giờ Vào</Button>
                <Button variant="contained" color="success" sx={{ fontSize: "18px" }} onClick={handleBtnTimeEnd}>Giờ Ra</Button>
            </div>
        </>
    );
}

export default Timekeeping;
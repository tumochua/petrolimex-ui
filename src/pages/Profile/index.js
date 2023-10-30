import { useEffect } from "react";
import { apiGetProfileUser } from "@/services/apis";
import Header from "@/layouts/Header";

function Profile() {
    // console.log(localStorage.getItem('user'));
    useEffect(() => {
        (async () => {
            const response = await apiGetProfileUser()
            console.log(response);
        })()
    }, [])
    return (
        <>
            <Header />
            <div>Profile</div>
        </>
    );
}


export default Profile;

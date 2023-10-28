import { useState, useEffect } from 'react';
import style from './Notification.module.scss';
import { apiSeeAllNotification } from '@/services/apis';

function Notification() {
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await apiSeeAllNotification();
            // console.log(response.data.data);
            if (response.data.statusCode === 2) {
                setNotification(response.data.data);
            }
        })();
    }, []);

    return (
        <div className={style.container}>
            <ul className={style.body}>
                {notification &&
                    notification.map((item) => {
                        return (
                            <li key={item.id}>
                                <span>{item.description}</span>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

export default Notification;

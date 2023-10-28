export const handleConvertRimestampToDate = (timestamp, currentDate) => {
    // console.log('new Date(timestamp)', new Date(timestamp));
    // console.log('timestamp', timestamp);
    // console.log('currentDate', currentDate);
    const timestampDate = handleConvertFormatDate(new Date(+timestamp));
    const currentDay = handleConvertFormatDate(currentDate);
    const beforDay = currentDay.dd - timestampDate.dd;
    const beforHours = currentDay.hour - timestampDate.hour;
    const beforMinute = currentDay.minutes - timestampDate.minutes;
    // console.log('timestampDate', timestampDate);
    // console.log('currentDay', currentDay);
    if (timestampDate.dd < currentDay.dd) {
        return ` ${beforDay} ngày trước `;
    }
    if (timestampDate.dd === currentDay.dd && currentDay.hour > timestampDate.hour) {
        return ` ${beforHours} giờ trước `;
    }
    if (timestampDate.dd === currentDay.dd && currentDay.hour === timestampDate.hour) {
        return ` ${beforMinute} phút trước `;
    }
};

const handleConvertFormatDate = (currentDate) => {
    const today = currentDate;
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    const hour = today.getHours();
    const minutes = today.getMinutes();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    // console.log('mm', dd);
    return {
        formattedToday,
        dd,
        hour,
        minutes,
    };
};

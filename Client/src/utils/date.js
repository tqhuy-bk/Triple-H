const options = { year: 'numeric', month: 'long', day: 'numeric' }

export function convertDateToStr(date) {
    // date is Date object
    let temp = new Date(date);
    return temp.toLocaleDateString("vi-VN");
}

export function convertDateToStrShort(date) {
    let temp = new Date(date);
    return temp.getDate() + '/' + (temp.getMonth() + 1);
}

export function convertDateFormat(date) {
    let temp = new Date(date);
    return new Date(temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-'+ temp.getDate());
}

export function getTime(date) {
    let temp = new Date(date);
    return ('0' + temp.getHours()).slice(-2) + ":" + ('0' + temp.getMinutes()).slice(-2);
}

export function convertStrToDate(dateStr) {

    // dateStr is str at format dd/mm/yyyy
    var date = dateStr.split("/");
    var viFormatDate = date[1] + "/" + date[0] + "/" + date[2];
    return new Date(viFormatDate);
}

export function convertDateToStrTime(datetime) {
    return `${datetime.toLocaleDateString('vi-VN', options)} lúc ${('0' + datetime.getHours()).slice(-2)}:${('0' + datetime.getMinutes()).slice(-2)}`;
}

export function timeAgo(datetime) {
    const now = new Date();
    if (now - datetime < 0) return "Tương lai";
    if (now - datetime < 60 * 1000) {
        return "Vài giây trước";
    }
    if (now - datetime < 60 * 60 * 1000) {
        let ago = Math.round((now - datetime) / (60 * 1000));
        return `${ago} phút trước`;
    }
    if (now - datetime < 24 * 60 * 60 * 1000) {
        if (datetime.getDate() === now.getDate()) {
            let ago = Math.round((now - datetime) / (60 * 60 * 1000));
            return `${ago} giờ trước`
        }
        else {
            return `Hôm qua lúc ${('0' + datetime.getHours()).slice(-2)}:${('0' + datetime.getMinutes()).slice(-2)}`
        }
    }

    if ((now - datetime < 48 * 60 * 60 * 1000) && (datetime.getDate() === now.getDate() - 1)) {
        return `Hôm qua lúc ${('0' + datetime.getHours()).slice(-2)}:${('0' + datetime.getMinutes()).slice(-2)}`
    }
    return convertDateToStrTime(datetime);
}

export function timeAgoShort(datetime) {
    const now = new Date();
    if (now - datetime < 24 * 60 * 60 * 1000) {
        return timeAgo(datetime);
    }
    return convertDateToStr(datetime);
}
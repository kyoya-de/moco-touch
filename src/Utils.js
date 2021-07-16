class Utils
{
    static formatDate(date) {
        const day = Utils.leadingZero(date.getDate());
        const month = Utils.leadingZero((date.getMonth() + 1));
        const year = Utils.leadingZero(date.getFullYear(), 4);

        return `${year}-${month}-${day}`;
    }

    static formatTime(date) {
        const hours = Utils.leadingZero(date.getHours());
        const minutes = Utils.leadingZero(date.getMinutes());
        const secs = Utils.leadingZero(date.getSeconds());

        return `${hours}:${minutes}:${secs}`;
    }

    static leadingZero(value, count = 2) {
        return String(value).padStart(count, '0');
    }
}

export default Utils;

export class Store {
    static currDate = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        date: new Date().getDate(),
    };
    static subs = [];
    static showCurrDate(year, month, monthName, cb) {
        year.value = `${Store.currDate.year}`;
        month.value = `${Store.currDate.month}`;
        monthName.textContent = cb(Store.currDate.month);
    }
    static datesInMonth({ year, month }) {
        if (month === 0 || month === 11)
            return 31;
        return new Date(year, month + 1, 0).getDate();
    }
    static setCurrDate = (key, val) => {
        if (key && typeof val === "number") {
            Store.currDate[key] = val;
        }
        else
            Object.assign(Store.currDate, val);
        Store.subs.forEach((cb) => cb());
    };
    static observe = (cb) => {
        if (!Store.subs.length) {
            Store.subs.push(cb);
            Store.subs.forEach((cb) => cb());
        }
    };
}

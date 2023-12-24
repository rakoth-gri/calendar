export class Store {
  static currDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate()
  };

  static subs = []

  static showCurrDate(year, month, monthName, cb) {    
    year.value = Store.currDate.year;
    month.value = Store.currDate.month;
    monthName.textContent = cb(Store.currDate.month);
  }

  // (year: number, month : number) => number (кол-во дней в выбранном месяце)  
  static datesInMonth({year, month}) {
    if (month === 0 || month === 11) return 31;
    return new Date(year, month + 1, 0).getDate();
  }

  // (val: number) => void
  static setCurrDate = (key, val) => {    
    key ? Store.currDate[key] = val : Object.assign(Store.currDate, val)
    Store.subs.forEach(cb => cb())
  }

  static observe = (cb) => {
    if(!Store.subs.length) {
      Store.subs.push(cb)
      Store.subs.forEach(cb => cb())
    }    
  }
}


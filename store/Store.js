export class Store {
  static currDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate()
  };

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

  // val: number
  static setCurrDate = (key, val) => Store.currDate[key] = val    
  
  // Логирование для визуальных тестов ---
  static logCurrDate() {console.log(Store.currDate)}  
  
  static getCurrDate() {
    const {year, month, date} = Store.currDate
    return `${year} ${month} ${date}` 
  }
}


import {
  CALENDAR,
  YEAR,
  MONTH,
  MONTH_NAME,
  FIELD,
  WEEK_DAY
} from "./constants/constants.js";
// Статический класс состяния
import { Store } from "./store/Store.js";
// Класс календаря
import Calendar from "./services/Calendar.js"

const calendar = new Calendar({calendar: CALENDAR, year: YEAR, month: MONTH, monthName: MONTH_NAME, field: FIELD, store: Store, weekday: WEEK_DAY}, {})



 

    


 



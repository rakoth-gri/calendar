import {
  CALENDAR,  
  WEEK_DAY,
  INPUT_LIST
} from "./constants/index.js";
// Статический класс состяния
import { Store } from "./store/Store.js";
// Класс календаря
import Calendar from "./services/Calendar.js"

const calendar = new Calendar({calendar: CALENDAR, store: Store, weekday: WEEK_DAY, inputList: INPUT_LIST}, {})


 
 

    


 



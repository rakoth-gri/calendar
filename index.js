import { CALENDAR, WEEK_DAY, INPUT_LIST } from "./constants/index.js";
// Статический класс состяния
import { Store } from "./store/Store.js";
// Класс календаря
import Calendar from "./services/Calendar.js";

const calendar = new Calendar(
  {
    calendar: CALENDAR,
    store: Store,
    weekday: WEEK_DAY,
    inputList: INPUT_LIST,
  },
  {
    $calendarField: '',
    $year: null,    
    $calendar: { fontFamily: "Ubuntu", backgroundImage: "url('./images/test2.jpg')" },
  }
  
);

// calendar.changeTheme();

// calendar.toggleHidden()
// calendar.toggleHidden()

calendar.logCurrDate()


// calendar.addSelectorStyles("$calendar", "font-family: 'Roboto';")

// calendar.removeSelectorStyles("$calendar")
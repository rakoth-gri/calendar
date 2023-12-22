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
    // $calendar: {backgroundImage: 'url(./images/test1.jpg)'}
   }

);

calendar.changeTheme();

// calendar.toggleHidden()
// calendar.toggleHidden()

// calendar.logCurrDate()
// console.log(calendar.getCurrDateString())

// calendar.removeInlineStyles()

// calendar.addSelectorStyles("$calendar", 'text-transform: uppercase; background: white')

// calendar.removeSelectorStyles("$calendarField")
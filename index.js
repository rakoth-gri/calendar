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
    $calendarField: {      
      transform: "rotateZ(5deg)",
      fontFamily: "Bebas Neue",      
    },
    $year: { backgroundColor: "teal" },
    $month: false,
    $calendar: { fontFamily: "Montserrat", background: './images/test1.jpg' },
  }
);

// calendar.changeTheme();

// calendar.addSelectorStyles("$calendar", "font-family: 'Roboto';")

// calendar.removeSelectorStyles("$calendar")
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
    delay: 8,
    time: true,
  },
  {
    $calendarField: {      
      // fontFamily: "Ubuntu",
    },
    $year: false,
    $month: false,
    // относительные пути изображений в вашем проекте могут отличаться!
    $calendar: {},
    $panelBtn: {},
    $overlay: {},
  }
);

// API




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
    delay: 15,
    time: true,
  },
  {
    $calendarField: {      
      fontFamily: "Nunito Sans",
    },
    $year: { backgroundColor: "teal" },
    $month: false,
    // относительные пути изображений в вашем проекте могут отличаться!
    $calendar: {
      fontFamily: "Montserrat",      
    },
    $overlay: { },
  }
);

// API

calendar.toggleTheme();

calendar.addSelectorStyles("$panelTime", "color: teal;");

// calendar.removeInlineStyles();

// calendar.toggleHidden()

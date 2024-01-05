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
    // относительные пути изображений в вашем проекте могут отличаться!
    $calendar: {
      background: "url(./images/test2.jpg)",
      backgroundPosition: "center",
      color: "whitesmoke",
    },
    $panelBtn: {},
    $overlay: { backdropFilter: "blur(1.7px) grayscale(.5)" },
  }
);

// API

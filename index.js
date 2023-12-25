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
    delay: 10,
  },
  {
    $calendarField: {
      transform: "rotateZ(5deg)",
      fontFamily: "Nunito Sans",
    },
    $year: { backgroundColor: "teal" },
    $month: false,
    // относительные пути изображений в вашем проекте могут отличаться!
    $calendar: { fontFamily: "Montserrat", background: 'url(./images/test1.jpg)' },
  }
);

// API

// calendar.addSelectorStyles("$calendar", 'font-family: "Nunito Sans"');


window.addEventListener("resize", () =>
  console.log(document.documentElement.clientWidth)
);

calendar.toggleTheme()
// setInterval(() => calendar.toggleHidden(), 2000)


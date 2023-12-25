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
    $calendar: {
      backgroundImage: "url(./images/test1.jpg)",
      color: "whitesmoke",
    },
    $overlay: { backdropFilter: "grayscale(.55) blur(2.1px)" },
  }
);

// API

// calendar.addSelectorStyles("$calendar", 'font-family: "Nunito Sans"');

window.addEventListener("resize", () =>
  console.log(document.documentElement.clientWidth)
);

calendar.toggleTheme();
// setInterval(() => calendar.toggleHidden(), 2000)

import { CALENDAR, WEEK_DAY, INPUT_LIST } from "./constants/index.js";
import { Store } from "./store/Store.js";
import Calendar from "./services/Calendar.js";
const calendar = new Calendar({
    calendar: CALENDAR,
    store: Store,
    weekday: WEEK_DAY,
    inputList: INPUT_LIST,
    delay: 8,
    time: true,
}, {
    $calendarField: {},
    $year: false,
    $calendar: {
        background: "url(./images/test2.jpg)",
        backgroundPosition: "center",
        color: "whitesmoke",
    },
    $panelBtn: {},
    $overlay: { backdropFilter: "blur(1.7px) grayscale(.5)" },
});
calendar.removeInlineStyles();

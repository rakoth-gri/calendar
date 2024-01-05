import Calendar from "./services/Calendar.js";
const calendar = new Calendar({ time: true });
calendar.addSelectorStyles("$calendar", "font-weight: 700;");
calendar.addSelectorStyles("$calendar", "font-style: italic;");
calendar.removeSelectorStyles("$calendar");

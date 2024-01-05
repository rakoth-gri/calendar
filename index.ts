// Main Constructor:
import Calendar from "./services/Calendar.js";

const calendar = new Calendar({time: true});

// API

calendar.addSelectorStyles("$calendar", "font-weight: 700;")

calendar.addSelectorStyles("$calendar", "font-style: italic;")

calendar.removeSelectorStyles("$calendar")
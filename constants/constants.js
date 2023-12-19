const CALENDAR = document.querySelector(".calendar"),
  YEAR = CALENDAR.querySelector(".calendar__year"),
  MONTH = CALENDAR.querySelector(".calendar__month"),
  MONTH_NAME = CALENDAR.querySelector(".calendar__panel_monthName"),
  FIELD = CALENDAR.querySelector(".calendar__field");

const MONTH_MAP = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

const WEEK_DAY = ["Пн", "Вт", "Cр", "Чт", "Пт", "Cб", "Вс"]

export { CALENDAR, YEAR, MONTH, MONTH_NAME, MONTH_MAP, FIELD, WEEK_DAY};

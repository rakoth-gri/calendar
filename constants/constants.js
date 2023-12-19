const CALENDAR = document.querySelector(".calendar");

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

const INPUT_LIST = [
  {
    id: "year",
    labelText: "год:",
    type: "number",
    cls: "calendar__year",
    min: "1900",
    max: "2100",
    step: "1",
    name: "year",
    autofocus: true
  },
  {
    id: "month",
    labelText: "месяц:",
    type: "range",
    cls: "calendar__month",
    min: "0",
    max: "11",
    step: "1",
    name: "month",
    autofocus: false
  }
]

export { CALENDAR, MONTH_MAP, WEEK_DAY, INPUT_LIST};
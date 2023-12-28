const CALENDAR = document.querySelector(".calendar");
const ROOT = document.querySelector(":root");

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

const WEEK_DAY = ["Пн", "Вт", "Cр", "Чт", "Пт", "Cб", "Вс"];

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
    autofocus: true,
    listFor: "defaultYears",
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
    autofocus: false,
    listFor: false,
  },
];

const YEARS_LIST = [
  2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
  2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027,
];

const CONTROLS_LIST = [
  {
    cls: "bi bi-moon-stars-fill",
    id: "toggleTheme",
  },
  {
    cls: "bi bi-x-circle-fill",
    id: "toggleHidden",
  },
  {
    cls: "bi bi-clock",
    id: "toggleTimer",
  },
  {
    cls: "i bi-arrow-bar-left",
    id: "toggleControls",
  },
];

const NAMES = ["year", "month"];
const CLASSES = ["calendar__field_cell", "calendar__panel_btn", "calendar__controls_open", "bi"];

export {
  CALENDAR,
  MONTH_MAP,
  WEEK_DAY,
  CONTROLS_LIST,
  INPUT_LIST,
  ROOT,
  YEARS_LIST,
  NAMES,
  CLASSES,
};

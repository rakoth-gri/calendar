import { createDataList, monthFormat } from "./services.js";
import {names, classes} from "../constants/index.js"

export default class Calendar {
  constructor({ calendar, store, weekday, inputList }, options) {
    // DOM_ELEMENTS
    this.$calendar = calendar;
    this.$monthName = null;
    this.$year = null;
    this.$month = null;
    this.$calendarField = null;
    this.$cells = null;
    // CONTROLLER
    this.store = store;
    // METHODS
    this.init(weekday, inputList);
  }

  // TEMP BUILDER (порядок имеет значение) ---
  init(weekday, inputList) {
    // 1
    this.renderMarkUp(inputList);
    // 2
    this.renderGrid(this.$calendarField, 35, weekday);
    // 4 (Подписываемся на изменение this.store.currDate)
    this.store.observe(() => {
      this.renderMonthDates(
        createDataList(this.store.datesInMonth(this.store.currDate)),
        this.$cells
      );
      this.store.showCurrDate(
        this.$year,
        this.$month,
        this.$monthName,
        monthFormat
      );
    });
    this.addChangeListenerToCalendar();
    // 4
    this.addClickListenerToCalendar();
  }

  // отрисовываем разметку календаря 1 раз
  renderMarkUp(list) {
    this.$calendar.innerHTML = `
      ${list
        .map(
          ({ labelText, type, cls, min, max, step, name, autofocus, id }) => `
        <label id="${id}">
          ${labelText}
          <input
            type="${type}"
            class="${cls}"
            min="${min}"
            max="${max}"
            step="${step}"
            name="${name}"
            ${autofocus ? "autofocus" : ""}
          />
      </label>`
        )
        .join("")}
      <div class="calendar__panel">
        <button class="calendar__panel_btn"> сегодня </button>
        <div class="calendar__panel_monthName"></div>
      </div>      
      <div class="calendar__field"></div>    
    `;
    this.$calendarField = this.$calendar.querySelector(".calendar__field");
    this.$monthName = this.$calendar.querySelector(
      ".calendar__panel_monthName"
    );
    this.$year = this.$calendar.querySelector(".calendar__year");
    this.$month = this.$calendar.querySelector(".calendar__month");
  }

  // отрисовываем сетку календаря 1 раз
  renderGrid(container, maxCellNumber, weekday) {
    // формируем массив с данными и заполняем шаблон
    const HTML = createDataList(maxCellNumber)
      .map((i) => `<div data-id="${i + 1}" class="calendar__field_cell"></div>`)
      .join("");

    const HEADINGS = weekday
      .map((day) => `<div class="calendar__field_header">${day}</div>`)
      .join("");
    container.insertAdjacentHTML("beforeend", HEADINGS + HTML);
    this.$cells = document.querySelectorAll(".calendar__field_cell");
  }

  // Вызываем при каждои изменении состояния объекта this.store.currData
  renderMonthDates(datesList, cells) {
    // очищаем поля календаря и активные классы перед отрисовкой:
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("active");
    });
    datesList.forEach((i) => {
      i + 1 === this.store.currDate.date && cells[i].classList.add("active");
      cells[i].textContent = i + 1;
    });
  }

  // Секция Обработчиков событий ------
  // 1---
  calendarChangeHandler = (e) => {
    if (!names.includes(e.target.name)) return;

    const { name, value } = e.target;

    this.store.setCurrDate(name, +value);
  };

  addChangeListenerToCalendar() {
    this.$calendar.addEventListener("change", this.calendarChangeHandler);
  }

  // 2---
  calendarClickHandler = ({
    target: {
      dataset: { id },
      className,
    },
  }) => {
    if (!classes.some((cls) => className.includes(cls))) return;

    id ? this.store.setCurrDate("date", +id) : this.store.setCurrDate(null, {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      date: new Date().getDate(),
    })    
  };

  addClickListenerToCalendar() {
    this.$calendar.addEventListener("click", this.calendarClickHandler);
  }

  // CUSTOMIZE WITH API -----

  // изменение видимости
  toggleHidden() {
    this.$calendar.classList.toggle("hidden");
  }

  // Логирование для визуальных тестов ---
  logCurrDate() {
    console.log(this.store.currDate);
  }

  getCurrDate() {
    const { year, month, date } = this.store.currDate;
    return `${year} ${month} ${date}`;
  }
}

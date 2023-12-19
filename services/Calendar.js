import { createDataList, monthFormat } from "./services.js";

const names = ["year", "month"];
const classes = ["calendar__field_cell", "calendar__panel_btn"]

export default class Calendar {
  constructor(
    { calendar, year, month, monthName, field, store, weekday },
    options
  ) {
    // DOM_ELEMENTS
    this.$calendar = calendar;
    this.$monthName = monthName;
    this.$year = year;
    this.$month = month;
    this.$cells = null;
    // CONTROLLER
    this.store = store;
    // METHODS
    this.init(year, month, this.$monthName, field, weekday);
  }

  // TEMP BUILDER (порядок имеет значение) ---
  init(year, month, monthName, field, weekday) {
    this.renderGrid(field, 35, weekday);
    this.renderMonthDates(
      createDataList(this.store.datesInMonth(this.store.currDate)),
      this.$cells
    );
    this.addChangeListenerToCalendar();
    this.addClickListenerToCalendar();
    this.store.showCurrDate(year, month, monthName, monthFormat);
  }

  // отрисовываем сетку календаря единственный раз
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

    if(name === names[1]) this.$monthName.textContent = monthFormat(+value);

    this.store.setCurrDate(name, +value);

    this.renderMonthDates(
      createDataList(this.store.datesInMonth(this.store.currDate)),
      this.$cells
    );
  };

  addChangeListenerToCalendar() {
    this.$calendar.addEventListener("change", this.calendarChangeHandler);
  }

  // 2---
  calendarClickHandler = ({target: {dataset:{id}, className}}) => {
    if (!classes.includes(className)) return;

    if(id) {
      this.store.currDate.date = +id;
    }
    else {
      Object.assign(this.store.currDate, {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        date: new Date().getDate()
      })
      this.store.showCurrDate(this.$year, this.$month, this.$monthName, monthFormat);  
    }    
    
    this.renderMonthDates(
      createDataList(this.store.datesInMonth(this.store.currDate)),
      this.$cells
    );
  };

  addClickListenerToCalendar() {
    this.$calendar.addEventListener("click", this.calendarClickHandler);
  }

  toggleHidden() {
    this.$calendar.classList.toggle("hidden")
  }
}

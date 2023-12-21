import { getIntList, monthFormat, getHTML, themeToggler } from "./services.js";
import { NAMES, CLASSES, YEARS_LIST } from "../constants/index.js";

export default class Calendar {
  constructor({ calendar, store, weekday, inputList }, options) {
    // DOM_ELEMENTS
    this.$calendar = calendar;
    this.$monthName = null;
    this.$year = null;
    this.$month = null;
    this.$calendarField = null;
    this.$cells = null;
    // LOGICAL
    this.store = store;
    this.theme = "light";
    // METHODS
    this.init(weekday, inputList, options);
  }

  // BUILDER SCHEME ---
  init(weekday, inputList, options) {
    // 1 --
    this.renderMarkUp(inputList);
    // 2 --
    this.renderGrid(this.$calendarField, 35, weekday);
    // 3 --
    this.setInlineStyles(options);
    // 4 -- (Подписываемся на изменение this.store.currDate)
    this.store.observe(() => {
      this.renderMonthDates(
        getIntList(this.store.datesInMonth(this.store.currDate)),
        this.$cells
      );
      this.store.showCurrDate(
        this.$year,
        this.$month,
        this.$monthName,
        monthFormat
      );
    });
    // 5 --
    this.addChangeListenerToCalendar();
    this.addClickListenerToCalendar();
  }

  // отрисовываем разметку календаря 1 раз
  renderMarkUp(list) {
    this.$calendar.innerHTML = `
    <div class="calendar__overlay"></div>
      ${getHTML(
        list,
        ({
          labelText,
          type,
          cls,
          min,
          max,
          step,
          name,
          autofocus,
          id,
          listFor,
        }) => `
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
              ${listFor ? `list=${listFor}` : ""}
            />
          </label>
        `
      )}
      <datalist id="${list[0].listFor}">
          ${getHTML(
            YEARS_LIST,
            (year) => `<option value="${year}"></option>`
          )}  
      </datalist>
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
    const HTML = getHTML(
      getIntList(maxCellNumber),
      (i) => `<div data-id="${i + 1}" class="calendar__field_cell"></div>`
    );
    const HEADINGS = getHTML(
      weekday,
      (day) => `<div class="calendar__field_header">${day}</div>`
    );

    container.insertAdjacentHTML("beforeend", HEADINGS + HTML);
    this.$cells = document.querySelectorAll(".calendar__field_cell");
  }

  // рендерим кастомные inline-стили только 1 раз
  setInlineStyles(styled) {
    if (!Object.values(styled).some((val) => val)) {
      console.error("Значения полей объекта 'styled' не заданы...");
      return;
    }

    Object.keys(styled).forEach((selector) => {
      // Обработка ошибок
      const inline = styled[selector] ?? {};

      if (
        Object.keys(inline).length &&
        Object.values(inline).some((val) => val)
      ) {
        Object.keys(inline).forEach(
          (key) => (this[selector].style[key] = inline[key])
        );
      } else return;
    });
  }

  // Вызываем при каждом изменении this.store.currData
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

  // События ------
  // 1--
  calendarChangeHandler = ({ target: { name, value } }) => {
    if (!NAMES.includes(name)) return;
    this.store.setCurrDate(name, +value);
  };

  addChangeListenerToCalendar() {
    this.$calendar.addEventListener("change", this.calendarChangeHandler);
  }

  // 2--
  calendarClickHandler = ({
    target: {
      dataset: { id },
      className,
    },
  }) => {
    if (!CLASSES.some((cls) => className.includes(cls))) return;
    id
      ? this.store.setCurrDate("date", +id)
      : this.store.setCurrDate(null, {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          date: new Date().getDate(),
        });
  };

  addClickListenerToCalendar() {
    this.$calendar.addEventListener("click", this.calendarClickHandler);
  }

  // API --

  // изменение видимости календаря
  toggleHidden() {
    this.$calendar.classList.toggle("hidden");
  }

  // Логирование для тестов ---
  logCurrDate() {
    console.log(this.store.currDate);
  }

  // получение строки с текущей датой
  getCurrDate() {
    const { year, month, date } = this.store.currDate;
    return `${year} ${month} ${date}`;
  }

  // удаление всех кастомных inline-стилей
  removeInlineStyles() {
    [this.$calendar, this.$year, this.$month, this.$calendarField].forEach(
      (el) => el.removeAttribute("style")
    );
  }

  // добавление кастомных inline-стилей по Селектору
  addSelectorStyles(selector, styles) {    

    const currInlineStyles = this[selector].getAttribute("style");
    this[selector].setAttribute("style", currInlineStyles + styles)
   
  }

  // удаление кастомных inline-стилей по Селектору
  removeSelectorStyles(selector) {
    this[selector].removeAttribute("style");
  }

  // переключение темы
  changeTheme() {
    this.theme === "light" ? (this.theme = "dark") : (this.theme = "light");
    // if(new Date().getHours() >= 20) this.theme = "dark"
    themeToggler(this.theme);
  }
}

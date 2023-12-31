import {
  getIntList,
  monthFormat,
  getHTML,
  changeTheme,
  getFirstMonthDay,
  cellsByFirstMonthDay
} from "./services.js";
import { NAMES, CLASSES, YEARS_LIST } from "../constants/index.js";

export default class Calendar {
  constructor({ calendar, store, weekday, inputList, delay }, options) {
    // DOM_ELEMENTS
    this.$calendar = calendar;
    this.$overlay = null;
    this.$monthName = null;
    this.$year = null;
    this.$month = null;
    this.$calendarField = null;
    this.$cells = null;
    // LOGICAL
    this.store = store;
    this.theme = "light";
    this.delay = delay;
    // METHODS
    this.init(weekday, inputList, delay, options);
  }

  // BUILDER SCHEME ---
  init(weekday, inputList, delay, options) {
    // 1 --
    this.renderMarkUp(inputList);
    // 2 --
    this.renderGrid(this.$calendarField, 42, weekday);
    // 3 --
    this.setInlineStyles(options);
    // 4 -- (Подписываемся на изменение this.store.currDate)
    this.store.observe(() => {
      this.renderMonthDates(
        getIntList(this.store.datesInMonth(this.store.currDate)),
        this.$cells,
        delay
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
    this.$overlay = this.$calendar.querySelector(".calendar__overlay");
  }

  // отрисовываем сетку календаря 1 раз
  renderGrid(container, maxCellNumber, weekday) {
    // формируем массив с данными и заполняем шаблон
    const HTML = getHTML(
      getIntList(maxCellNumber),
      (i) => `<div data-id="${i}" class="calendar__field_cell"></div>`
    );
    const HEADINGS = getHTML(
      weekday,
      (day) => `<div class="calendar__field_header">${day}</div>`
    );

    container.insertAdjacentHTML("beforeend", HEADINGS + HTML);
    this.$cells = Array.from(
      document.querySelectorAll(".calendar__field_cell")
    );
  }

  // рендерим кастомные inline-стили только 1 раз
  setInlineStyles(is) {
    if (!Object.values(is).some((val) => val)) {
      console.error("Значения полей объекта 'is' не заданы...");
      return;
    }

    Object.keys(is).forEach((selector) => {
      // Проверка:
      if(!is[selector]) return; 

      if (Object.values(is[selector]).some((val) => val)
      ) 
        Object.keys(is[selector]).forEach(
          (key) => (this[selector].style[key] = is[selector][key])
        );
    });
  }

  // Вызываем при каждом изменении this.store.currData
  renderMonthDates(datesList, cells, delay) {
    // очищаем поля календаря и активные классы перед отрисовкой:
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("active");
    });

    let firstMonthDay = getFirstMonthDay(
      this.store.currDate.year,
      this.store.currDate.month
    );

    cells = cellsByFirstMonthDay(firstMonthDay, cells)

    datesList.forEach((i) => {
      i + 1 === this.store.currDate.date && cells[i].classList.add("active");
      setTimeout(() => {
        cells[i].textContent = i + 1;
      }, delay * i);
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
      textContent,
    },
  }) => {
    if (!CLASSES.some((cls) => className.includes(cls))) return;

    id
      ? this.store.setCurrDate("date", +textContent)
      : this.store.setCurrDate(null, {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          date: new Date().getDate(),
        });

    console.log(this.getCurrDateString());
        
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
  getCurrDateString() {
    const { year, month, date } = this.store.currDate;
    return `${year} ${monthFormat(month)} ${date}`;
  }

  // удаление всех inline-стилей
  removeInlineStyles() {
    [this.$calendar, this.$year, this.$monthName, this.$calendarField, this.$overlay].forEach(
      (el) => el.removeAttribute("style")
    );
  }

  // добавление inline-стилей по Селектору
  addSelectorStyles(selector, styles) {

    if(!styles) return   

    // Проверки:
    let currInlineStyles = this[selector].getAttribute("style") ?? "";    
    
    this[selector].setAttribute("style", (currInlineStyles.match(/;$/) ? currInlineStyles : currInlineStyles + ";") + styles);
  }

  // удаление inline-стилей по Селектору
  removeSelectorStyles(selector) {
    this[selector].removeAttribute("style");
  }

  // переключение темы
  toggleTheme() {
    this.theme === "light" ? (this.theme = "dark") : (this.theme = "light");
    // if(new Date().getHours() >= 20) this.theme = "dark"
    changeTheme(this.theme);
  }
}

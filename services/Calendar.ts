// CLASSES:
import { Store } from "../store/Store.js";
// SERVICES:
import {
  getIntList,
  monthFormat,
  getHTML,
  changeTheme,
  getFirstMonthDay,
  cellsByFirstMonthDay,
  timeFormat,
  getPanelMarkUp,
} from "./services.js";
import {
  NAMES,
  CLASSES,
  YEARS_LIST,
  CONTROLS_LIST,
  CALENDAR,
  INPUT_LIST,
  WEEK_DAY,
} from "../constants/index.js";
// Types:
import {
  I_INPUT_LIST,
  T_CONTROLS_LIST,
  I_CURR_DATE,
  I_INLINE_STYLES,
  T_SELECTORS,
  I_SETTINGS
} from "../types/types";
import { TStore } from "../store/Store";

export default class Calendar {
  $calendar: HTMLDivElement;
  store: TStore;
  $overlay: HTMLDivElement | null;
  $monthName: HTMLDivElement | null;
  $year: HTMLInputElement | null;
  $month: HTMLInputElement | null;
  $panelTime: HTMLDivElement | null;
  $timeSegs: HTMLSpanElement[] | null;
  $cells: HTMLDivElement[] | null; 
  theme: "dark" | "light";
  $panelBtn: HTMLButtonElement | null;
  $controls: HTMLDivElement | null;
  $calendarField: HTMLDivElement | null;
  interval: null | number;

  constructor(
    {
      delay = 10,
      time = false,
    }: Partial<I_SETTINGS>,
    options: I_INLINE_STYLES = {}
  ) {
    // HTML_ELEMENTS
    this.$calendar = CALENDAR;
    this.$overlay = null;
    this.$monthName = null;
    this.$year = null;
    this.$panelTime = null;
    this.$timeSegs = null;
    this.$month = null;
    this.$calendarField = null;
    this.$cells = null;
    this.$panelBtn = null;
    this.$controls = null;
    // LOGICAL
    this.store = Store;
    this.theme = "light";    
    this.interval = null;
    console.log(delay, time);
    
    // METHODS
    this.init(WEEK_DAY, INPUT_LIST, delay, options, time);
  }

  // BUILDER SCHEME ---
  init(
    weekDay: string[],
    inputList: I_INPUT_LIST[],
    delay: number,
    options: I_INLINE_STYLES,
    time: boolean
  ) {
    // 1 --
    this.renderMarkUp(inputList);
    // 2 --
    this.renderGrid(this.$calendarField as HTMLDivElement, 42, weekDay);
    // 3 --
    this.setInlineStyles(options);
    // 4 -- (Подписываемся на изменение this.store.currDate)
    this.store.observe(() => {
      this.renderMonthDates(
        getIntList(this.store.datesInMonth(this.store.currDate)),
        this.$cells as HTMLDivElement[],
        delay
      );
      this.store.showCurrDate(
        this.$year as HTMLInputElement,
        this.$month as HTMLInputElement,
        this.$monthName as HTMLDivElement,
        monthFormat
      );
    });
    // 5 --
    this.addChangeListenerToCalendar();
    this.addClickListenerToCalendar();
    // 6. timer
    time && this.toggleTimer();
  }

  // отрисовываем разметку календаря 1 раз
  renderMarkUp(list: I_INPUT_LIST[]) {
    this.$calendar.innerHTML = `
    <div class="calendar__controls_open">
      <i class="bi bi-arrow-bar-right"></i>       
    </div>
    <div class="calendar__controls">       
      ${getHTML(
        CONTROLS_LIST,
        ({ cls, id }) => `<i class="${cls}" id="${id}"></i>`
      )}  
    </div>   
    <div class="calendar__overlay"></div>    
      ${getHTML<I_INPUT_LIST>(
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
      ${getPanelMarkUp()} 
      <div class="calendar__field"></div>                
    `;
    // initializing DOM-constants:
    this.$calendarField = this.$calendar.querySelector(".calendar__field");
    this.$monthName = this.$calendar.querySelector(
      ".calendar__panel_monthName"
    );
    this.$year = this.$calendar.querySelector(".calendar__year");
    this.$month = this.$calendar.querySelector(".calendar__month");
    this.$overlay = this.$calendar.querySelector(".calendar__overlay");
    this.$panelTime = this.$calendar.querySelector(".calendar__panel_time");
    this.$timeSegs = Array.from(this.$calendar.querySelectorAll(".time"));
    this.$panelBtn = this.$calendar.querySelector(".calendar__panel_btn");
    this.$controls = this.$calendar.querySelector(".calendar__controls");
  }

  // отрисовываем сетку календаря 1 раз
  renderGrid(
    container: HTMLDivElement,
    maxCellNumber: number,
    weekDay: string[]
  ) {
    // формируем массив с данными и заполняем шаблон
    const HTML = getHTML(
      getIntList(maxCellNumber),
      (i) => `<div data-id="${i}" class="calendar__field_cell"></div>`
    );
    const HEADINGS = getHTML(
      weekDay,
      (day) => `<div class="calendar__field_header">${day}</div>`
    );

    container.insertAdjacentHTML("beforeend", HEADINGS + HTML);
    this.$cells = Array.from(
      document.querySelectorAll(".calendar__field_cell")
    );
  }

  setInlineStyles(options: any) {
    if (!Object.values(options).some((val) => val)) {
      console.warn(
        "Second parameter of 'Calendar' Constructor got empty property values..."
      );
      return;
    }

    (Object.keys(options) as T_SELECTORS[]).forEach((selector) => {
      // Проверка:
      if (!options[selector]) return;

      if (Object.values(options[selector]).some((val) => val))
        Object.keys(options[selector]).forEach(
          (key: any) =>
            ((this[selector] as HTMLElement).style[key] =
              options[selector][key])
        );
    });
  }

  // Вызываем при каждом изменении this.store.currData
  renderMonthDates(
    datesList: number[],
    cells: HTMLDivElement[],
    delay: number
  ): void {
    // очищаем поля календаря и активные классы перед отрисовкой:
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("active");
    });

    let firstMonthDay = getFirstMonthDay(
      this.store.currDate.year,
      this.store.currDate.month
    );

    cells = cellsByFirstMonthDay(firstMonthDay, cells);

    datesList.forEach((i) => {
      i + 1 === this.store.currDate.date && cells[i].classList.add("active");
      setTimeout(() => {
        cells[i].textContent = String(i + 1);
      }, delay * i);
    });
  }

  toggleControls() {
    (this.$controls as HTMLDivElement).classList.toggle("active");
  }

  // События ------
  // 1--
  calendarChangeHandler = (e: Event) => {
    const { name, value } = e.target as HTMLInputElement;

    if (!NAMES.includes(name)) return;

    this.store.setCurrDate(name as keyof I_CURR_DATE, +value);
  };

  addChangeListenerToCalendar() {
    this.$calendar.addEventListener("change", this.calendarChangeHandler);
  }

  // 2--
  calendarClickHandler = (e: MouseEvent) => {
    const { id, className, textContent } = e.target as HTMLElement;

    if (!CLASSES.some((cls) => className.includes(cls))) return;

    switch (className) {
      case CLASSES[0]:
        this.store.setCurrDate("date", +(textContent as string));
        break;
      case CLASSES[1]:
        this.store.setCurrDate(null, {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          date: new Date().getDate(),
        });
        break;
      default:
        if (!id) {
          this.toggleControls();
          return;
        }
        this[id as T_CONTROLS_LIST["id"]]();
        if ((this.$controls as HTMLDivElement).classList.contains("active"))
          this.toggleControls();
        break;
    }
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
    [
      this.$calendar,
      this.$year,
      this.$monthName,
      this.$calendarField,
      this.$overlay,
      this.$panelTime,
      this.$panelBtn,
    ].forEach((el) => (el as HTMLElement).removeAttribute("style"));
  }

  // добавление inline-стилей по Селектору
  addSelectorStyles(selector: T_SELECTORS, styles: string) {
    if (!styles) return;

    // Проверка:
    let currInlineStyles =
      (this[selector] as HTMLElement).getAttribute("style") ?? "";

    (this[selector] as HTMLElement).setAttribute(
      "style",
      currInlineStyles + styles
    );
  }

  // удаление inline-стилей по Селектору
  removeSelectorStyles(selector: T_SELECTORS) {
    (this[selector] as HTMLElement).removeAttribute("style");
  }

  // переключение темы
  toggleTheme() {
    this.theme === "light" ? (this.theme = "dark") : (this.theme = "light");
    // if(new Date().getHours() >= 20) this.theme = "dark"
    changeTheme(this.theme);
  }

  toggleTimer() {
    (this.$panelTime as HTMLDivElement).classList.toggle("active");
    this.interval
      ? clearInterval(this.interval)
      : (this.interval = setInterval(() => {
          (
            [
              timeFormat(new Date().getHours()),
              timeFormat(new Date().getMinutes()),
            ] as number[]
          ).forEach(
            (t, i) =>
              ((this.$timeSegs as HTMLSpanElement[])[i].textContent = "" + t)
          );
        }, 60000));
  }
}

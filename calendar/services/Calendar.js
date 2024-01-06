import { Store } from "../store/Store.js";
import { getIntList, monthFormat, getHTML, changeTheme, getFirstMonthDay, cellsByFirstMonthDay, timeFormat, getPanelMarkUp, } from "./services.js";
import { NAMES, CLASSES, YEARS_LIST, CONTROLS_LIST, CALENDAR, INPUT_LIST, WEEK_DAY, } from "../constants/constants.js";
export default class Calendar {
    $calendar;
    store;
    $overlay;
    $monthName;
    $year;
    $month;
    $panelTime;
    $timeSegs;
    $cells;
    theme;
    $panelBtn;
    $controls;
    $calendarField;
    interval;
    constructor({ delay = 10, time = false, }, options = {}) {
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
        this.store = Store;
        this.theme = "light";
        this.interval = null;
        this.init(WEEK_DAY, INPUT_LIST, delay, options, time);
    }
    init(weekDay, inputList, delay, options, time) {
        this.renderMarkUp(inputList);
        this.renderGrid(this.$calendarField, 42, weekDay);
        this.setInlineStyles(options);
        this.store.observe(() => {
            this.renderMonthDates(getIntList(this.store.datesInMonth(this.store.currDate)), this.$cells, delay);
            this.store.showCurrDate(this.$year, this.$month, this.$monthName, monthFormat);
        });
        this.addChangeListenerToCalendar();
        this.addClickListenerToCalendar();
        time && this.toggleTimer();
    }
    renderMarkUp(list) {
        this.$calendar.innerHTML = `
    <div class="calendar__controls_open">
      <i class="bi bi-arrow-bar-right"></i>       
    </div>
    <div class="calendar__controls">       
      ${getHTML(CONTROLS_LIST, ({ cls, id }) => `<i class="${cls}" id="${id}"></i>`)}  
    </div>   
    <div class="calendar__overlay"></div>    
      ${getHTML(list, ({ labelText, type, cls, min, max, step, name, autofocus, id, listFor, }) => `
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
        `)}
      <datalist id="${list[0].listFor}">
          ${getHTML(YEARS_LIST, (year) => `<option value="${year}"></option>`)}  
      </datalist>
      ${getPanelMarkUp()} 
      <div class="calendar__field"></div>                
    `;
        this.$calendarField = this.$calendar.querySelector(".calendar__field");
        this.$monthName = this.$calendar.querySelector(".calendar__panel_monthName");
        this.$year = this.$calendar.querySelector(".calendar__year");
        this.$month = this.$calendar.querySelector(".calendar__month");
        this.$overlay = this.$calendar.querySelector(".calendar__overlay");
        this.$panelTime = this.$calendar.querySelector(".calendar__panel_time");
        this.$timeSegs = Array.from(this.$calendar.querySelectorAll(".time"));
        this.$panelBtn = this.$calendar.querySelector(".calendar__panel_btn");
        this.$controls = this.$calendar.querySelector(".calendar__controls");
    }
    renderGrid(container, maxCellNumber, weekDay) {
        const HTML = getHTML(getIntList(maxCellNumber), (i) => `<div data-id="${i}" class="calendar__field_cell"></div>`);
        const HEADINGS = getHTML(weekDay, (day) => `<div class="calendar__field_header">${day}</div>`);
        container.insertAdjacentHTML("beforeend", HEADINGS + HTML);
        this.$cells = Array.from(document.querySelectorAll(".calendar__field_cell"));
    }
    setInlineStyles(options) {
        if (!Object.values(options).some((val) => val)) {
            console.warn("Second parameter of 'Calendar' Constructor got empty property values...");
            return;
        }
        Object.keys(options).forEach((selector) => {
            if (!options[selector])
                return;
            if (Object.values(options[selector]).some((val) => val))
                Object.keys(options[selector]).forEach((key) => (this[selector].style[key] =
                    options[selector][key]));
        });
    }
    renderMonthDates(datesList, cells, delay) {
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove("active");
        });
        let firstMonthDay = getFirstMonthDay(this.store.currDate.year, this.store.currDate.month);
        cells = cellsByFirstMonthDay(firstMonthDay, cells);
        datesList.forEach((i) => {
            i + 1 === this.store.currDate.date && cells[i].classList.add("active");
            setTimeout(() => {
                cells[i].textContent = String(i + 1);
            }, delay * i);
        });
    }
    toggleControls() {
        this.$controls.classList.toggle("active");
    }
    calendarChangeHandler = (e) => {
        const { name, value } = e.target;
        if (!NAMES.includes(name))
            return;
        this.store.setCurrDate(name, +value);
    };
    addChangeListenerToCalendar() {
        this.$calendar.addEventListener("change", this.calendarChangeHandler);
    }
    calendarClickHandler = (e) => {
        const { id, className, textContent } = e.target;
        if (!CLASSES.some((cls) => className.includes(cls)))
            return;
        switch (className) {
            case CLASSES[0]:
                this.store.setCurrDate("date", +textContent);
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
                this[id]();
                if (this.$controls.classList.contains("active"))
                    this.toggleControls();
                break;
        }
        console.log(this.getCurrDateString());
    };
    addClickListenerToCalendar() {
        this.$calendar.addEventListener("click", this.calendarClickHandler);
    }
    toggleHidden() {
        this.$calendar.classList.toggle("hidden");
    }
    logCurrDate() {
        console.log(this.store.currDate);
    }
    getCurrDateString() {
        const { year, month, date } = this.store.currDate;
        return `${year} ${monthFormat(month)} ${date}`;
    }
    removeInlineStyles() {
        [
            this.$calendar,
            this.$year,
            this.$monthName,
            this.$calendarField,
            this.$overlay,
            this.$panelTime,
            this.$panelBtn,
        ].forEach((el) => el.removeAttribute("style"));
    }
    addSelectorStyles(selector, styles) {
        if (!styles)
            return;
        let currInlineStyles = this[selector].getAttribute("style") ?? "";
        this[selector].setAttribute("style", currInlineStyles + styles);
    }
    removeSelectorStyles(selector) {
        this[selector].removeAttribute("style");
    }
    toggleTheme() {
        this.theme === "light" ? (this.theme = "dark") : (this.theme = "light");
        changeTheme(this.theme);
    }
    toggleTimer() {
        this.$panelTime.classList.toggle("active");
        this.interval
            ? clearInterval(this.interval)
            : (this.interval = setInterval(() => {
                [
                    timeFormat(new Date().getHours()),
                    timeFormat(new Date().getMinutes()),
                ].forEach((t, i) => (this.$timeSegs[i].textContent = "" + t));
            }, 60000));
    }
}

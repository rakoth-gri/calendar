import { MONTH_MAP, ROOT } from "../constants/index.js";

// (num:number) => string
const monthFormat = (num) => MONTH_MAP[num];

// (num:number) => string | number
const timeFormat = (time) => time < 10 ? `0${time}` : time;

// (len:number) => Array<number>
const getIntList = (len) => new Array(len).fill().map((_, i) => i);

// <T>(list: T[], cb: (args: T) => string ) => string
const getHTML = (list, cb) => list.map(cb).join("");

// (num:string) => void
const changeTheme = (theme) => {    
    ROOT.style.setProperty('--app-default-color', `var(--app-${theme}-color)`)
    ROOT.style.setProperty('--app-default-bg', `var(--app-${theme}-bg)`)
}

// (year:number, month: number) => number
const getFirstMonthDay = (year, month) => {    
    return new Date(year, month, 1).getDay();    
}

// (firstDay:number, cells: HTMLDIVELEMENT[]) => HTMLDIVELEMENT[]
const cellsByFirstMonthDay = (firstDay, cells) => firstDay > 0 ? cells.slice(firstDay - 1) : cells.slice(6)


// () => string
const getPanelMarkUp = () => `
    <div class="calendar__panel">
        <button class="calendar__panel_btn"> сегодня </button>
        <div class="calendar__panel_time">
            <span class="time">${timeFormat(new Date().getHours())}</span>
            <span>:</span>
            <span class="time">${timeFormat(new Date().getMinutes())}</span>
        </div>
        <div class="calendar__panel_monthName"></div>        
    </div>
`
export { monthFormat, getIntList, getHTML, changeTheme, getFirstMonthDay, cellsByFirstMonthDay, timeFormat, getPanelMarkUp };



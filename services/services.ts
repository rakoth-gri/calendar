import { MONTH_MAP, ROOT } from "../constants/index.js";

const monthFormat = (num: number) => MONTH_MAP[num];

const timeFormat = (time: number): string | number => time < 10 ? `0${time}` : time;

const getIntList = (len: number): number[] => new Array(len).fill('').map((_, i) => i);

const getHTML = <T>(list: T[], cb: (i: T) => string): string => list.map(cb).join("");

const changeTheme = (theme: string): void => {    
    ROOT.style.setProperty('--app-default-color', `var(--app-${theme}-color)`)
    ROOT.style.setProperty('--app-default-bg', `var(--app-${theme}-bg)`)
}

const getFirstMonthDay = (year: number, month: number): number => {    
    return new Date(year, month, 1).getDay();    
}

const cellsByFirstMonthDay = (firstDay: number, cells: HTMLDivElement[]) => firstDay > 0 ? cells.slice(firstDay - 1) : cells.slice(6)

const getPanelMarkUp = (): string => `
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



import { MONTH_MAP, ROOT } from "../constants/constants.js";
const monthFormat = (num) => MONTH_MAP[num];
const timeFormat = (time) => time < 10 ? `0${time}` : time;
const getIntList = (len) => new Array(len).fill('').map((_, i) => i);
const getHTML = (list, cb) => list.map(cb).join("");
const changeTheme = (theme) => {
    ROOT.style.setProperty('--app-default-color', `var(--app-${theme}-color)`);
    ROOT.style.setProperty('--app-default-bg', `var(--app-${theme}-bg)`);
};
const getFirstMonthDay = (year, month) => new Date(year, month, 1).getDay();
const cellsByFirstMonthDay = (firstDay, cells) => firstDay > 0 ? cells.slice(firstDay - 1) : cells.slice(6);
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
`;
export { monthFormat, getIntList, getHTML, changeTheme, getFirstMonthDay, cellsByFirstMonthDay, timeFormat, getPanelMarkUp };

import { MONTH_MAP, ROOT } from "../constants/index.js";

// (num:number) => string
const monthFormat = (num) => MONTH_MAP[num];

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

// (firstDay:number, cells: HTMLDIVELEMENT[]) => number
const cellsByFirstMonthDay = (firstDay, cells) => firstDay > 0 ? cells.slice(firstDay - 1) : cells.slice(6)

export { monthFormat, getIntList, getHTML, changeTheme, getFirstMonthDay, cellsByFirstMonthDay };



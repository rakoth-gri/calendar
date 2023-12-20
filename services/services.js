import { MONTH_MAP } from "../constants/index.js";

// (num:number) => string
const monthFormat = (num) => MONTH_MAP[num];

// (len:number) => Array<number>
const getIntList = (len) => new Array(len).fill().map((_, i) => i);

// <T>(list: T[], cb: (args: T) => string ) => string
const getHTML = (list, cb) => list.map(cb).join("");

export { monthFormat, getIntList, getHTML };

import { I_CURR_DATE, U_MONTHS } from "../types/types";

export class Store {
  public static currDate: I_CURR_DATE = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate(),
  };

  public static subs: (() => void)[] = [];

  static showCurrDate(
    year: HTMLInputElement,
    month: HTMLInputElement,
    monthName: HTMLDivElement,
    cb: (num: number) => U_MONTHS
  ) {
    year.value = `${Store.currDate.year}`;
    month.value = `${Store.currDate.month}`;
    monthName.textContent = cb(Store.currDate.month);
  }

  static datesInMonth({ year, month }: I_CURR_DATE): number {
    if (month === 0 || month === 11) return 31;
    return new Date(year, month + 1, 0).getDate();
  }
 
  static setCurrDate = (
    key: keyof I_CURR_DATE | null,
    val: number | I_CURR_DATE
  ) => {
    if (key && typeof val === "number") {
      Store.currDate[key] = val;
    } else Object.assign(Store.currDate, val);    
    Store.subs.forEach((cb) => cb());
  };

  static observe = (cb: () => void) => {
    if (!Store.subs.length) {
      Store.subs.push(cb);
      Store.subs.forEach((cb) => cb());
    }
  };
} 

export type TStore = typeof Store



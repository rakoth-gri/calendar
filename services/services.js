import { MONTH_MAP } from "../constants/constants.js"

// принимаем только числовые значения
export const monthFormat = (num) => MONTH_MAP[num]

// функция формирования числового массива данных

// (len:number) => Array<number>
export const createDataList = (len) => {
    return new Array(len)
        .fill()
        .map((_, i) => i)
}

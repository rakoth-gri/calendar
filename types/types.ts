export interface I_CURR_DATE {
  year: number;
  month: number;
  date: number;
}

export type T_SELECTORS =
  | "$calendar"
  | "$year"
  | "$monthName"
  | "$calendarField"
  | "$panelTime"
  | "$panelBtn"
  | "$controls"
  | "$overlay";

// export type TInlineStyles = Record<TSelectors, | null
// | boolean
// | undefined
// | ""
// |{ [key: string]: string | number }>

export interface I_INLINE_STYLES {
  $calendar?:
    | null
    | boolean
    | undefined
    | ""
    | { [key: string]: string | number };
  $year?: null | boolean | undefined | "" | { [key: string]: string | number };
  $monthName?:
    | null
    | boolean
    | undefined
    | ""
    | { [key: string]: string | number };
  $calendarField?:
    | null
    | boolean
    | undefined
    | ""
    | { [key: string]: string | number };
  $panelTime?:
    | null
    | boolean
    | undefined
    | ""
    | { [key: string]: string | number };
  $panelBtn?:
    | null
    | boolean
    | undefined
    | ""
    | { [key: string]: string | number };
  $overlay?:
    | null
    | boolean
    | undefined
    | ""
    | { [key: string]: string | number };
}

export type U_MONTHS =
  | "январь"
  | "февраль"
  | "март"
  | "апрель"
  | "май"
  | "июнь"
  | "июль"
  | "август"
  | "сентябрь"
  | "октябрь"
  | "ноябрь"
  | "декабрь";

export interface I_INPUT_LIST {
  id: string;
  labelText: string;
  type: string;
  cls: string;
  min: number;
  max: number;
  step: number;
  name: string;
  autofocus: boolean;
  listFor: string | boolean;
}

export type TCONTROLS_LIST = {
  cls: string;
  id: "toggleTheme" | "toggleHidden" | "toggleTimer" | "toggleControls";
};

export type T_CLASSES =
  | "calendar__field_cell"
  | "calendar__panel_btn"
  | "calendar__controls_open"
  | "bi";

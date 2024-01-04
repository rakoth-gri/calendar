## Приложение _'gri_calendar'_

#### Приложение написано с использованием Vanilla JS, TYPESCRIPT, HTML, СSS, SCSS (SASS).

---

#### Исходная структура папок source-code-файлов представлена ниже:

- **constants**
  - _index.ts_
- **fonts**
  - font 1
  - font 2
  - ...
  - font N
- **images**
  - image1
  - image N
- **scss**
  - index.scss
  - **temp**
    - \_desktop.scss
    - \_fonts.scss
    - \_general.scss
    - \_iconFonts.scss
    - \_media.scss
    - \_vars.scss
- **services**
  - Calendar.ts -- Главный класс для отрисовки DOM-элементов и управления пользовательскими действиями Календаря)
  - services.ts -- вспомогательные утилиты)
- **store**
  - Store.ts -- класс для установки и изменения даты и реактивной отрисовки изменений на UI (стороне пользователя)
- **types**
  - types.ts -- файл с описанием основных типов приложения
- **index.css** -- файл базовых стилей
- **index.min.css** -- файл минифицированных базовых стилей, сгененированный из файлов папки **scss**
- **index.html** -- HTML (показан для примера)
- **index.ts** -- главный индексный файл (показан для примера)
- **readme.md** -- файл описания приложения
- **tsconfig.json** -- конфигурационный файл настроек ts-компилятора

---

#### Входной точкой является файл _index.js_, который подключается к _index.html_. _index.js_ в исходниках имеет атрибут **type='module'** и **defer** (Важно! если Вы не используете сборщики!).

Разметка в Вашем _index.html_ должна выглядить примерно так:

```html
<html lang="en">
  <head>
    <!-- Можно использовать google.fonts API: -->
    <!-- <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
      href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;500;700&family=Nunito+Sans:opsz@6..12&family=Roboto:wght@300;500;700&family=Ubuntu&display=swap"
      rel="stylesheet"
    /> -->
    <!-- Укажите путь до локальных стилей: index.min.css / index.css: -->
    <link rel="stylesheet" href="./index.css" />
    <!-- Укажите путь к Вашему главному JS-файлу: -->
    <script src="./build/index.js" type="module" defer></script>
  </head>
  <body>
    <section class="calendar">
      <!-- Сюда будет динамически добавлена вся разметка Календаря при помощи скриптов -->
    </section>
  </body>
</html>
```

---

#### Для подключения 'базовой конфигурации CSS-стилей' - используйте способы выше!

---

#### Локальные шрифты, интегрированные в 'базовую конфигурации стилей', представлены 5 семействами и иконочным шрифтом от [Bootstrap Icons](https://icons.getbootstrap.com/ "Free, high quality, open source icon library with over 2,000 icons.")!:

- "Roboto",
- "Montserrat",
- "Bebas Neue",
- "Nunito Sans",
- "Ubuntu".
- "bootstrap-icons" - иконочный шрифт от [Bootstrap](https://icons.getbootstrap.com/ "Bootstrap Icons")!
  <br>
  Добавляйте шрифты в папку _'fonts'_ и вносите изменения в базовые _'index.css'_ / _'index.min.css'_, добавляя следующий код:

```css
@font-face {
  font-family: "Roboto";
  src: url("./fonts/Roboto-Light.ttf");
  font-weight: 300;
  font-display: swap;
  font-style: normal;
}
```

---

#### Для инициализации Класса _'Calendar'_ в Вашем js-файле запустите следующий код:

```javascript
// константы
import { CALENDAR, WEEK_DAY, INPUT_LIST } from "./constants/index.js";
// класс состояния даты
import { Store } from "./store/Store.js";
// Класс календаря
import Calendar from "./services/Calendar.js";

const calendar = new Calendar(
  // CALENDAR - это DOM-элемент с классом 'calendar' (см. index.html выше!)
  {
    calendar: CALENDAR,
    store: Store, // управление состоянием даты с автоматической отрисовкой актуальной даты
    weekday: WEEK_DAY,
    inputList: INPUT_LIST,
    delay: 10, // шаг задержки в ms при отображения месячных дат, необязательный параметр
    time: true, // включает панель текущего времени, принимает значения true / false, необязательный параметр
  },
  {} // второй аргумент - объект **options** для передачи пользовательских инлайн-стилей
);
```

---

#### Объект **options** для кастомных inline-стилей:

Для кастомизации стилей при вызове конструктора new Calendar(obj, options), второй аргумент **options** должен иметь вид:

```javascript

// Валидными значениями каждого из 8 Селекторов выступают объекты СSS-стилей, описанные в JS-нотации:

{
  [selector1]: {
      textDecoration: "line-through",
      color: "orangered",
      transform: "rotateZ(5deg)",
    },
  [selector2]: { backgroundColor: "whitesmoke" },
  [selector3]: null,
  [selector4]: { backgroundColor: "green" },
  [selector5]: {backdropFilter: 'grayscale(.8)'},
  [selector6]: {},
  [selector7]: {},
  [selector8]: {},
}

```

Пока, для стилизации через **options** / **API** доступно 5 Селекторов, 'представляющих' 5 DOM-элементов:

- **'$calendar'** - главный контейнер календаря:<br>
  !['$calendar'](images/$calendar.png "$calendar")
- **'$year'** - инпут для выбора календарного года:<br>
  !['$year'](images/$year.png "$year")
- **'$monthName'** - элемент отображения текущего месяца:<br>
  !['$monthName'](images/$monthName.png "$monthName")
- **'$calendarField'** - поле отображения месячных дат:<br>
  !['$calendarField'](images/$calendarField.png "$calendarField")
- **'$panelTime'** - поле отображения текущего времени:<br>
  !['$panelTime'](images/$panelTime.png "$panelTime")
- **'$panelBtn'** - кнопка отображения текущей даты: <br>
  !['$panelBtn'](images/$panelBtn.png "$panelBtn")
- **'$controls'** - панель отдельных API-функций: <br>
  !['$controls'](images/$controls.png "$controls")
- **'$overlay'** - промежуточный слой, находящийся по оси Z между слоем UI-элементов (**'$year'**, **'$monthName'**, **'$calendarField'**) и главным контейнером (**'$calendar'**). Позволяет использовать св-во 'backdrop-filter' при задании изображения в качестве фона Селектора **'$calendar'**.

Пример Валидного объекта **options**:

```javascript

  {
    $calendarField: {
      transform: "rotateZ(5deg)",
      fontFamily: "Nunito Sans",
    },
    $year: { backgroundColor: "teal" },
    $month: false,
    // относительные пути изображений в вашем проекте могут отличаться!
    $calendar: { fontFamily: "Montserrat", background: 'url(./images/test1.jpg)' },
  }

```

Результатом передачи объекта **options** выше будет:

!['customized'](images/styled.png "customized")

##### Допустимо:

- передавать пустой объект **options**;
- стилизовать конкретные Селекторы;
- использовать в качестве значений Селекторов 'лживые' значения: **null** / **undefined** / **''** / **false**

```javascript

  {
    $calendarField: '',
    $year: null,
    $calendar: { fontFamily: "Montserrat", },
  }

```

В примере выше задействованы конкретные Селекторы. У некоторых, вместо объектов СSS-стилей, значениями выступают 'лживые' значения: **ошибки не будет, стили не создадутся!**

#### ВАЖНО! объект **options** манипулирует с inline-стилями (CSS-специфичность: **1, 0, 0, 0**). Если необходимо, в дальнейшем, переопределить или добавить к ним новые стили - воспользуйтесь методами API (рассмотрим далее...), либо вовсе не передавайте св-ва.

#### Примеры аналогичных стилей в CSS и JS:

```css
<style>
    selector {
        color:red;
        background-color: #fff;
        padding-bottom: 25px;
        width: 100%;
        font-weight: 700;
    }

</style>
```

```javascript
// В JS СSS-свойства обычно представляются в виде объектов, ключи которых описаны в _'camelCase'_ нотации, а значения типами string или number(для св-в: 'zIndex','fontWeight')

const obj = {
  color: "red",
  backgroundColor: "#fff",
  paddingBottom: "25px",
  width: "100%",
  fontWeight: 700,
};
```

#### Наследование:

#### Inline-стили, переданные Селектору '$calendar' наследуется всеми компонентами. Это работает при использовании базовых стилей (index.min.css / index.css):

```javascript

  // объект options

  {
    $calendar: { fontFamily: "Ubuntu", color: 'teal', textTransform: 'uppercase'},
  }

```

Результат:

!['inherit'](images/inherit.png "inherit")

---

#### Работа с Селектором '$overlay' актуальна при передачи Селектору '$calendar' в качестве фона - статического изображения:

###### UI-элементы плохо отображаются при фоновой картинке:

```javascript

  // объект options

  {
    $calendar: {backgroundImage: 'url(./images/test1.jpg)'},
    $overlay: null
  }

```

!['overlay1'](images/overlay1.png "overlay1")

###### Все нормально, при стилизации Селектора '$overlay':

```javascript

  // объект options

  {
    $calendar: {
      backgroundImage: "url(./images/test1.jpg)", color: "whitesmoke"},
    $overlay: { backdropFilter: "grayscale(.55) blur(2.1px)" },
  }

```

## !['overlay2'](images/overlay2.png "overlay2")

#### Валидация:

#### касается элемента с Селектором '$year' - инпут для ввода календарного года. Валидными для Селектора '$year' являются значения с 1900 по 2100 гг включительно. Визуализация валидных и невалидных значений реализована.

#### Есть подсказки при вводе календарного года.

#### ПРИМЕРЫ:

- **Невалидный год**:<br>
  !['invalid1'](images/invalid1.png "invalid1")
- **Снова невалидный...**:<br>
  !['invalid2'](images/invalid2.png "invalid2")
- **ВСЕ ОК!**:<br>
  !['valid'](images/valid.png "valid")

#### Кнопка _"Сегодня"_ сбрасывает ранее выбранное состояние и отображает текущую дату!

---

# API:

#### После вызова Инстанса класса **_Calendar_** (cм. выше) нам доступны методы:

#### Темизация:

#### Метод переключает тему: со светлой на темную и наоборот (работает при использовании базовых стилей index.min.css / index.css):

```javascript
// cтартуем:
calendar.toggleTheme();
```

#### Переключение на светлую тему (lightMode):

!['light'](images/light.png "light")

---

#### Изменение видимости:

#### Скрытие / показ Календаря (работает при использовании базовых стилей index.min.css / index.css)

```javascript
// скрыть / показать:

calendar.toggleHidden();
```

---

#### Включение / отключение панели текущего времени (работает при использовании базовых стилей index.min.css / index.css)

```javascript
// скрыть / показать:
calendar.toggleTimer();
```

---

#### Логирование текущей даты:

```javascript

// логируемся:
  calendar.logCurrDate()

// Результат объекта Даты в консоли:

{year: 2023, month: 11, date: 21}

```

---

#### Получение строки с текущей датой:

```javascript
calendar.getCurrDateString() // Результат в консоли:
`2023 декабрь 25`;
```

---

#### Удаление inline-стилей всех Селекторов:

```javascript
// возвращаемся к базовым стилям (index.min.css/ index.css):

calendar.removeInlineStyles();
```

---

#### Удаление inline-стилей определенного Селектора:

```javascript
// Передаем аргументом строку с Селектором, inline-стили которого хотим удалить:

calendar.removeSelectorStyles("$calendarField");
```

---

#### Метод **addSelectorStyles** добавляет inline-стили конкретному Селектору и принимает 2 аргумента:

- ###### selector - один из 8-ми ранее описанных Селекторов;
- ###### styles - строка стилей в СSS-нотации: **'text-transform: uppercase; background: white;'**

```javascript
// Метод не удаляет существующие inline-стили, а добавляет новые. При задании 2 аргумента - необходимо ставить символ `;` после каждого СSS-свойства!

calendar.addSelectorStyles(
  "$calendar",
  "text-transform: uppercase; background: white;"
);
```

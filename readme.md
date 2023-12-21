## Приложение _'gri_calendar'_

#### Приложение написано с использованием Vanilla JS, HTML, СSS, SCSS (SASS).

#### В дальнейшем, планируется перевести Весь проект на Typescript.

---

#### Исходная структура папок source-code-файлов представлена ниже:

- **constants**
  + _index.js_
- **fonts**
  + font 1
  + font 2
  + ...
  + font N
- **images**
  + image1
  + image N  
- **scss**
  + index.scss
  + **temp**
    - temp1.scss
    - temp2.scss
    - tempN.scss
- **services**
  + Calendar.js -- Главный класс для отрисовки DOM-элементов и управления пользовательскими действиями Календаря)
  + services.js -- вспомогательные утилиты)
- **store**
  + Store.js -- класс для установки и изменения даты и реактивной отрисовки изменений на UI (стороне пользователя)
- **index.css** -- файл предустановленных стилей
- **index.min.css** -- файл минифицированных предустановленных стилей, сгененированный из файлов папки scss 
- **index.html** -- HTML (показан для примера)
- **index.js** -- главный индексный файл (показан для примера)
- **readme.md** -- файл описания приложения

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
    <!-- Укажите путь до локальных предустановленных стилей: index.min.css / index.css: -->
    <link rel="stylesheet" href="./index.css" />
    <!-- Укажите путь к Вашему главному JS-файлу: -->
    <script src="./index.js" type="module" defer></script>
  </head>
  <body>
    <section class="calendar">
      <!-- Сюда будет динамически добавлена вся разметка Календаря при помощи скриптов -->
    </section>
  </body>
</html>
```

---

#### Для подключения 'базовой конфигурации стилей' Вы можете использовать способы, показанные в коде Выше!

#### Локальные шрифты, интегрированные в 'базовую конфигурации стилей', представлены 5 семействами: 
  + "Roboto",  
  + "Montserrat",
  + "Bebas Neue",
  + "Nunito Sans",
  + "Ubuntu".
 <br> 
 Внедряйте свои шрифты локально, добавляя новые семейства в папку _'fonts'_ и внося изменения в исходные _'index.css'_ или _'fonts.scss'_ (папка _scss_) файлы:

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
  },
  {} // второй аргумент - объект **options** для передачи кастомных инлайн-стилей
);
```
---

#### Объект **options** для кастомных inline-стилей:

Для кастомизации стилей при вызове конструктора new Calendar(obj, options), второй аргумент **options** должен иметь вид:

```javascript

// Валидными значениями каждого из 4-х Селекторов - выступают объекты СSS-стилей, описанные в Javascript-Нотации:

{
  [selector1]: {
      textDecoration: "line-through",
      color: "orangered",
      transform: "rotateZ(5deg)",
    },
  [selector2]: { backgroundColor: "whitesmoke" },
  [selector3]: null,
  [selector4]: { backgroundColor: "green" },
}

```

В настоящее время, для стилизации через **API** доступно 4 Селектора, которые 'обращаются' к 4 DOM-элементам:  
  + **'$calendar'** - главный контейнер календаря:<br>
    !['$calendar'](images/$calendar.png '$calendar')
  + **'$year'** - инпут для выбора календарного года:<br>
    !['$year'](images/$year.png '$year')
  + **'$monthName'** - элемент отображения текущего месяца:<br>
    !['$monthName'](images/$monthName.png '$monthName')
  + **'$calendarField'** - поле отображения месячных дат:<br>
    !['$calendarField'](images/$calendarField.png '$calendarField')

Пример Валидного объекта **options**:

```javascript

  {
    $calendarField: {      
      transform: "rotateZ(5deg)",
      fontFamily: "Bebas Neue",      
    },
    $year: { backgroundColor: "teal" },
    $month: false,
    // относительные пути изображений в вашем Проекте могут отличаться!
    $calendar: { fontFamily: "Montserrat", background: './images/test1.jpg' },
  }

```
Результатом передачи объекта **options** выше будет:

!['customized'](images/styled.png 'customized')

##### Вы можете:
 + передать пустой объект **options** (применить предустановленные стили файлов index.min.css / index.css:),               
 + стилизовать только конкретные Dom-Элементы
 + использовать в качестве значений Селекторов 'лживые' значения: **null** / **undefined** / **''** / **false**

```javascript

  {
    $calendarField: '',
    $year: null,    
    $calendar: { fontFamily: "Montserrat", },
  }

```  
В примере выше задействованы конкретные Селекторы. У некоторых Селекторов, вместо валидных объектов СSS-стилей, значениями выступают 'лживые' значения: **ошибки не будет, стили не создадутся!**

#### ВАЖНО! объект **options** манипулирует с inline-стилями (CSS-специфичность: **1, 0, 0, 0**). Если, Вы захотите по ходу алгоритма переопределить их или добавить к ним новые - воспользуйтесь методами  API (рассмотрим далее), либо не передавайте их в **options**

#### На всякий случай)) примеры аналогичных стилей в CSS и JS: 

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

// В JS СSS-свойства обычно представляются в виде объекта, ключи которого записываются в _'camelCase'_ нотации, а значения в виде строк или чисел('zIndex','fontWeight')

const obj = {
  color: "red",
  backgroundColor: "#fff",
  paddingBottom: "25px",
  width: "100%",
  fontWeight: 700,
};

```

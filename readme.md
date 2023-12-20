## Приложение _'gri_calendar'_

Приложение написано с использованием Vanilla JS, HTML, СSS, SCSS (SASS).\

Входной точкой является файл _index.js_, который подключается к _index.html_. _index.js_ в исходниках имеет атрибут **type='module'** и **defer** (важно, если не используется сборщик!).\

Разметка в _index.html_ выглядит:

```html
  <section class="calendar">
    <!-- Сюда будет динамически добавлена вся разметка Календаря при помощи скриптов -->
  </section>
```

### Не допускается передавать в объект стилей непустой массив со значениями или непустую строку!!

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

### В JS СSS-свойства выше, представляются в виде объекта, ключи которого записываются в _'camelCase'_ нотации, а значения в виде строк или чисел(для свойства 'zIndex' или 'fontWeight')

```javascript
const obj = {
  color: "red",
  backgroundColor: "#fff",
  paddingBottom: "25px",
  width: "100%",
  fontWeight: 700,
};
```

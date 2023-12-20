## Не допускается передавать в объект стилей непустой массив со значениями или непустую строку!!

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

## Аналогичные css-свойства представляются в JS в виде объектов с _'camelCase'_ нотации:

```javascript
const obj = {
  color: "red",
  backgroundColor: "#fff",
  paddingBottom: "25px",
  width: "100%",
  fontWeight: 700,
};
```

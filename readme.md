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

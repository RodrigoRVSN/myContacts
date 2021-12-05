# 📚 Annotations

## 🌐 HTTP

- SOP -> Same Origin Policy (Política de mesma Origem) in navigators;
- CORS -> Cross-Origin Resource Sharing (Compartilhamento de Recursos de Origens Cruzadas) - header who can flexibilize the SOP;
- Origin: protocol://domain:port

---
## 🚪 Portals
  - With <b>ReactDOM.createPortal</b> we can create a portal using a `id` in `index.html` to overwrite elements of `id root`
  - With that, we can ignore CSS rules to do overlays.
  - Used with Loaders, Modals, etc.
---
## ❌ Error treatment
### Beneficies of `APIError.js` (`APIError extends Error`)
  1. Semantic
  2. Conditional control with `instanceof APIError` (Business Rules)
  3. Overwrite methods and attributes of Error

---
## 🆚 Differences between useMemo and useCallback
### `useMemo`
  - Re-render the <b>return</b> of the callback function in prevState !== nextState
  - If i want to memorize informations

### `useCallback`
  - Re-render the <b>callback function</b> in prevState !== nextState
prevState !== nextState
  - If i want to memorize functions

---
# 🧐 Casting

- With the casting, we can **change the data type** of a value to another data type.
- We **can't trust in this** method to conditional rendering, because the second parameter **can be renderized** in a Short Circuit Evaluation (`&&`), like in the example below:

    ❌ `{(contacts.length > 0 && filteredContacts.length) && <h1>hi</h1} // doesn't make cast`

    ✅ `{(contacts.length > 0 && filteredContacts.length > 0) && <h1>hi</h1>} // make a cast and compare`

- *Obs: `!!` represents a casting to a boolean type. `(0 -> true -> false)`*

    ```jsx
    Truthy -> 1, -1, ' ', [], {}, () => {}
    Falsy -> 0, null, NaN, undefined, '', false
    ```
---
# 🖼️ SVG optimize

- Using [SVGOMG - SVGO's Missing GUI (jakearchibald.github.io)](https://jakearchibald.github.io/svgomg/) we can **optimize svg's content.**
- With this, we make the application **render faster** (less bytes to download in the browser)

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


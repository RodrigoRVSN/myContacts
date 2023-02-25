
<details>
<summary>🚪 Portals</summary>

  - With `ReactDOM.createPortal` we can create a portal using a `id` in `index.html` to overwrite elements of `id root`
  - With that, we can ignore CSS rules to do overlays.
  - Some examples are Loaders, Modals, etc.

</details>

---

<details>
<summary>❌ Error treatment</summary>

Beneficies of APIError.js (APIError extends Error):

1. Semantic
2. Conditional control with `instanceof APIError` (Business Rules)
3. Overwirte methods and attributes of `Error`

</details>

---

<details>
<summary>🔨 Service Layer</summary>

- With this, we centralize our requests to break apart of the components.

    ```jsx
    // ContactsService.js
    import HttpClient from './utils/HttpClient';

    class ContactsService {
      constructor() {
    		// Create the object with the default route of API.
        this.httpClient = new HttpClient('http://localhost:4000');
      }

    	// Use the route defined and add endpoints.
      async listContacts(orderBy = 'asc') {
        return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
      }
    }

    export default new ContactsService();
    ```

    ```jsx
    // HttpClient.js
    import APIError from '../../errors/APIError';
    import delay from '../../utils/delay';

    class HttpClient {
    	// baseURL in Cotacts Service
      constructor(baseURL) {
        this.baseURL = baseURL;
      }

      async get(path) {
        await delay(500);

        const response = await fetch(`${this.baseURL}${path}`);
        const contentType = response.headers.get('Content-Type');

        let body = null;
    		// If has json, make the parse.
        if (contentType.includes('application/json')) {
          body = await response.json();
        }

    		// If not json, return null
        if (response.ok) {
          return body;
        }

    		// If not ok, return APIError
        throw new APIError(response, body);
      }
    }
    export default HttpClient;
    ```

    ```jsx
    // APIError.js, to create a new intanceof Error
    export default class APIError extends Error {
      constructor(response, body) {
        super();

        this.name = 'APIError';
        this.response = response;
        this.body = body;
        this.message = body?.error || `${response.status} - ${response.statusText}`;
      }
    }
    ```

</details>

---

<details>
<summary>🆚 Differences between</summary>

---

  ## 🧠 useMemo x useCallback

  ### `useMemo`
  - Re-render the return of the callback function in `prevState !== nextState`
  - If i want to memorize informations (return)

  ### `useCallback`
  - Re-render the callback function in `prevState !== nextState`
  - If i want to memorize functions

  ## 💻 useEffect x useLayoutEffect

  ### `useEffect`
  - Don't Lock renderizing, because is assynchronous and executed after layout rendering.

  ### `useLayoutEffect`
  - Lock renderizing, because is synchronous and executed before layout rendering.

</details>

---

<details>
<summary>🧐 Casting</summary>

  - With the casting, we can change the data type of a value to another data type.
  - We can't trust in this method to conditional rendering, because the second parameter can be renderized in a Short Circuit Evaluation (`&&`), like in the example below:

    ❌ `{(contacts.length > 0 && filteredContacts.length) && <h1>hi</h1} // doesn't make cast`

    ✅ `{(contacts.length > 0 && filteredContacts.length > 0) && <h1>hi</h1>} // make a cast and compare`
  - *Obs: `!!` represents a casting to a boolean type. `(0 -> true -> false)`*

  ```jsx
      // Truthy -> 1, -1, ' ', [], {}, () => {}
      // Falsy -> 0, null, NaN, undefined, '', false
  ```

</details>

---

<details>
<summary>🖼️ SVG optimize</summary>

  - Using [SVGOMG - SVGO's Missing GUI (jakearchibald.github.io)](https://jakearchibald.github.io/svgomg/) we can optimize svg's content.
  - With this, we make the application render faster (less bytes to download in the browser)

</details>

---

<details>
<summary>💼 Businesses Rules</summary>

  - We need to apply the business rules in the Back-end and the Front-end.
  - In the client side, we not send invalid informations, like a e-mail without `@` . With this, we save unnecessary recurses from the Back-end. In a Back-end Serverless, has so much more impact.
</details>

---

<details>
<summary>🌐 HTTP</summary>

  - **SOP** -> Same Origin Policy (Política de mesma Origem) in navigators;
  - **CORS** -> Cross-Origin Resource Sharing (Compartilhamento de Recursos de Origens Cruzadas) - header who can flexibilize the SOP;
  - **Origin**: *protocol://domain:port*
</details>

---

<details>
<summary>🆚 Simple vs Preflighted requests</summary>

  - With this, the browser don't make Preflighted requests (like DELETE) in the Back-end when we get a Not Permitted error, f.e.
  - Simple → GET, HEAD, POST
  - Preflighted → Others


```jsx
    // in the back-end: (cors.js)
    module.exports = (request, response, next) => {
      response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      // allow methods
      response.setHeader('Access-Control-Allow-Methods', '*');
      // header parameter
      response.setHeader('Access-Control-Allow-Headers', 'x-app-id');
      // cache, with -1 not have cache
      response.setHeader('Access-Control-Max-Age', '10');
      next();
    }
```
</details>

---

<details>
<summary>⬆️ State Lifting</summary>

 # How to pass the children to the father?

 1- State Lifting -> Create the states in the father and pass to children by props. Its a simple way, but has problems if we have so much code duplication and need a lot of refactoring to do that.

 2- Derived States -> A state starts with a value from the props (use the key property to rerender the states, unmount and mount the interface)

 3- Imperative Code -> use a ref with forward ref (useImperativeHandle)

</details>

---

<details>
<summary>⛓ Concurrent React</summary>

- With this update in React v18, can have priority with a concurrent process.
- The state change can be a `Urgent update` or a `Transition update`

</details>

---
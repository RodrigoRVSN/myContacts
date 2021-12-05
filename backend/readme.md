<details>
<summary>🕸 API</summary>

  - With HTTP protocol, we control differents applications with a same data source, using **JSON** (JavaScript Object Notation).
  - REST → **Pattern** to constroy API's.

</details>

---
<details>
<summary>📕 Modules</summary>

  - **File Javastript** = Module.
  - **Native** = Module.
  - **npm** (Node Package Manager) = Module.
</details>

---
<details>
<summary>👨‍💻 Server HTTP</summary>

  ```jsx
  const http = require('http');
  const server = http.createServer((request, response) => {
  	response.writeHead(200, { 'Content-Type' : 'text/html'});
  	response.end('<h1>oi</h1>');
  })
  server.listen(3000, () => console.log('OK'))
  ```
</details>


---

<details>
<summary>🐳 Docker</summary>

  - Without Docker, we use libs, servers and databases in the host.
  - We can define with **Images** what we want to use with Docker.
  - In Containers, a application run isolated, using the same Kernel of themachine, being light and efficiente comparing to VM's (Virtual Machines) andhave portability.
  ```jsx

  // Create container + imagem
  docker run --name pg -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p5432:5432 -d postgres

  // List all containers in the machine ACTIVE
  docker container ls
  docker ps

  // List ALL containers in the machine
  docker ps -a

  // Stop container
  docker stop name

  // Docker remove container (need to stop)
  docker container rm containerName

  // Docker remove image (need to remove container)
  docker rmi imageName

  // Interact with container
  docker exec -it pg bash

  // Login in *postgres
  psql -U root

  // List base databases after logged
  \l
  // Connect the database
  \c mycontacts
  // List table names
  \dt
  ```
</details>


---

📜 Singleton → One Class Instance in a file.

```jsx
const express = require('express')
require('express-async-errors')

const cors = require('./app/middlewares/cors')
const errorHandler = require('./app/middlewares/errorHandler')
const routes = require('./routes')

const app = express()
app.use(express.json())
app.use(cors)
app.use(routes)
app.use(errorHandler)

app.listen(4000, () =>
  console.log('️‍🔥 Server running at http://localhost:4000')
)
```

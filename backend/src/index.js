const express = require('express')
require('express-async-errors')

const cors = require('./app/middlewares/cors')
const errorHandler = require('./app/middlewares/errorHandler')
const routes = require('./routes')

const PORT = process.env.PORT || 5555

const app = express()
app.use(express.json())
app.use(cors)
app.use(routes)
app.use(errorHandler)

app.listen(PORT, () =>
  console.log(`🔥 Server running at http://localhost:${PORT}`)
)

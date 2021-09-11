const express = require("express");
require("express-async-errors");

const app = express();
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');
const routes = require("./routes");

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(3001, () =>
  console.log("️‍🔥 Server running at http://localhost:3001")
);

const express = require("express");
const app = express();
const logger = require('./utils/logger');
const DbInitialize = require('./db/initialize');
const router = require('./loader/routing');
const errorHandlerMiddleware = require('./middleware/errorHandler');


app.use(express.json());

app.use(router);

app.logger = logger;


app.use(errorHandlerMiddleware);

const main = async () => {
  await DbInitialize.initialize(app);
  app.listen(3000, () => {
    console.log('The server is waiting for a connection ...');
  });
}

main();


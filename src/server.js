const express = require("express");
const app = express();
const logger = require('./utils/logger');
const DbInitialize = require('./db/dbInitialize');
const router = require('./loader/routing');
const errorHandlerMiddleware = require('./middleware/errorHandler');


app.use(express.json());
//роуты нельзя тут инит (вынести в роуты создать index.js и там их инит как и бд)
app.use(router);

app.logger = logger;


app.use(errorHandlerMiddleware);

//initialize возвращает промис, поэтому можно использовать then
//await не даёт использовать express
DbInitialize.initialize(app).then(() => {
  app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
  });
});


const express = require("express");
const app = express();
const logger = require('./utils/logger');
const DbInitialize = require('./services/dbInitialize');
const authRouter = require('./routers/authRouter');

app.use(express.json());
//роуты нельзя тут инит (вынести в роуты создать index.js и там их инит как и бд)
app.use("/auth", authRouter);

app.logger = logger;

//initialize возвращает промис, поэтому можно использовать then
//await не даёт использовать express
DbInitialize.initialize(app).then(() => {
  app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
  });
});


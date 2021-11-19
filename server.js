const express = require("express");
const app = express();
const logger = require('./src/utils/logger');
const dbInitialize = require('./src/services/dbInitialize');
const authRouter = require('./src/routers/authRouter');
const errorHandlerMiddleware = require("./src/middleware/errorHandler");

app.use(express.json());
//роуты нельзя тут инит (вынести в роуты создать index.js и там их инит как и бд)
app.use("/auth", authRouter);

app.logger = logger;

app.use(errorHandlerMiddleware);

dbInitialize(app);

app.listen(3000, function () {
  console.log("Сервер ожидает подключения...");
});
const Sequelize = require("sequelize");
const express = require("express");
const authRouter = require('./authRouter')

const app = express();
const urlencodedParser = express.urlencoded({ extended: false });


//возможность сервера парсить json
app.use(express.json())
//прослушать router
app.use("/auth", authRouter)

const db = require("./models");
const initData = require("./models/seedData");

app.set("view engine", "hbs");

// синхронизация с бд, после успшной синхронизации запускаем сервер
db.sequelize.sync().then(() => {
  initData();
  app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
  });
}).catch(err => console.log(err));

// получение данных
/*app.get("/", function(req, res){
    User.findAll({raw: true }).then(data=>{
      res.render("index.hbs", {
        users: data
      });
    }).catch(err=>console.log(err));
});

app.get("/create", function(req, res){
    res.render("create.hbs");
});

// добавление данных
app.post("/create", urlencodedParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const username = req.body.name;
    const userPassword = req.body.password;
    User.create({ name: username, password: userPassword}).then(()=>{
      res.redirect("/");
    }).catch(err=>console.log(err));
});

// получаем объект по id для редактирования
app.get("/edit/:id", function(req, res){
  const userid = req.params.id;
  User.findAll({where:{id: userid}, raw: true })
  .then(data=>{
    res.render("edit.hbs", {
      user: data[0]
    });
  })
  .catch(err=>console.log(err));
});

// обновление данных в БД
app.post("/edit", urlencodedParser, function (req, res) {

  if(!req.body) return res.sendStatus(400);

  const username = req.body.name;
  const userPassword = req.body.password;
  const userid = req.body.id;
  User.update({name:username, password: userPassword}, {where: {id: userid} }).then(() => {
    res.redirect("/");
  })
  .catch(err=>console.log(err));
});

// удаление данных
app.post("/delete/:id", function(req, res){
  const userid = req.params.id;
  User.destroy({where: {id: userid} }).then(() => {
    res.redirect("/");
  }).catch(err=>console.log(err));
});*/

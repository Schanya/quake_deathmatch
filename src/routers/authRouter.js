const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const { check } = require("express-validator")
const notFoundMiddleware = require('../middleware/notFound');
const requestWrap = require("../middleware/requestWrap");


router.post('/registration', [
    check('name', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Парольне может быть меньше 3 и больше 10 символов").isLength({ min: 4, max: 10 })
], requestWrap(controller.registration));

router.all('/*', [
    notFoundMiddleware
])

//router.post('/login', controller.login)
//router.get('/users', controller.getUsers)

module.exports = router;
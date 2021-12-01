const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const notFoundMiddleware = require('../middleware/notFound');
const requestWrap = require("../middleware/requestWrap");
const validation = require('../middleware/validation');
const userSchema = require('../schemes/userSchema')

router.post('/registration', validation(userSchema, 'body'), requestWrap(controller.registration));

router.post('/login', requestWrap(controller.login));

router.all('/*', [notFoundMiddleware]);

//router.get('/users', controller.getUsers)

module.exports = router;
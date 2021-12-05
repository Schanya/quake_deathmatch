const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const notFoundMiddleware = require('../middleware/notFound');
const requestWrap = require("../middleware/requestWrap");
const validation = require('../middleware/validation');
const userSchema = require('../schemes/userSchema');
const isAdmin = require('../middleware/isAdmin');

router.post('/registration', validation(userSchema, 'body'), requestWrap(controller.registration));

router.post('/login', requestWrap(controller.login));

router.get('/users', isAdmin('USER'), requestWrap(controller.getUsers));

router.all('/*', [notFoundMiddleware]);



module.exports = router;
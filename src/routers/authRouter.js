const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const notFoundMiddleware = require('../middleware/notFound');
const requestWrap = require("../middleware/requestWrap");
const validation = require('../middleware/validation');
const userSchema = require('../schemes/userSchema');
const isAdmin = require('../middleware/isAdmin');
const isUser = require('../middleware/isUser');

router.post('/registration', validation(userSchema, 'body'), requestWrap(controller.registration));

router.post('/login', requestWrap(controller.login));

router.get('/users', isAdmin('USER'), requestWrap(controller.getUsers));

router.post('/delete', isUser('USER'), requestWrap(controller.deleteUser));

router.all('/*', [notFoundMiddleware]);



module.exports = router;
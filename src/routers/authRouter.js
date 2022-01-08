const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const notFoundMiddleware = require('../middleware/notFound');
const requestWrap = require("../middleware/requestWrap");
const validation = require('../middleware/validation');
const userSchema = require('../schemes/userSchema');
const isAdmin = require('../middleware/isAdmin');
const isUser = require('../middleware/isUser');
const { ADMIN: admin } = require('../helpers/constants');
const { USER: user } = require('../helpers/constants');
const parseToken = require('../middleware/parseToken');

router.post('/registration', validation(userSchema, 'body'), requestWrap(controller.registration));

router.post('/login', requestWrap(controller.login));

router.get('/users', parseToken(), isAdmin(admin), requestWrap(controller.getUsers));

router.post('/delete', parseToken(), isUser(user), requestWrap(controller.deleteUser));

router.all('/*', [notFoundMiddleware]);



module.exports = router;
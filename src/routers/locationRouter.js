const Router = require('express');
const router = new Router();

const controller = require('../controllers/locationController')

const isAdmin = require('../middleware/isAdmin');
//может можно вынести в routing этот мидл
const requestWrap = require('../middleware/requestWrap');

const { ADMIN: admin } = require('../helpers/constants');

router.get('/create', isAdmin(admin), requestWrap(controller.addLocation));

//router.post('/delete', isUser(user), requestWrap(controller.deleteUser));

module.exports = router;
const Router = require('express');
const router = new Router();

const controller = require('../controllers/userController')

const isAdmin = require('../middleware/isAdmin');
const isUser = require('../middleware/isUser');
//может можно вынести в routing этот мидл
const requestWrap = require('../middleware/requestWrap');

const { ADMIN: admin } = require('../helpers/constants');
const { USER: user } = require('../helpers/constants');


router.get('/users', isAdmin(admin), requestWrap(controller.getUsers));

router.post('/delete', isUser(user), requestWrap(controller.deleteUser));

router.get('/connecting', requestWrap(controller.connectingToGameSession));

router.post('/disconnecting', requestWrap(controller.disconnectingFromGameSession));

module.exports = router;

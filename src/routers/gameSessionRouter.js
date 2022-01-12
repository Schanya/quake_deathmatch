const Router = require('express');
const router = new Router();

const controller = require('../controllers/gameSessionController')

//может можно вынести в routing этот мидл
const requestWrap = require('../middleware/requestWrap');

router.get('/create', requestWrap(controller.addGameSession));

//router.post('/delete', isAdmin(admin), requestWrap(controller.deleteLocation));

module.exports = router;
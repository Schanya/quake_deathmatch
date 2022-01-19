const Router = require('express');
const router = new Router();

const controller = require('../controllers/gameSessionController')

//может можно вынести в routing этот мидл
const requestWrap = require('../middleware/requestWrap');

router.get('/create', requestWrap(controller.addGameSession));

router.get('/list', requestWrap(controller.getGameSessions));

router.get('/detailedInformation', requestWrap(controller.getDetailedInformation));

//router.post('/delete', isAdmin(admin), requestWrap(controller.deleteLocation));

module.exports = router;
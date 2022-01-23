const Router = require('express');
const router = new Router();

const controller = require('../controllers/gameSessionController')

//может можно вынести в routing этот мидл
const requestWrap = require('../middleware/requestWrap');
const validation = require('../middleware/validation');

const gameSessionSchema = require('../schemes/gameSessionSchema');

router.post('/create', validation(gameSessionSchema, 'body'), requestWrap(controller.addGameSession));

router.get('/list', requestWrap(controller.getGameSessions));

router.get('/:id/detailedInformation', requestWrap(controller.getDetailedInformation));

router.get('/:id/users', requestWrap(controller.getUsersByGameSession));

//router.post('/delete', isAdmin(admin), requestWrap(controller.deleteLocation));

module.exports = router;
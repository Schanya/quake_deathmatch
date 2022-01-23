const Router = require('express');
const router = new Router();
const { ADMIN: admin } = require('../helpers/constants');

const controller = require('../controllers/locationController')

const isAdmin = require('../middleware/isAdmin');
//может можно вынести в routing этот мидл
const requestWrap = require('../middleware/requestWrap');
const validation = require('../middleware/validation');

const locationSchema = require('../schemes/locationSchema');

router.post('/create', isAdmin(admin), validation(locationSchema, 'body'), requestWrap(controller.addLocation));

router.delete('/:id/delete', isAdmin(admin), requestWrap(controller.deleteLocation));

router.get('/list', requestWrap(controller.getLocations));

module.exports = router;
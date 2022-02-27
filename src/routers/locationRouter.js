const Router = require('express');
const router = new Router();
const multer = require('multer');
const storage = require("../loader/multer").storage;
const fileFilter = require("../loader/multer").fileFilter;
const limits = require("../loader/multer").limits;
const upload = multer({ storage: storage, fileFilter: fileFilter, limits: limits });

const controller = require('../controllers/locationController')

const isAdmin = require('../middleware/isAdmin');
//может можно вынести в routing этот мидл
const requestWrap = require('../middleware/requestWrap');

const { ADMIN: admin } = require('../helpers/constants');

router.get('/create', isAdmin(admin), requestWrap(controller.addLocation));

router.post('/delete', isAdmin(admin), requestWrap(controller.deleteLocation));

router.post('/:id/poster', upload.single('poster'), requestWrap(controller.setPoster));

router.post('/:id/file', upload.single('file'), requestWrap(controller.setFile));

module.exports = router;
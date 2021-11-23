const errorHandlerMiddleware = require('../middleware/errorHandler');

const express = require('express');
const router = express.Router();

const authRouter = require('../routers/authRouter');

router.use('/auth', authRouter);
router.use(errorHandlerMiddleware);

module.exports = router;
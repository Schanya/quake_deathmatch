const express = require('express');
const router = express.Router();

const authRouter = require('../routers/authRouter');
const userRouter = require('../routers/userRouter');
const locationRouter = require('../routers/locationRouter');

const errorHandlerMiddleware = require('../middleware/errorHandler');
const notFoundMiddleware = require('../middleware/notFound');
const requestWrap = require('../middleware/requestWrap');
const parseToken = require('../middleware/parseToken');

router.use('/auth', authRouter);
router.use('/user', requestWrap(parseToken()), userRouter);
router.use('/location', requestWrap(parseToken()), locationRouter);
router.use('/*', [notFoundMiddleware]);
router.use(errorHandlerMiddleware);

module.exports = router;
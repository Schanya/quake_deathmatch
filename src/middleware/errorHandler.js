const { StatusCodes } = require("http-status-codes");
const BaseError = require("../errors/baseError");

const errorHandlerMiddleware = (err, req, res, next) => {

    if (err instanceof BaseError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

module.exports = errorHandlerMiddleware;

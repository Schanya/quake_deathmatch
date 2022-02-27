//404 сервер не может найти данные согласно запросу

const { StatusCodes } = require('http-status-codes');
const BaseError = require('./baseError');

class NotAcceptableError extends BaseError {

    constructor(message) {
        super(message);
        this.name = "Not acceptable";
        this.statusCode = StatusCodes.NOT_ACCEPTABLE;
    }
}

module.exports = NotAcceptableError;
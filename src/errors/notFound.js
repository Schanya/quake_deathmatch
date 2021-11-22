//404 сервер не может найти данные согласно запросу

const { StatusCodes } = require('http-status-codes');
const BaseError = require('./error');

class NotFoundError extends BaseError {

    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError;
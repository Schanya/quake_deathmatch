const { StatusCodes } = require('http-status-codes');
const BaseError = require('./baseError');

class UnprocessableEntityError extends BaseError {

    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    }
}

module.exports = UnprocessableEntityError;
//403 у вас нет доступа

const { StatusCodes } = require('http-status-codes');
const BaseError = require('./baseError');

class Forbidden extends BaseError {

    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}

module.exports = Forbidden;
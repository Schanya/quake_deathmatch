//500 не удалось удалить

const { StatusCodes } = require('http-status-codes');
const BaseError = require('./baseError');

class Delete extends BaseError {

    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
}

module.exports = Delete;
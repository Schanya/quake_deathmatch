//401 пользователь (который для доступа к конкретному url должен авторизоваться) передал неверный запрос

const { StatusCodes } = require('http-status-codes');
const BaseError = require('./error');

class UnauthenticatedError extends BaseError {

    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnauthenticatedError;
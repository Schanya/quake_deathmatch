//400 запрос к серверу содержит синтаксическую ошибку

const { StatusCodes } = require('http-status-codes');
const BaseError = require('./baseError');

class BadRequestError extends BaseError {

  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
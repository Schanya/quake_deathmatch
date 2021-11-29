const BaseError = require('./baseError');
const UnauthenticatedError = require('./unauthError');
const NotFoundError = require('./notfoundError');
const BadRequestError = require('./badrequestError');
const UnprocessableEntityError = require('./unprocessableEntityError');

module.exports = {
    BaseError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
    UnprocessableEntityError,
}
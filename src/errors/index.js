const BaseError = require('./baseError');
const UnauthenticatedError = require('./unauthError');
const NotFoundError = require('./notfoundError');
const BadRequestError = require('./badrequestError');
const UnprocessableEntityError = require('./unprocessableEntityError');
const NotAcceptableError = require('./notAcceptableError');
const ForbiddenError = require('./forbiddenError');
const DeleteError = require('./deleteError');

module.exports = {
    BaseError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
    UnprocessableEntityError,
    NotAcceptableError,
    ForbiddenError,
    DeleteError
}
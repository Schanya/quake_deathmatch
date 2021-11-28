const BaseError = require('./baseError')
const UnauthenticatedError = require('./unauthError')
const NotFoundError = require('./notfoundError')
const BadRequestError = require('./badrequestError')

module.exports = {
    BaseError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
}
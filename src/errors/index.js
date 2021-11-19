const BaseError = require('./error')
const UnauthenticatedError = require('./unauthenticated')
const NotFoundError = require('./notFound')
const BadRequestError = require('./badRequest')

module.exports = {
    BaseError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
}
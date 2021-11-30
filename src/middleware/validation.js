const UnprocessableEntityError = require('../errors/unprocessableEntityError');

const validate = (schema, property) => {
    return (req, res, next) => {

        if (schema) {
            const { error } = schema.validate(req[property]);

            if (error) {
                throw new UnprocessableEntityError(`${error.details[0].message}!`);
            }
            next();
        }
    }
};

module.exports = validate;
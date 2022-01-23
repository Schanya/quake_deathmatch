const Joi = require("joi");

module.exports = Joi.object().keys({
    name: Joi.string()
        .min(3)
        .max(20)
        .regex(/^[a-z A-Z0-9]+$/)
        .required(),

    description: Joi.string()
        .regex(/^[a-z A-Z0-9]+$/),

    poster: Joi.string(),

    file: Joi.string(),

    max_users: Joi.number()
        .integer()
        .positive()
        .min(2)
        .max(10)
});
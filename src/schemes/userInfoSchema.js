const Joi = require("joi");

module.exports = Joi.object().keys({
    first_name: Joi.string()
        .min(3)
        .max(20)
        .regex(/^[a-zA-Z0-9]+$/)
        .required(),

    last_name: Joi.string()
        .min(3)
        .regex(/^[a-zA-Z0-9]+$/)
        .required(),

    avatar: Joi.string()
});
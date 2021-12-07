const Joi = require("joi");

module.exports = Joi.object().keys({
        name: Joi.string()
                .min(3)
                .max(20)
                .regex(/^[a-zA-Z0-9]+$/)
                .required(),

        password: Joi.string()
                .min(4)
                .max(10)
                .required()
                .pattern(new RegExp("^[a-zA-Z0-9]+$"))
});
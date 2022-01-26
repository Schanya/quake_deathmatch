const Joi = require("joi");

module.exports = Joi.object().keys({
    name: Joi.string()
        .min(3)
        .max(20)
        .regex(/^[a-z A-Z0-9]+$/)
        .required(),

    max_users: Joi.number()
        .min(2)
        .max(10)
        .integer()
        .positive(),

    //Я создаю сессию, и что бы добавить локацию, нужно ввести название локации, это верно
    //или нужно что-то как-то из url брать?
    nameLocation: Joi.string()
});
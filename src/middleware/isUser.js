const Forbidden = require("../errors/forbiddenError");
const jwt = require('jsonwebtoken');
const { secret } = require("../db/config/dbСonfig");
const { USER: user } = require("../helpers/constants");

module.exports = (roles) => {
    return (req, res, next) => {

        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return new Forbidden('Пользователь не авторизован')
        }

        const { Roles: userRoles } = jwt.verify(token, secret);

        let isUser = false;
        userRoles.forEach(role => {
            if (role.name === user) {
                isUser = true;
            }
        });

        if (isUser) {
            next(
                new Forbidden(
                    'У вас недостаточно прав для выполнения этого действия'
                )
            );
        }
        next();
    }
};
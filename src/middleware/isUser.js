const Forbidden = require("../errors/forbiddenError");
const helpers = require("../helpers/checkRoles");
const jwt = require('jsonwebtoken');
const { secret } = require("../db/config/dbСonfig");

module.exports = (roles) => {
    return (req, res, next) => {

        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return new Forbidden('Пользователь не авторизован')
        }

        const { Roles: userRoles } = jwt.verify(token, secret);

        const isAdmin = helpers.isAdmin(userRoles);

        if (isAdmin) {
            next(
                new Forbidden(
                    'У вас недостаточно прав для выполнения этого действия'
                )
            );
        }
        next();
    }
};
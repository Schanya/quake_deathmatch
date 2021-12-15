const UnauthenticatedError = require("../errors/unauthError");
const Forbidden = require("../errors/forbiddenError");
const jwt = require('jsonwebtoken');
const { secret } = require("../db/config/dbСonfig");
const { admin } = require("../helpers/constants");

module.exports = (roles) => {
    return (req, res, next) => {

        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            throw new UnauthenticatedError('Пользователь не авторизован')
        }


        const { Roles: userRoles } = jwt.verify(token, secret);

        let isAdmin = false;
        userRoles.forEach(role => {
            if (role.name === admin) {
                isAdmin = true;
            }
        });

        if (!isAdmin) {
            throw new Forbidden('У вас недостаточно прав для выполнения этого действия')
        }
        next();
    }
};
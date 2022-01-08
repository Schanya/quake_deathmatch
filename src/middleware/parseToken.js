const { secret } = require('../db/config/dbСonfig');
const jwt = require('jsonwebtoken');
const Forbidden = require('../errors/forbiddenError');

const parseToken = () => {
    return async (req, res, next) => {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            throw new Forbidden('User not logged in');
        }

        const { id: userId, Roles: userRoles } = jwt.verify(token, secret);

        req.user = {};
        req.user.id = userId;
        req.user.Roles = userRoles;
        next();
    }
};

module.exports = parseToken;
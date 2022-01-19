const { secret } = require('../db/config/dbСonfig');
const jwt = require('jsonwebtoken');
const Forbidden = require('../errors/forbiddenError');
const usersRepository = require('../repositories/usersRepository');

const parseToken = () => {
    return async (req, res, next) => {
        const newToken = req.headers.authorization;

        if (!newToken) {
            throw new Forbidden('User not logged in');
        }

        const token = newToken.split(' ')[1]

        const { id: userId, Roles: userRoles } = jwt.verify(token, secret);

        const user = await usersRepository.findById(userId);

        if (!user) {
            throw new Forbidden('User not exist');
        }

        req.user = {};
        req.user.id = userId;
        req.user.Roles = userRoles;
        next();
    }
};

module.exports = parseToken;
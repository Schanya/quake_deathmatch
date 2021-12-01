const BadRequestError = require('../errors/badrequestError');
const jwt = require('jsonwebtoken');
const { secret } = require('../db/config/dbСonfig');

const isAdmin = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            throw new BadRequestError('Пользователь не авторизован');
        }

        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();
    } catch {
        console.log(e);
        //сделать 403
        throw new BadRequestError('Пользователь не авторизован');

    }
}

module.exports = isAdmin;
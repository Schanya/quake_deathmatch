const jwt = require('jsonwebtoken');
const { secret } = require('../db/config/dbСonfig')

class Token {
    generateAccessToken(id, Roles) {
        const paylod = {
            id,
            Roles
        }

        return jwt.sign(paylod, secret, { expiresIn: 3600 });
    }
}

module.exports = new Token();
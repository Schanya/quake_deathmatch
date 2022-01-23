const { BadRequestError } = require("../errors");
const bcrypt = require('bcrypt');
const Token = require("../utils/jwt");

const usersRepository = require("../repositories/usersRepository");
const rolesRepository = require("../repositories/rolesRepository");

class LoginService {
    userLogin = async (name, password) => {
        const user = await usersRepository.findOneByName(name);

        if (!user) {
            throw new BadRequestError('Invalid username and password ');
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestError('Invalid username and password ');
        }

        const id = user.id;
        const roles = await rolesRepository.getRoleByUserId(id);

        const token = Token.generateAccessToken(user.id, roles);

        return token;
    }
}

module.exports = new LoginService();
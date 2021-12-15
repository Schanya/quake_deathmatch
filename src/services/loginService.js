const { BadRequestError } = require("../errors");
const usersRepository = require("../repositories/usersRepository");
const bcrypt = require('bcrypt');
const rolesRepository = require("../repositories/rolesRepository");
const Token = require("../utils/jwt");

class LoginService {
    userLogin = async (name, password) => {
        const user = await usersRepository.findOneByName(name);

        if (!user) {
            throw new BadRequestError("Введён не верный логин и пароль");
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestError("Введён не верный логин и пароль");
        }

        const role = await rolesRepository.getAllByUserName(name);
        const token = Token.generateAccessToken(user.id, role);

        return token;
    }
}

module.exports = new LoginService();
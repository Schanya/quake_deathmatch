const { BadRequestError } = require("../errors");
const usersRepository = require("../repositories/usersRepository");
const bcrypt = require('bcrypt');
const rolesRepository = require("../repositories/rolesRepository");

class LoginService {
    userLogin = async (name, password) => {
        const user = await usersRepository.findOneByName(name);

        if (!user) {
            throw new BadRequestError(`Пользователь ${name} не найден`);
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestError("Введён не верный логин и пароль");
        }

        const role = await rolesRepository.getByName(name);
        const token = usersRepository.generateAccessToken(user.id, role);

        return token;
    }
}

module.exports = new LoginService();
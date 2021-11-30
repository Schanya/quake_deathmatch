const { BadRequestError } = require("../errors");
const usersRepository = require("../repositories/usersRepository");
const bcrypt = require('bcrypt');
const rolesRepository = require("../repositories/rolesRepository");

class Login {
    userLogin = async (name, password) => {

        const user = await usersRepository.findOneByName(name);

        if (!user) {

            throw new BadRequestError(`Пользователь ${name} не найден`);

        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {

            throw new BadRequestError("Введён не верный пароль");

        }
        const role = await rolesRepository.getByName(name);

        const token = usersRepository.generateAccessToken(user.id, role);

        return token;
    }
}

module.exports = new Login();
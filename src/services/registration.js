const roles = require('../repositories/rolesRepository')
const users = require('../repositories/usersRepository')
const { BadRequestError } = require('../errors');

class Registration {
    userRegistration = async (name, password) => {

        const candidate = await users.findOneByName(name);

        if (candidate) {
            throw new BadRequestError(`Пользователь с именем  ${name} уже существует`);
        }

        const userRole = await roles.getByName("USER");

        const newUser = await users.create(name, password);

        await roles.addRoleToUser(newUser, userRole);
    }
}

module.exports = new Registration();


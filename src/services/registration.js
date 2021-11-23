const Roles = require('../repositories/rolesRepository')
const Users = require('../repositories/usersRepository')
const { BadRequestError } = require('../errors');

class Registration {
    userRegistration = async (name, password) => {

        const candidate = await Users.findOneByName(name);

        if (candidate) {
            throw new BadRequestError(`Пользователь с именем  ${name} уже существует`);
        }

        const userRole = await Roles.getByName("USER");

        const newUser = await Users.create(name, password);

        await Roles.addRoleToUser(newUser, userRole);
    }
}

module.exports = new Registration();


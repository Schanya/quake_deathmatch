const { BadRequestError } = require('../errors');
const Roles = require('../repositories/rolesRepository')
const Users = require('../repositories/usersRepository')

module.exports = async (name, password) => {

    const candidate = await Users.findOneByName(name);

    if (candidate) {
        throw new BadRequestError(`Пользователь с именем  ${name} уже существует`);
    }

    const userRole = await Roles.getByName("USER");

    const newUser = await Users.create(name, password);

    await Roles.addRoleToUser(newUser, userRole);
}

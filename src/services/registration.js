const { BadRequestError } = require('../errors');
const Roles = require('../repository/roles')
const Users = require('../repository/users')

module.exports = async (name, password) => {

    const candidate = await Users.findOneByName(name);

    if (candidate) {
        throw new BadRequestError(`Пользователь с именем  ${name} уже существует`);
    }

    const userRole = await Roles.getByName("USER");

    const newUser = await Users.create(name, password);

    await Roles.addRoleToUser(newUser, userRole);
}
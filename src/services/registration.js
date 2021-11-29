const rolesRepository = require('../repositories/rolesRepository')
const usersRepository = require('../repositories/usersRepository')
const { BadRequestError } = require('../errors');

class Registration {
    userRegistration = async (name, password) => {

        const candidate = await usersRepository.findOneByName(name);

        if (candidate) {
            throw new BadRequestError(`Пользователь с именем  ${name} уже существует`);
        }

        const userRole = await rolesRepository.getByName("USER");

        const newUser = await usersRepository.create(name, password);

        await rolesRepository.addRoleToUser(newUser, userRole);
    }
}

module.exports = new Registration();


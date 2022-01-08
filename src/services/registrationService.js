const rolesRepository = require('../repositories/rolesRepository');
const usersRepository = require('../repositories/usersRepository');
const { BadRequestError } = require('../errors');
const { USER: user } = require('../helpers/constants');

class RegistrationService {
    userRegistration = async (name, password) => {
        const candidate = await usersRepository.findOneByName(name);

        if (candidate) {
            throw new BadRequestError(`User ${name} already exists`);
        }

        const userRole = await rolesRepository.getAllByRoleName(user);

        const newUser = await usersRepository.create(name, password);
        await rolesRepository.addRoleToUser(newUser, userRole);
    }
}

module.exports = new RegistrationService();


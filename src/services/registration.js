const BaseError = require('../errors/error');
const Roles = require('../repositories/rolesRepository')
const Users = require('../repositories/usersRepository')

class Registration {
    userRegistration = async (name, password) => {
        const candidate = await Users.findOneByName(name);
        if (candidate) {
            throw new BaseError(400, 'registrationError', `Пользователь с именем  ${name} уже существует`);
        }
        const userRole = await Roles.getByName("USER");
        const newUser = await Users.create(name, password);
        await Roles.addRoleToUser(newUser, userRole);
        return {
            message: `Пользователь с именем  ${name} был успешно зарегестрирован`
        };
    }
}

module.exports = new Registration();
const BaseError = require('../errors/error');
const Roles = require('../repository/roles')
const Users = require('../repository/users')

module.exports = async (req) => {
    const { name, password } = req.body;
    const candidate = await Users.findOneByName(name);
    if (candidate) {
        throw new BaseError(400, 'registrationError', `Пользователь с именем  ${name} уже существует`);
    }
    const userRole = await Roles.getByName("USER");
    await Users.create(name, password, userRole);
    return {
        message: `Пользователь с именем  ${name} был успешно зарегестрирован`
    };
}
//Правильно ли импортирован db? Создаётся ещё одно подключение или как это работает?
const db = require('../models');

class Roles {
    async getAllByUserName(name) {
        const userRole = await db.Role.findAll({ where: { name } });
        return userRole;
    }
    async addRoleToUser(user, userRole) {
        await user.addRole(userRole);
    }
}

module.exports = new Roles();
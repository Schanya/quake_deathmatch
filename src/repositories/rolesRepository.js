//Правильно ли импортирован db? Создаётся ещё одно подключение или как это работает?
const db = require('../models');

class Roles {
    async getByName(name) {
        const userRole = await db.Role.findOne({ where: { name } });

        return userRole;
    }
    async addRoleToUser(user, userRole) {

        await user.addRole(userRole);
    }
}

module.exports = new Roles();
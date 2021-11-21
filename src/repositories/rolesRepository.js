//Правильно ли импортирован db? Создаётся ещё одно подключение или как это работает?
const db = require('../models/index');

class Roles {
    static async getByName(name) {
        const userRole = await db.Role.findOne({ where: { name } });
        return userRole;
    }
    static async addRoleToUser(user, userRole) {
        await user.addRole(userRole);
    }
}

module.exports = Roles;
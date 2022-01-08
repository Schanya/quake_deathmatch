//Правильно ли импортирован db? Создаётся ещё одно подключение или как это работает?
const db = require('../models');

class Roles {
    async getAllByRoleName(name) {
        const userRole = await db.Role.findAll({ where: { name } });

        return userRole;
    }
    async addRoleToUser(user, userRole) {
        await user.addRole(userRole);
    }
    async getRoleByUserId(id) {
        const users = await db.User.findOne({ where: { id } });

        const roles = await users.getRole();

        return roles;
    }
}

module.exports = new Roles();
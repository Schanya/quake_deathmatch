const db = require('../models');

class InitData {
    initRoles = async () => {
        const userRole = await db.Role.findOne({ where: { name: "USER" } })

        if (!userRole) {
            await db.Role.create({ name: "USER" });
        }

        const adminRole = await db.Role.findOne({ where: { name: "ADMIN" } })

        if (!adminRole) {
            await db.Role.create({ name: "ADMIN" });
        }
    }
}

module.exports = new InitData();
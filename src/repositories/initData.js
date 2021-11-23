const db = require('../models/index');

class InitData {
    initRoles = async () => {
        const userRole = await db.Role.findOne({ name: "USER" })
        if (!userRole) {
            await db.Role.create({ name: "USER" });
        }

        const adminRole = await db.Role.findOne({ name: "ADMIN" })
        if (!adminRole) {
            await db.Role.create({ name: "ADMIN" });
        }
    }
}

module.exports = new InitData();
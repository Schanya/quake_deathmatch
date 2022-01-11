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
    initAdmin = async () => {
        const admin = await db.User.findOne({ where: { name: "admin" } });

        if (!admin) {
            const newAdmin = await db.User.create({ name: "admin", password: "admin" });
            await newAdmin.addRole("ADMIN");
        }
    }
}

module.exports = new InitData();
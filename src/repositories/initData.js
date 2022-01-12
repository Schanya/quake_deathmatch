const db = require('../models');
const bcrypt = require('bcrypt');

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
            const password = "admin";
            const hashPassword = bcrypt.hashSync(password, 7);
            const newAdmin = await db.User.create({ name: "admin", password: hashPassword });
            const role = await db.Role.findOne({ where: { name: "ADMIN" } })
            await newAdmin.addRole(role);
        }
    }
}

module.exports = new InitData();
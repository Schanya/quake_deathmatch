// db???
const db = require('../models');
const bcrypt = require('bcrypt');

class Users {
    async findOneByName(name) {
        const candidate = await db.User.findOne({ where: { name } })

        return candidate;
    }
    async create(name, password) {
        const hashPassword = bcrypt.hashSync(password, 7);
        const user = new db.User({ name, password: hashPassword });

        await user.save();

        return user;
    }

    async getAllUsers() {
        const users = await db.User.findAll();

        return users;
    }
    async deleteUser(id) {
        await db.User.destroy({ where: { id } })
    }
    async findById(id) {
        const user = await db.User.findOne({ where: { id } });

        return user;
    }
}

module.exports = new Users();


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
}

module.exports = new Users();


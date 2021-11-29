// db???
const db = require('../models');
const bcrypt = require('bcrypt');

class Users {
    static async findOneByName(name) {
        const candidate = await db.User.findOne({ where: { name } })
        return candidate;
    }
    static async create(name, password) {
        const hashPassword = bcrypt.hashSync(password, 7);
        const user = new db.User({ name, password: hashPassword });
        await user.save();
        return user;
    }
}

module.exports = Users;


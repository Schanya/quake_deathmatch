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
    async getAllUsers({ limit, offset }) {
        const users = await db.User.findAll({
            limit, offset,
            include: [{
                model: db.UserInfo,
                attributes: ["id", "first_name", "last_name", "avatar"]
            }],
            attributes: ["id", "name"]
        });

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


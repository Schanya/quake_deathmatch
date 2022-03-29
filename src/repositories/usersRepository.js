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
    async findById(id, transaction) {
        const user = await db.User.findOne({ where: { id } }, { transaction });

        return user;
    }
    async countGameSession(user, transaction) {
        const usersGameSession = await user.countGame_session({ transaction });

        return usersGameSession;
    }
    async endpoint() {
        const result = await db.sequelize.query(
            `SELECT 
    result.user_id, number
FROM
    (SELECT 
        user_id,
            COUNT(game_session_id) / (SELECT 
                    COUNT(*)
                FROM
                    quake_db.game_sessions) AS number
    FROM
        quake_db.user_sessions
    GROUP BY user_id) AS result
WHERE
    result.number >= (SELECT 
            AVG(number)
        FROM
            (SELECT 
                user_id,
                    COUNT(game_session_id) / (SELECT 
                            COUNT(*)
                        FROM
                            quake_db.game_sessions) AS number
            FROM
                quake_db.user_sessions
            GROUP BY user_id) AS primer);`
        )

        return result;
    }
}

module.exports = new Users();


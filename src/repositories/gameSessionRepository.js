const Location = require('../models/location');
const db = require('../models');
//const Location = require('../models/location');

class GameSessions {
    async getGameSessions(name) {
        const gameSessions = await db.GameSession.findAll();

        return gameSessions;
    }
    async getGameSessionByName(name) {
        const gameSessesion = await db.GameSession.findOne({ where: { name } });

        return gameSessesion;
    }
    async createGameSession(name, max_users, is_active, transaction) {
        const gameSession = new db.GameSession({ name, max_users, is_active }, { transaction });

        await gameSession.save({ transaction });

        return gameSession;
    }
    async addUserToGameSession(gameSession, user, transaction) {
        await gameSession.addUser(user, { transaction });
    }
    async addGameSessionToLocation(gameSession, location, transaction) {
        await location.addGame_session(gameSession, { transaction });
    }
    async getGameSession(id) {
        const gameSession = await db.GameSession.findAll({
            //Убрать из вывода user_sessions
            include: [
                {
                    model: db.Location,
                    attributes: ["id", "name", "description", "poster", "file", "max_users"],
                },
                {
                    model: db.User,
                    as: "user",
                    attributes: ["id", "name"],
                    include: {
                        model: db.UserInfo,
                        attributes: ["id", "first_name", "last_name", "avatar"],
                    },

                }
            ],
            attributes: ["id", "name", "max_users"]
        });

        return gameSession;
    }
    async getLocation(gameSession) {
        const location = await gameSession.getLocation();

        return location;
    }
    async getUsersFromGameSession(gameSession) {
        const users = await gameSession.countUser();

        return users;
    }
    async getGameSessionByUser(user) {
        const gameSessesion = await user.getGame_session();

        return gameSessesion;
    }
    async disconnecting(user, gameSession) {
        user.removeGame_session(gameSession);
    }
    async countSessionByUser(user) {
        const count = await user.countGame_session();

        return count;
    }
    async deleteGameSession(id, transaction) {
        await db.GameSession.destroy({ where: { id } }, { transaction });
    }
    async update(gameSession, options) {
        await gameSession.update(options);
    }
}

module.exports = new GameSessions();
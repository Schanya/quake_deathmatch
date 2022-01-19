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
    async getGameSessionById(id) {
        const gameSessesion = await db.GameSession.findOne({ where: { id } });

        return gameSessesion;
    }
    async createGameSession(name, max_users, is_active) {
        const gameSession = new db.GameSession({ name, max_users, is_active });

        await gameSession.save();

        return gameSession;
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
    async addUserToGameSession(gameSession, user) {
        await gameSession.addUser(user);
    }
    async addGameSessionToLocation(gameSession, location) {
        await location.addGame_session(gameSession);
    }
    async getLocation(gameSession) {
        const location = await gameSession.getLocation();

        return location;
    }
    async getUsersByGameSession(gameSessesion) {
        const users = await gameSessesion.getUser({ attributes: ["id", "name"] });

        return users;
    }
    async countUsersFromGameSession(gameSession) {
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
    // async deleteLocation(id) {
    //     await db.Location.destroy({ where: { id } })
    // }
}

module.exports = new GameSessions();
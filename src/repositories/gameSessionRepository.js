const db = require('../models');

class GameSessions {
    async getGameSessions(name) {
        const gameSessions = await db.GameSession.findAll();

        return gameSessions;
    }
    async createGameSession(name, max_users, is_active) {
        const gameSession = new db.GameSession({ name, max_users, is_active });

        await gameSession.save();

        return gameSession;
    }
    async addUserToGameSession(gameSession, user) {
        await gameSession.addUser(user);
    }
    async addGameSessionToLocation(gameSession, location) {
        await location.addGame_session(gameSession);
    }
    // async deleteLocation(id) {
    //     await db.Location.destroy({ where: { id } })
    // }
}

module.exports = new GameSessions();
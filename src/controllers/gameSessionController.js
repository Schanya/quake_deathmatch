const Response = require('../helpers/response');
const { StatusCodes } = require('http-status-codes');

const gameSessionsService = require('../services/gameSessionService');

class GameSessionController {
    async addGameSession(req, res) {
        const { name, max_users, nameLocation } = req.body;
        const userId = req.user.id;

        await gameSessionsService.addGameSession(name, max_users, userId, nameLocation);

        res.status(StatusCodes.OK).json(new Response(`Game session ${name} has been successfully created`));
    }
    async getGameSessions(req, res) {
        const gameSessions = await gameSessionsService.getGameSessions();

        res.status(StatusCodes.OK).json(gameSessions);
    }
    async getDetailedInformation(req, res) {
        const { id } = req.body;
        const gameSession = await gameSessionsService.getDetailedInformation(id);

        res.status(StatusCodes.OK).json(gameSession);
    }
    async getUsersByGameSession(req, res) {
        const sessionId = req.params.id;
        const users = await gameSessionsService.getUsersByGameSession(sessionId);

        res.status(StatusCodes.OK).json(users);
    }
    // async deleteLocation(req, res) {
    //     const { name } = req.body;
    //     await LocationsService.deleteLocation(name);

    //     res.status(StatusCodes.OK).json(new Response(`Your location has been successfully deleted`));
    // }
}

module.exports = new GameSessionController()
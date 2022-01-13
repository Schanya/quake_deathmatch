const Response = require('../helpers/response');
const { StatusCodes } = require('http-status-codes');

const GameSessionsService = require('../services/gameSessionService');

class GameSessionController {
    async addGameSession(req, res) {
        const { name, max_users, nameLocation } = req.body;
        const userId = req.user.id;

        await GameSessionsService.addGameSession(name, max_users, userId, nameLocation);

        res.status(StatusCodes.OK).json(new Response(`Game session ${name} has been successfully created`));
    }
    // async deleteLocation(req, res) {
    //     const { name } = req.body;
    //     await LocationsService.deleteLocation(name);

    //     res.status(StatusCodes.OK).json(new Response(`Your location has been successfully deleted`));
    // }
}

module.exports = new GameSessionController()
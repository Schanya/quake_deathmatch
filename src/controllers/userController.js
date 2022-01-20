const Response = require('../helpers/response');
const { StatusCodes } = require('http-status-codes');

const usersService = require('../services/usersService');

class UserController {
    async getUsers(req, res) {
        const { page, amount } = req.query;
        const users = await usersService.getUsers({ page, amount });

        res.json(users);
    }
    async deleteUser(req, res) {
        const userId = req.user.id;
        await usersService.deleteUser(userId);

        res.status(StatusCodes.OK).json(new Response(`Your account has been successfully deleted`));
    }
    async connectingToGameSession(req, res) {
        const { name: sessionName } = req.body;
        const userId = req.user.id;
        await usersService.connectingToSession(sessionName, userId);

        res.status(StatusCodes.OK).json(new Response(`You have successfully connected to the game`));
    }
    async disconnectingFromGameSession(req, res) {
        const userId = req.user.id;
        await usersService.disconnectingFromGameSession(userId);

        res.status(StatusCodes.OK).json(new Response(`You have successfully disconnected to the game`));
    }
}

module.exports = new UserController()
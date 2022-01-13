const Response = require('../helpers/response');
const { StatusCodes } = require('http-status-codes');

const UsersService = require('../services/usersService');
const deleteService = require('../services/deleteService');

class UserController {
    async getUsers(req, res) {
        const users = await UsersService.getUsers();

        res.json(users);
    }
    async deleteUser(req, res) {
        const userId = req.user.id;
        await UsersService.deleteUser(userId);

        res.status(StatusCodes.OK).json(new Response(`Your account has been successfully deleted`));
    }
    async connectingToGameSession(req, res) {
        const { name: sessionName } = req.body;
        const userId = req.user.id;
        await UsersService.connectingToSession(sessionName, userId);

        res.status(StatusCodes.OK).json(new Response(`You have successfully connected to the game`));
    }
}

module.exports = new UserController()
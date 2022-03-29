const Response = require('../helpers/response');
const { StatusCodes } = require('http-status-codes');

const usersService = require('../services/usersService');

class UserController {
    async getUsers(req, res) {
        const { page, amount } = req.query;
        const users = await usersService.getUsers({ page, amount });

        res.status(StatusCodes.OK).json(users);
    }
    async deleteUser(req, res) {
        const userId = req.user.id;
        await usersService.deleteUser(userId);

        res.status(StatusCodes.OK).json(new Response(`Your account has been successfully deleted`));
    }
    async connectingToGameSession(req, res) {
        const sessionId = req.params.id;
        const userId = req.user.id;
        await usersService.connectingToSession(sessionId, userId);

        res.status(StatusCodes.OK).json(new Response(`You have successfully connected to the game`));
    }
    async disconnectingFromGameSession(req, res) {
        const userId = req.user.id;
        await usersService.disconnectingFromGameSession(userId);

        res.status(StatusCodes.OK).json(new Response(`You have successfully disconnected to the game`));
    }
    //Implement an endpoind for analytics without using ORM 
    //to find users who have an average connection rate to 
    //game sessions >= than the average of all users.
    async endpoint(req, res) {
        const result = await usersService.endpoint();

        res.status(StatusCodes.OK).json(result);
    }
}

module.exports = new UserController()
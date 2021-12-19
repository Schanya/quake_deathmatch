const UsersService = require('../services/UsersService');
const registrationService = require('../services/registrationService');
const Response = require('../helpers/response');
const { StatusCodes } = require('http-status-codes');
const loginService = require('../services/loginService');
const deleteService = require('../services/deleteService');
const { secret } = require('../db/config/dbСonfig');
const jwt = require('jsonwebtoken');

class AuthController {
    async registration(req, res, next) {
        const { name, password } = req.body;

        await registrationService.userRegistration(name, password);

        res.status(StatusCodes.OK).json(new Response(`User $ {name} has been successfully registered`));
    }

    async login(req, res) {
        const { name, password } = req.body

        const token = await loginService.userLogin(name, password);

        res.status(StatusCodes.OK).json({ token });
    }

    async getUsers(req, res) {
        const users = await UsersService.getUsers();

        res.json(users);
    }

    async deleteUser(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        //Куда вставить проверку, если токен не пришёл?
        const { id: userId } = jwt.verify(token, secret);

        await deleteService.deleteUser(userId);

        res.status(StatusCodes.OK).json(new Response(`Your account has been successfully deleted`));
    }
}


module.exports = new AuthController()


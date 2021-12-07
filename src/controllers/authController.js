const getAllUsers = require('../services/getUsers');
const registrationService = require('../services/registrationService');
const Response = require('../helpers/response');
const { StatusCodes } = require('http-status-codes');
const loginService = require('../services/loginService');

class AuthController {
    async registration(req, res, next) {
        const { name, password } = req.body;

        await registrationService.userRegistration(name, password);

        res.status(StatusCodes.OK).json(new Response(`Пользователь с именем  ${name} был успешно зарегестрирован`));
    }

    async login(req, res) {
        const { name, password } = req.body

        const token = await loginService.userLogin(name, password);

        res.status(StatusCodes.OK).json({ token });
    }

    async getUsers(req, res) {
        const users = await getAllUsers.getUsers();

        res.json(users);
    }
}


module.exports = new AuthController()


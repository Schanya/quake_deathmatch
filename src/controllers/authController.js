const registration = require('../services/registration');
const Response = require('../helpers/response');
const login = require('../services/login');
const getAllUsers = require('../services/getUsers');
const { StatusCodes } = require('http-status-codes');

class AuthController {
    async registration(req, res, next) {

        const { name, password } = req.body;

        await registration.userRegistration(name, password);

        res.status(StatusCodes.OK).json(new Response(`Пользователь с именем  ${name} был успешно зарегестрирован`));
    }

    async login(req, res) {

        const { name, password } = req.body

        const token = await login.userLogin(name, password);

        res.status(StatusCodes.OK).json({ token });
    }

    async getUsers(req, res) {

        const users = await getAllUsers.getUsers();

        res.json(users);
    }
}


module.exports = new AuthController()


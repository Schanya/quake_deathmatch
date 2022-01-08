const Response = require('../helpers/response');
const { StatusCodes } = require('http-status-codes');

const registrationService = require('../services/registrationService');
const loginService = require('../services/loginService');

class AuthController {
    async registration(req, res, next) {
        const { name, password } = req.body;

        await registrationService.userRegistration(name, password);

        res.status(StatusCodes.OK).json(new Response(`User ${name} has been successfully registered`));
    }
    async login(req, res) {
        const { name, password } = req.body

        const token = await loginService.userLogin(name, password);

        res.status(StatusCodes.OK).json({ token });
    }
}

module.exports = new AuthController()


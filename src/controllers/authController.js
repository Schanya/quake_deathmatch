const registration = require('../services/registration');
const Response = require('../helpers/response');
const { StatusCodes } = require('http-status-codes');

class AuthController {
    async registration(req, res, next) {
        const { name, password } = req.body;

        await registration.userRegistration(name, password);

        res.status(StatusCodes.OK).json(new Response(`Пользователь с именем  ${name} был успешно зарегестрирован`));
    }

    async loginService(req, res) {
        const { name, password } = req.body

        const token = await login.userLogin(name, password);

        res.status(StatusCodes.OK).json({ token });
    }
}


module.exports = new AuthController()

/*

 async getUsers(req, res) {
     try {
         res.json("server work")
     } catch (e) {

     }
 }
}*/

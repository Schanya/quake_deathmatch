const { validationResult } = require('express-validator');
const { BadRequestError } = require('../errors');
const registration = require('../services/registration');

class authController {
    async registration(req, res, next) {
        try {

            //
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new BadRequestError("Ошибка при регистрации");
            }
            //уйдёт, когда нипишу валидацию

            const { name, password } = req.body;

            await registration(name, password);

            res.json(`Пользователь с именем  ${name} был успешно зарегестрирован`);

        } catch (err) {

            return next(err)
        }
    }
}

module.exports = new authController()

/*

async login(req, res) {
        try {
            const { name, password } = req.body
            const user = await db.User.findOne({ name })
            if (!user) {
                return res.status(400).json({ message: `Пользователь ${name} не найден` })
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ massage: "Введён не верный пароль" })
            }

        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Login error' })
        }
    }

 async getUsers(req, res) {
     try {
         res.json("server work")
     } catch (e) {

     }
 }
}*/

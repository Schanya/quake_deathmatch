const { validationResult } = require('express-validator');
const BaseError = require('../errors/error');
const registration = require('../services/registration');

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new BaseError(400, 'userRegistrationValidationError', "Ошибка при регистрации");
            }
            res.json(await registration(req));

        } catch (e) {
            console.log(e)
            if (e instanceof BaseError) {
                res.status(e.status).json({ message: e.message })
            } else {
                res.status(500).json({ message: 'server error' })
            }
        }
    }
}

module.exports = new authController()

/* async login(req, res) {
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

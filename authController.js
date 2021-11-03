const bcrypt = require('bcrypt');
const db = require('./models/index')
const { validationResult } = require('express-validator')

//Как удалить не нужные зависимости
//регистрация(добавление) нового пользователя
class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors })
            }
            const { name, password } = req.body;
            const candidate = await db.User.findOne({ name })
            if (candidate) {
                return res.status(400).json({ message: "Пользователь с таким именем уже существует" })
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await db.Role.findOne({ name: "USER" });
            const user = new db.User({ name, password: hashPassword });
            await user.save();
            user.addRole(userRole);
            return res.json({ message: "Пользователь был успешно зарегестрирован" })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Registration error' })
        }
    }

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
}

//экспортируем объект данного класса
module.exports = new authController()
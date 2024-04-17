const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { refreshExp, refreshSecret, accesSecret, accessExp } = require('../lib/config.js');

class AuthController {
    // Метод регистрации
    async register(req, res) {
        // Получаем данные из тела запроса
        const { username, password } = req.body;

        // Если существует пользователь с таким username, отправляем ошибку:
        if (await User.findOne({ username }).exec() !== null) return res.status(401).json({ message: 'User with this username already exists' });

        // Шифруем пароль и создаём данные в БД
        try {
            const hash = await bcrypt.hash(password, 10);
            const user = new User({ username, password: hash });
            await user.save();

            return res.status(201).json({ message: 'User registered' });
        } catch (error) {
            console.error(error);
            return res.status(501).json({ message: 'Something went wrong' });
        }
    }

    // Метод авторизации
    async login(req, res) {
        // Получаем данные из тела запроса
        const { username, password } = req.body;

        // Получаем пользователя из базы данных
        const user = await User.findOne({ username }).exec();
        
        // Если нет такого пользователя - ошибка 400
        if (user === null) return res.status(400).json({ message: 'User with this username doesn\'t exist' });
        // Если пароль не подходит - ошибка 400
        if (!(await user.comparePassword(password))) return res.status(400).json({ message: 'Wrong password' });

        // Создаем рефреш токен
        const refresh = jwt.sign({ _id: user._id }, refreshSecret, { expiresIn: refreshExp });

        res.cookie('refresh', refresh, { httpOnly: true, maxAge: refreshExp*100 });
    
        // Отправляем ass access
        return res.status(200).json({ token: jwt.sign({ _id: user._id }, accesSecret, { expiresIn: accessExp }) });

    }

    // Метод, обновлябщий access токен
    async refreshAccess(req, res) {
        // Получаем refresh токен из cookie
        const { refresh } = req.cookies;

        // Если он отсутствует - ошибка
        if (!refresh) return res.status(401).json({ error: 'Unauthorized' });

        // 
        try {
            const token = jwt.verify(refresh, refreshSecret);

            const new_refresh = jwt.sign({ _id: token._id }, refreshSecret, { expiresIn: refreshExp });
            res.cookie('refresh', new_refresh, { httpOnly: true, maxAge: refreshExp*100 });

            return res.status(200).json({ token: jwt.sign({_id: token._id}, accesSecret, { expiresIn: accessExp }) });
        } catch (e) {
            console.error(e);
            res.clearCookie('refresh');
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }

    async logout(req, res) {
        const { refresh } = req.cookies;
        if (!refresh) return res.status(401).json({ error: 'Unauthorized' });

        res.clearCookie('refresh');
        return res.status(201).json({ message: 'Logged out' });
    }
}

module.exports = new AuthController();
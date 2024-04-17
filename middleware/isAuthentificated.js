const jwt = require('jsonwebtoken');
const { refreshSecret, accesSecret } = require('../lib/config');
const User = require('../models/User');

// Функция не отправляет ошибку, если ползьователь не залогинен
module.exports.isAuthentificated = async (req, res, next) => {
    if (!req.headers['authorization']) {
        req.user = null;
        return next();
    }

    const access = req.headers['authorization'].split('Bearer ')[1];

    try {
        const payload = jwt.verify(access, accesSecret);
        req.user = await User.findById(payload._id);
        next();
    } catch (error) {
        req.user = null;
        next();
    }
}

// Функция отправляет 401 Unauthorized
module.exports.getUser = async (req, res, next) => {
    if (!req.headers['authorization']) {
        req.user = null;
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const access = req.headers['authorization'].split('Bearer ')[1];
    
    try {
        const payload = jwt.verify(access, accesSecret);
        req.user = await User.findById(payload._id);
        next();
    } catch (error) {
        req.user = null;
        return res.status(401).json({ error: 'Unauthorized' });
    }
}
const e = require('express');
const r = e.Router();
const controller = require('../controllers/AuthController.js');
const { validateUser } = require('../validators/UserValidator.js');

r.post('/register', validateUser, controller.register);
r.post('/login', validateUser, controller.login);
r.post('/refresh', controller.refreshAccess);
r.post('/logout', controller.logout);

module.exports = r;
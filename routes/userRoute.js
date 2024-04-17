const e = require('express');
const r = e.Router();
const { validateUpdateUser } = require('../validators/user');
const { getUser } = require('../middleware/isAuthentificated');
const controller = require('../controllers/UserController');

r.get('/:id', controller.getUserById);
r.put('/', getUser, validateUpdateUser, controller.updateUser);

module.exports = r;
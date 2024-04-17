const e = require('express');
const { getUser } = require('../middleware/isAuthentificated');
const { validateMessage, validateGetMessage } = require('../validators/MessagesValidator');
const { get, send } = require('../controllers/MessageController');
const r = e.Router();

r.post('/get', getUser, validateGetMessage, get);
r.post('/send', getUser, validateMessage, send);

module.exports = r;